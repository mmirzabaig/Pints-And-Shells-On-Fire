import React from 'react';
import { Card } from 'semantic-ui-react';
// import ReactDOM from "react-dom";

 import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

  class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: []
    }

  }

  onMarkerClick = (props, marker, e) => {


    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      info: props

    });
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

  }



  render() {



    const tacoMarkers = this.props.tacos.restaurants.map((item) => {

      return(
        <Marker
          onClick = { this.onMarkerClick }
          position = {{ lat: item.restaurant.location.latitude, lng: item.restaurant.location.longitude }}
          icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          name = { item.restaurant.name }
          location = { item.restaurant.location.address }
          menu_url = { item.restaurant.menu_url }
        />
      )
    })



    const style = {
      width: '500px',
      height: '300px',
      left: '5%',
      position: 'fixed',
      border: '2px solid black'
    }
    return (
      <div>
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = {12 }
        initialCenter = {{ lat: this.props.pos[0], lng: this.props.pos[1] }}
      >
      <Marker
        onClick = { this.onMarkerClick }
        position = {{ lat: this.props.pos[0], lng: this.props.pos[1] }}
      />

      {tacoMarkers}

      <InfoWindow

        marker = { this.state.activeMarker }
        visible = { this.state.showingInfoWindow }
        onOpen={e => {
              this.onInfoWindowOpen(e, this.props);
            }}
      >
      <content>
      <div>
      <Card>
      <Card.Content>
        <Card.Header>{this.state.info.name}</Card.Header>
        { this.state.info.location }
        { this.state.info.menu_url }
        <Card.Description>

        </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <div id="aTour" />
        </Card.Content>
        </Card>
        </div>
      </content>

      </InfoWindow>
      </Map>

      </div>
    );
  }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyDRUpBESMbs6306QTg9QeIvQmbhApYl2Qw"
})(GoogleMapsContainer)
