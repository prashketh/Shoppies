import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import './shoppies.css'
import DisplayMovies from '../displayMovies/displayMovies';

const APIkey = 42661839;

class SearchBar extends Component {

    constructor(props) {

        super(props);

        this.state = {
            searchTerm: '',
            finalTerm: '',
            movies: null, 
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    };

    handleChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    changeFinalTerm() {
        this.setState({ finalTerm: this.state.searchTerm });
    }

    render() {

        return (
            <div className="d-flex flex-column p-3 change-width">
                <h1>The Shoppies</h1>
                <form class="d-flex flex-column card p-2" onSubmit={this.submit}>
                    <div class="pl-3 pt-3 pr-3">
                        <h5>Movie title</h5>
                    </div>
                    <div class="input-group pt-2 pl-3 pr-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text">Search</label>
                        </div>
                        <input type="text" class="form-control" placeholder="" value={this.state.value} onChange={this.handleChange} />
                    </div>
                    <div class="pl-3 pt-2 pb-3 pr-3">
                        <small>Press ENTER to search</small>
                    </div>
                </form>
                <div class="d-flex flex-row pt-2 change-width">
                    <DisplayMovies searchTerm={this.state.finalTerm} movies={this.state.movies}/>
                </div>
            </div>
        )

    };

    submit(e) {
        e.preventDefault(); // prevents the refresh on key enter
        this.changeFinalTerm();
        fetch(`http://www.omdbapi.com/?s=${this.state.searchTerm}&apikey=${APIkey}`)
            .then(resp => resp.json())
            .then(response => {
                this.setState({ movies: null });
                this.setState({ movies: response.Search })
            })
            .catch((error) =>
                console.log(error)
            )
    }
}

export default SearchBar