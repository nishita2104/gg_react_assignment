import React, { Component } from "react";
import axios from "axios";

class Search extends Component {
  state = {
    name: "",
    details: [],
    movie: false,
    series: false,
    episode: false,
    showdetails: false,
  };

  getName = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
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
      <div>
        <form>
          <label>
            Search by Title:
            <input type="text" name="name" onChange={this.getName} />
          </label>
          <label>
            movie
            <input
              type="checkbox"
              name="movie"
              checked={this.state.movie}
              onChange={this.flipmovie}
              disabled={this.state.series || this.state.episode ? true : false}
            />
          </label>
          <p>movie: {this.state.movie ? "true" : "false"}</p>
          <label>
            series
            <input
              type="checkbox"
              name="series"
              checked={this.state.series}
              onChange={this.flipseries}
              disabled={this.state.movie || this.state.episode ? true : false}
            />
          </label>
          <label>
            episode
            <input
              type="checkbox"
              name="episode"
              checked={this.state.episode}
              onChange={this.flipepisode}
              disabled={this.state.series || this.state.movie ? true : false}
            />
          </label>

          <button type="submit" onClick={this.handleSubmit}>
            submit
          </button>
        </form>
        <span>
          {this.state.details.map((detail) => (
            <button key={detail.Title} onClick={this.flipshowdetails}>
              <img src={detail.Poster} />
            </button>
          ))}
        </span>
        <div>
          {this.state.details.map((detail) => {
            return this.state.showdetails ? (
              <span key={detail.Title}>
                {detail.Title}
                {detail.Year}
                {detail.Rated}
              </span>
            ) : null;
          })}
        </div>
      </div>
    );
  }
}
export default Search;
