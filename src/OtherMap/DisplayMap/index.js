import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Card, Button, Image } from 'semantic-ui-react';
import ReactDOM from "react-dom";
import swal from '@sweetalert/with-react';
import firebase from '../../firebaseConfig';
import MyMapComponent from './Map';




class DisplayMap extends React.PureComponent {
    constructor(props) {
        super();
        console.log(props, '1212')
    this.state = {
        isMarkerShown: false,
        info: [],
        brews: props.brews
        }
    }


  onMarkerClick = async (props, marker, e) => {
    console.log('hello')
    // this.setState({
    //   selectedPlace: props,
    //   activeMarker: marker,
    //   showingInfoWindow: true,
    //   info: props

    // });
    // console.log(this.state.info.photos[0])

  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  


  onInfoWindowOpen(props, e) {
    const button = (
      <Button color="blue" onClick={
        this.addTour.bind(null, this.state.info)
        }
      >Add to Brew Tour</Button>
    );
    ReactDOM.render(
      React.Children.only(button),
      document.getElementById("aTour")
    );
  }

  addTour = async (brewery, e) => {
      this.state.showingInfoWindow = false;
    e.preventDefault();
    swal(brewery.name + ' Has Been Added In Your Tour!');
    let jsonObj = {
      name: brewery.name,
      phone: brewery.phone,
      street: brewery.street,
      city: brewery.city,
      state: brewery.state,
      phone: brewery.phone,
      website_url: brewery.website_url,
      position: brewery.position
    }
    try {
      const addedBrewery = await fetch('http://localhost:9000/brews', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(jsonObj),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch(err){
      console.log('error')
      console.log(err)
    }
  }

 
  componentDidMount() {
    // console.log(this.props,)
  }

 


  render() {
    // const MyMapComponent = compose(
    //     withProps({
    //       googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDRUpBESMbs6306QTg9QeIvQmbhApYl2Qw&v=3.exp&libraries=geometry,drawing,places",
    //       loadingElement: <div style={{ height: `100%` }} />,
    //       containerElement: <div style={{ height: `400px` }} />,
    //       mapElement: <div style={{ height: `100%` }} />,
    //     }),
    //     withScriptjs,
    //     withGoogleMap
    //   )((props) => {
    //       return(
    //           <GoogleMap
    //           defaultZoom={11}
    //           defaultCenter={{ lat: 30.3005, lng: -97.7388 }}
    //         >
    //               {
    //               this.state.brews.map((item, index) => {
    //                 return (<Marker
    //                   key={index}
    //                   onClick = { this.onMarkerClick }
    //                   position = {item.position}
    //                   photos = {item.photos}
    //                   opening_hours = {item.opening_hours}
    //                   rating = {item.rating}
    //                   website = {item.website}
    //                   id={index}
    //                   name = { item.name }
    //                   address = { item.address }
    //                   place_id = { item.place_id }
    //                   icon = {{ url: require('../beer.png')}}
    //                   style={{size:'3'}}
    //                 />);
    //               }) }
    //         </GoogleMap>
    //       )
         
    //   }     
    //   );
    return (
    <div>
        <MyMapComponent style={{height: '100%'}} brews={this.state.brews} onMarkerClick={this.onMarkerClick} />

    </div>
    )
  }
}

export default DisplayMap;