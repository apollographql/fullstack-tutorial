const { RESTDataSource } = require("apollo-datasource-rest");

class ArtworkAPI extends RESTDataSource {
  constructor() {
    super();
    {
      this.imageId = "";
      this.iiifUrl = "";
      this.imageUrl = "";
    }
    this.baseURL = "https://api.artic.edu/api/v1/";
  }

  async getArtworks() {
    const { data } = await this.get("artworks");
    // return data.map((artwork) => this.artworkReducer(artwork));
    return data;
  }
  async getSingleArtwork(id) {
    const { data } = await this.get(
      `artworks/${id}?fields=id,title,date_display,artist_display,image_id,place_of_origin`
    );
    const { config } = await this.get(`artworks/${id}`);
    this.imageId = data.image_id;
    this.iiifUrl = config.iiif_url;
    this.imageUrl = `${this.iiifUrl}/${this.imageId}/full/843,/0/default.jpg`;
    data.imageUrl = this.imageUrl;
    return data;
  }
}

module.exports = ArtworkAPI;
