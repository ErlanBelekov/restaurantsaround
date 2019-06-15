import React, { Component } from 'react';
import { connect } from "react-redux";
import '../styles/results.css';
import Restaurant from './Restaurant';
import { FadeIn } from './FadeIn';

class SearchResults extends Component {
    render() {
        return(
            <div className={`results${this.props.fetched ? "-show" : ""}`}>
                {
                    this.props.fetched ?
                    <h1 className="results-title">Top Results: </h1>
                    :
                    null
                }
                <div className="results-content">
                    {
                        this.props.results.map(el => {
                            return (
                                <FadeIn key={el.restaurant.id}>
                                    <Restaurant
                                    to={el.restaurant.url}
                                    img={el.restaurant.featured_image || el.restaurant.thumb || el.restaurant.photos_url}
                                    name={el.restaurant.name}/>
                                </FadeIn>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

let mapStateToProps = state => {
    return {
        searching: state.searchReducer.searching,
        fetched: state.resultsReducer.fetched,
        results: state.resultsReducer.results
    };
}

export default connect(mapStateToProps)(SearchResults);
