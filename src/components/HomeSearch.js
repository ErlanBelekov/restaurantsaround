import React, {Component} from 'react';
import axios from 'axios';
import logo from "../assets/images/search_icon.svg";
import '../styles/home.css';
import { startSearching, endSearching } from '../actions/search';
import { fetched, fetchErr, refreshFetched } from '../actions/results';
import store from '../store';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import {FadeIn} from './FadeIn';

const ZomatoAPI = 'https://developers.zomato.com/api/v2.1/';
const IPAPI = 'http://ip-api.com/json/';

class HomeSearch extends Component {
    state = {
        expand:false,
        city:'',
        myCity:'',
        myCountry:'',
        lat:'',
        lon:'',
        error:null
    }
    toggle = async () => {
        this.setState({
            city: await "",
            expand: await !this.state.expand
        });
        this.state.expand ? this.input.focus() : console.log("yikes");
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    getInputRef = node => { this.input = node };
    getGeo = async city => {
        await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=11aea3522f8f433187c8ef0b28b1216f`).then(async res => {
            if(res.data.results.length > 0) {
                this.setState({
                    lat: await res.data.results[0].geometry.lat,
                    lon: await res.data.results[0].geometry.lng
                });
            }
            return;
        }).catch(err => {
            return;
        });
    }
    search = async () => {
        await store.dispatch(startSearching());
        await store.dispatch(refreshFetched());
        this.setState({
            error: await null
        });
        // change location if user typed it
        if(this.state.city !== "") {
            await this.getGeo(this.state.city);
        }
        if(this.state.city === "") {
            await this.loadMyLocation();
        }
        const URL = ZomatoAPI + `geocode?lat=${this.state.lat}&lon=${this.state.lon}`;
        let config = {
            headers: {
                "Accept": "application/json",
                "user-key": "e688e4d8e1d70113d5723dcb5a2f514d"
            }
        };
        await axios.get(URL, config).then(async res => {
            await store.dispatch(fetched(res.data.nearby_restaurants));
        }).catch(async e => {
            if(this.state.city !== "") {
                this.setState({
                    error: `Looks like ${this.state.city} city is not supported yet. Try another city.`
                });
                return;
            }
            this.setState({
                error: `Seems like ${this.state.myCity} city is not supported yet ;(. Try another city.`
            })
            await store.dispatch(fetchErr(e));
        })
        await store.dispatch(endSearching());
    }
    loadMyLocation = async () => {
        await axios.get(IPAPI).then(async res => {
            this.setState({
                myCity: await res.data.city,
                myCountry: await res.data.country,
                lat: await res.data.lat,
                lon: await res.data.lon
            });
        }).catch(err => {
            throw new Error(err);
        });
    }
    // load user's current location
    componentWillMount() {
        this.loadMyLocation();
    }
    render() {
        return(
            <div className={`container${this.props.fetched ? "-less" : ""}`}>
                <FadeIn>
                    <h1 className="white home-title">Search for restaurants. Anywhere.</h1>
                </FadeIn>
                <div className="search-contain">
                    <img src={logo} alt="search button icon" onClick={this.toggle} id="search-btn"/>
                    <input
                    value={this.state.city}
                    name="city"
                    autoComplete="off"
                    onChange={this.handleChange}
                    ref={this.getInputRef}
                    className={this.state.expand ? "wide" : ""} type="text" id="search"
                    placeholder={this.state.expand ? "Enter city name" : ""}
                    />
                    <div className="bottom">
                        <p className={this.state.expand ? "tip-show" : "tip-hide"} id="tip">By default, we will look for restaurants near you.</p>
                        <p id="tip" onClick={this.search} className={this.state.expand ? "tip-show search" : "search tip-hide"}>
                            Search
                        </p>
                    </div>
                </div>
                <p className={`error${this.state.error ? "-show" : ""}`}>
                    {
                        this.state.error
                    }
                </p>
                <div className={`searching${this.props.searching ? "-show" : ""}`}>
                    <ClipLoader color="rgb(131, 185, 202)"/>
                </div>
            </div>
        );
    }
}

let mapStateToProps = state => {
    return {
        searching: state.searchReducer.searching,
        fetched: state.resultsReducer.fetched
    };
};

export default connect(mapStateToProps)(HomeSearch);
