const S3 = require('aws-sdk/clients/s3');
const isEmail = require('isemail');
const mime = require('mime');
const uuidv4 = require('uuid/v4');
const { DataSource } = require('apollo-datasource');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
  async findOrCreateUser({ email: emailArg } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;

    const users = await this.store.users.findOrCreate({ where: { email } });
    return users && users[0] ? users[0] : null;
  }

  async bookTrips({ launchIds }) {
    const userId = this.context.user.id;
    if (!userId) return;

    let results = [];

    // for each launch id, try to book the trip and add it to the results array
    // if successful
    for (const launchId of launchIds) {
      const res = await this.bookTrip({ launchId });
      if (res) results.push(res);
    }

    return results;
  }

  async bookTrip({ launchId }) {
    const userId = this.context.user.id;
    const res = await this.store.trips.findOrCreate({
      where: { userId, launchId },
    });
    return res && res.length ? res[0].get() : false;
  }

  async cancelTrip({ launchId }) {
    const userId = this.context.user.id;
    return !!this.store.trips.destroy({ where: { userId, launchId } });
  }

  async getLaunchIdsByUser() {
    const userId = this.context.user.id;
    const found = await this.store.trips.findAll({
      where: { userId },
    });
    return found && found.length
      ? found.map(l => l.dataValues.launchId).filter(l => !!l)
      : [];
  }

  async isBookedOnLaunch({ launchId }) {
    if (!this.context || !this.context.user) return false;
    const userId = this.context.user.id;
    const found = await this.store.trips.findAll({
      where: { userId, launchId },
    });
    return found && found.length > 0;
  }

  /**
   * This function is currently only used by the iOS tutorial to upload a
   * profile image to S3 and update the user row
   */
  async uploadProfileImage({ file }) {
    const userId = this.context.user.id;
    if (!userId) return;

    // Create new S3 client instance
    const s3 = new S3();

    /**
     * Destructure mimetype and stream creator from provided file and generate
     * a unique filename for the upload
     */
    const { createReadStream, mimetype } = await file;
    const filename = uuidv4() + '.' + mime.getExtension(mimetype);

    // Upload the file to an S3 bucket using the createReadStream
    const { AWS_S3_BUCKET } = process.env;
    await s3
      .upload({
        ACL: 'public-read', // This will make the file publicly available
        Body: createReadStream(),
        Bucket: AWS_S3_BUCKET,
        Key: filename,
        ContentType: mimetype
      })
      .promise();

    // Save the profile image URL in the DB and return the updated user
    return this.context.user.update({
      profileImage: `https://${AWS_S3_BUCKET}.s3.us-west-2.amazonaws.com/${filename}`
    });
  }
}

module.exports = UserAPI;
