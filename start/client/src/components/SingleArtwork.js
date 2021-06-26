import React from "react";

class SingleArtwork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      date: "",
      artist: "",
      origin: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleNext() {
    const arrIds = [
      12267, 12985, 13004, 13123, 13125, 11827, 13415, 13417, 40184, 14105,
      14111, 12679, 12681, 10271, 11118, 12236, 12862, 12867, 12872, 12891,
      12930, 21678, 59927,
    ];
    const randomInt = Math.floor(Math.random() * 50000);
  }

  render() {
    // console.log(this.props);
    console.log(this.props);
    const { artwork } = this.props.data;
    const { handleChange } = this;
    const { date, origin } = this.state;
    return (
      <div>
        <img src={artwork.image.imageUrl} />
        <hr />
        <label htmlFor="origin">Place of origin:</label>
        <input name="origin" onChange={handleChange} value={origin}></input>

        <p>Estimated year:</p>
        <input name="date" onChange={handleChange} value={date}></input>
        <p>
          <button>Check answer</button>
          <button>Next</button>
        </p>

        {/* <h3>{artwork.title}</h3>
              {artwork.artist_display === "" ? (
                <p>Artist: Unknown</p>
              ) : (
                <p>Artist: {artwork.artist_display}</p>
              )}
              {artwork.date_display === "" ? (
                <p>Date: Unknown</p>
              ) : (
                <p>Circa: {artwork.date_display}</p>
              )}
              {artwork.place_of_origin === "" ? (
                <p>Place of Origin: Unknown</p>
              ) : (
                <p>Place of Origin: {artwork.place_of_origin}</p>
              )} */}
      </div>
    );
  }
}

export default SingleArtwork;
