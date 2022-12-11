import React, { Component } from "react";
import axios from "axios";
import "./search.css";

class Search extends Component {
  state = {
    name: "",
    details: [],
    movie: false,
    series: false,
    episode: false,
    showdetails: false,
    submitted: false,
  };

  getName = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitted: !this.state.submitted });
    console.log(this.state.name);
    const nametoBeSearched = this.state.name;
    let array = nametoBeSearched.split(" ");
    let ss = "";
    for (let i = 0; i < array.length - 1; i++) {
      ss += array[i] + "+";
    }
    ss += array[array.length - 1];
    console.log(ss);
    axios
      .get(
        "http://www.omdbapi.com?apikey=1e010692&t=" +
          ss +
          "&type=" +
          (this.state.movie ? "movie" : "") +
          (this.state.series ? "series" : "") +
          (this.state.episode ? "episode" : "")
      )
      //.catch(console.error("bleh"))
      .then((res) => {
        const details = [res.data];
        console.log(res.data);
        this.setState({ details });
      });
  };

  handleanothertitle = () => {
    this.setState({
      submitted: !this.state.submitted,
      showdetails: !this.state.showdetails,
      movie: false,
      series: false,
      episode: false,
    });
  };

  movie_details = () => {
    this.state.details.map((detail) => {
      <span key={detail.Title}>{detail.Title}</span>;
    });
  };

  flipmovie = () => {
    this.setState({ movie: !this.state.movie });
  };
  flipseries = () => {
    this.setState({ series: !this.state.series });
  };
  flipepisode = () => {
    this.setState({ episode: !this.state.episode });
  };
  flipshowdetails = () => {
    this.setState({ showdetails: !this.state.showdetails });
  };

  render() {
    return (
      <div className="app">
        <label className="upper">
          <div className="lh">
            <img
              src="https://www.freeiconspng.com/thumbs/popcorn-png/popcorn-png-6.png"
              className="logo"
            />
            <p className="heading">MovieBuff</p>
          </div>
          <p className="subheading">
            Find information on hundreds of movies, series and episodes...
          </p>
        </label>
        <form className="form">
          <label>
            <input
              type="text"
              className="searchbar"
              name="name"
              onChange={this.getName}
              placeholder="Search by Title..."
            ></input>
          </label>
          <div className="chxs">
            <div className="chxdesc">
              <input
                type="checkbox"
                className="checkbox"
                name="movie"
                checked={this.state.movie}
                onChange={this.flipmovie}
                disabled={
                  this.state.series || this.state.episode ? true : false
                }
              />
              <p>Movie</p>
            </div>

            <div className="chxdesc">
              <input
                type="checkbox"
                className="checkbox"
                name="series"
                checked={this.state.series}
                onChange={this.flipseries}
                disabled={this.state.movie || this.state.episode ? true : false}
              />
              <p>Series</p>
            </div>
            <div className="chxdesc">
              <input
                type="checkbox"
                className="checkbox"
                name="episode"
                checked={this.state.episode}
                onChange={this.flipepisode}
                disabled={this.state.series || this.state.movie ? true : false}
              />
              <p>Episode</p>
            </div>
          </div>
          <button
            type="submit"
            className="submit"
            onClick={
              this.state.series || this.state.movie || this.state.episode
                ? this.handleSubmit
                : null
            }
          >
            Submit
          </button>
        </form>

        {this.state.details.map((detail) => {
          return this.state.submitted ? (
            <button
              className="pt"
              key={detail.Title}
              onClick={this.flipshowdetails}
            >
              <img
                className="poster"
                hidden={this.state.showdetails ? true : false}
                src={detail.Poster}
              />
              <p
                className="clicktext"
                hidden={this.state.showdetails ? true : false}
              >
                Click the poster to reveal more info
              </p>
            </button>
          ) : null;
        })}

        {this.state.details.map((detail) => {
          return this.state.showdetails ? (
            <div className="details">
              <span className="dp" key={detail.Title}>
                <img className="poster2" src={detail.Poster} />
              </span>
              <div className="dtext">
                <p>Title: {detail.Title}</p>
                <p>Year: {detail.Year}</p>
                <p>Rated: {detail.Rated}</p>
                <p>Released: {detail.Released}</p>
                <p>Runtime: {detail.Runtime}</p>
                <p>Genre: {detail.Genre}</p>
                <p>Director: {detail.Director}</p>
                <p>Writer: {detail.Writer}</p>
                <p>Actors: {detail.Actors}</p>
                <p>Plot: {detail.Plot}</p>
                <p>Language: {detail.Language}</p>
                <p>Country: {detail.Country}</p>
                <p>Awards: {detail.Awards}</p>
                <p>Language: {detail.Language}</p>
                <button className="another" onClick={this.handleanothertitle}>
                  Search another title?
                </button>
              </div>
              {/* Ratings: {detail.Ratings} */}
            </div>
          ) : null;
        })}
      </div>
    );
  }
}
export default Search;
