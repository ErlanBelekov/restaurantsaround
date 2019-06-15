import React, { Component } from 'react';
import HomeSearch from '../components/HomeSearch';
import SearchResults from '../components/SearchResults';

class Home extends Component {
    render() {
        return (
            <div>
                <HomeSearch/>
                <SearchResults/>
            </div>
        );
    }
}

export default Home;
