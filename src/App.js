/* global navigator */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import logo from './logo.svg';
// import home_page_1 from './assets/home_page_1.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    center={{ lat: props.center.lat, lng: props.center.lng }}
    onClick={(event) => props.addMarker(event.latLng.lat(), event.latLng.lng())}
  >
    <Marker position={{ lat:props.center.lat, lng:props.center.lng }} key={props.lat} />
    { props.markers.map((youn) => <Marker position={{ lat: youn.lat, lng: youn.lng }} onClick={ (event) => props.rightFunc(event) } key={ Math.random() } />) }
  </GoogleMap>
));

/*const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);*/

class App extends Component {
  constructor() {
    super();
    this.state = {
      center: {
        lat: 37.6624,
        lng: -121.8747
      },
      markerCenter: {
        lat: null,
        lng: null
      },
      markers: []
    };
  }
  
  rightFunc(event) {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();
    let newMarkers = [];
    console.log(this.state.markers);
    for (let i= 0; i<this.state.markers.length; i++){
      if (this.state.markers[i].lat === latitude && this.state.markers[i].lng === longitude) continue;
      newMarkers.push(this.state.markers[i]);
    }
    this.setState({ markers: newMarkers });
  }
  
  addMarker(lat, lng) {
    const newMarker = {lat: lat, lng: lng};
    this.setState((prevState) => {
      return { markers: [...prevState.markers, newMarker] };
    });
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Geolocation: ${latitude}, ${longitude}`);
        this.setState({
          center: {
            lat: latitude,
            lng: longitude
          }
        });
      }, () => {
        alert('Couldn\'t detect your location!');
      });
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Disperse</h1>
        </header>
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD7dmvGIm9RH7yITq4AD3cXbPL6Gq4ZA8U"
          center={this.state.center}
          marker={this.state.markerCenter}
          markers={this.state.markers}
          addMarker={this.addMarker.bind(this)}
          rightFunc={this.rightFunc.bind(this)}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
    
  }
}

export default App;