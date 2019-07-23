import React, { Component } from 'react';
import { Card, Button, Image, Form, Label, Input } from 'semantic-ui-react';
import ReactDOM from "react-dom";
 import swal from '@sweetalert/with-react';
import './Map.css';
import firebase from '../firebaseConfig';
import Search from './Search';


 import { GoogleApiWrapper, InfoWindow, Map, Marker, Content, Places, Directions, MapViewDirections, MapView } from 'google-maps-react';

  class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
    }
    console.log(props, 'MAP DATA')
  }

  onMarkerClick = async (props, marker, e) => {

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      info: props

    });
    console.log(this.state.info.photos[0])

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
    if (this.props.brewsInDbLength < 5) {
      const button = (
        <Button color="blue" onClick={
          this.addTour.bind(null, this.state.info)
          }
        >Add to Brew Tour</Button>
      );
    
    
    
      ReactDOM.render(
        React.Children.only(button),
        document.getElementById("aTour")
      )
    }
  }

  addTour = async (brewery, e) => {
    
    const db = firebase.firestore();
    console.log(firebase.auth().currentUser.uid)

  
    this.state.showingInfoWindow = false;
    console.log(brewery);
    e.preventDefault();
    swal(brewery.name + ' Has Been Added In Your Tour!');

    let jsonObj = {};
    // brewery.choiceNumber =
    jsonObj['timestamp'] = new Date().toLocaleString();


    if (brewery.name) {
     jsonObj['name'] = brewery.name;
    }
    if (brewery.address) {
      jsonObj['address'] = brewery.address;
    }
    if (brewery.opening_hours) {
      jsonObj['opening_hours'] = brewery.opening_hours;
    }
    if (brewery.photos) {
      jsonObj['photos'] = brewery.photos;
    }
    if (brewery.rating) {
      jsonObj['rating'] = brewery.rating;
    }
    if (brewery.place_id) {
      jsonObj['place_id'] = brewery.place_id;
    }
    if (brewery.website) {
      jsonObj['website'] = brewery.website;
    } 
    if (brewery.position) {
      jsonObj['position'] = brewery.position;
    }
    let doc = 'UserData-' + firebase.auth().currentUser.uid;
    console.log(brewery.place_id, 'place_id')
    console.log(doc, 'doc');
    console.log(jsonObj, 'obj')

    
    db.collection(doc).doc(brewery.place_id)
    .set(jsonObj)
    .then(() => {
      // console.log(result.data(), '1243')
      // result.forEach(x => console.log(x.data()))
    })
    // console.log(jsonObj)
    try {
      // const addedBrewery = await fetch('http://localhost:9000/brews', {
      //   method: 'POST',
      //   credentials: 'include',
      //   body: JSON.stringify(jsonObj),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
    } catch(err){
      console.log('error')
      console.log(err)
    }
  }

  getBreweries = async () => {
    try {

      const db = firebase.firestore();
   
      await db.collection('Cities').doc('Austin').collection('Breweries')
      .onSnapshot(async(result) => {
        let array = [];
          await result.forEach(async(brewery) => {
              await array.push(brewery.data());
        })
        let newArray = [];
        let nameArray = [];
         await array.forEach((brewery) => {
          if(brewery.hasOwnProperty('geometry')) {

              let obj = {
                name: brewery.name,
                address: brewery.formatted_address,
                position: {
                  lat: brewery.geometry.location.lat,
                  lng: brewery.geometry.location.lng
                },
                place_id: brewery.place_id,
                rating: brewery.rating,
                website: brewery.website,
                photos: brewery.photos,
                opening_hours: brewery.opening_hours,
              }
              
              nameArray.push(brewery.name);
              newArray.push(obj);

          }
        })
        await console.log(newArray)

        await this.setState({
          brews: newArray,
          autoFillNames: nameArray
        })
      })

    } catch (err) {
      return err;
    }
  }
    componentDidMount() {
      this.getBreweries()
      // .then((item) => {
      //   console.log(item);
      //   this.setState({
      //     brews: item
      //   })
      // })
    }

   handleChage = () => {

   }


  render() {

    const origin = {latitude: 37.3318456, longitude: -122.0296002};
    const destination = {latitude: 37.771707, longitude: -122.4053769};
    let mapHeight = window.innerHeight - 30 + 'px';
    const style = {
      width: '100%',
      height: mapHeight,
      position: 'fixed',
      border: '1px solid black',
    }



    // let menuHeight = window.innerHeight / 12 + 'px';
    // let menuWidth = window.innerWidth / 7 + 'px';
    
    return (
      <div>

      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = {11 }
        initialCenter = {{ lat: 30.3005, lng: -97.7388 }}
      > 
        {this.state.autoFillNames ? (
          <Search
            suggestions={this.state.autoFillNames}
        />
        ) : null}
      {/* <div className='search' style={{width: menuWidth, height: menuHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: '1', left: '75%', top: '5%', background: 'black', opacity: '0.8'}}>
      
        <Form autocomplete="off" style={{position: 'relative'}} onSubmit={this.handleSubmit}>
          <Input style={{background: 'black'}}  size='small' placeholder='Username' type='text' name="username" onChange={this.handleChange} />
        </Form>

      </div> */}
      {
        this.state.brews ? this.state.brews.map((item, index) => {
          return (<Marker
            key={index}
            onClick = { this.onMarkerClick }
            position = {item.position}
            photos = {item.photos}
            opening_hours = {item.opening_hours}
            rating = {item.rating}
            website = {item.website}
            id={index}
            ref={index === 5 ? input => this.inputElement = input : '' }
            name = { item.name }
            address = { item.address }
            place_id = { item.place_id }
            icon = {{ url: require('../MainComponent/beerP.ico')}}
            style={{size:'3'}}
          />);
        }) : null
      }
        <InfoWindow

          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
          onOpen={e => {
                this.onInfoWindowOpen(this.props, e);
              }}
        >
        <content>
        <div>
        <Card classNames="fade">
        {this.state.info.photos ? <img style={{width: '500px', height: '300px'}} className='infoImage' src={this.state.info.photos[1]} />: null }
            <Card.Content>
              <Card.Header>{this.state.info.name}</Card.Header>
              <Card.Description>
              {this.state.info.address}<br />
              {this.state.info.rating}<br/>
            <a href={this.state.info.website} target='_blank' >{this.state.info.website}</a><br/>
              
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
