import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Card, Button, Image } from 'semantic-ui-react';
import ReactDOM from "react-dom";
import swal from '@sweetalert/with-react';
import firebase from '../../../firebaseConfig';
import DirectionRenderComponent from './Directions';
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");


const mapHeight = (window.innerHeight / 1.15) - 30 + 'px'; // Using this variable to measure the height of the map container all the way at the end of this code
class DisplayMap extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            brews: props.brews
        }
    }
  async componentDidMount() {
      const db = firebase.firestore();
      let doc = 'UserData-' + firebase.auth().currentUser.uid
     await db.collection(doc).orderBy('timestamp',"asc")
      .onSnapshot(async(result) => {
        let array = [];
        await result.forEach((item, index) => {
          console.log(item.data().created, 'created')
          array.push(item.data());
        });
        let newArray = [];
        
        await array.forEach((item, index) => {
          // console.log(item, index)
          console.log(item.size)
          console.log()
          
          if (index > 0 && !item.hasOwnProperty('size')) {
            newArray.push({
              from: array[index-1].position,
              to: item.position
            });
          }
        })
        
        await this.setState({
          brewTour: newArray
        })

      })
    }

    onMarkerClick = async (props, marker, e) => {
        console.log('hello', props)
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true,
          info: props
    
        });
        // console.log(this.state.info.photos[0])
    
      }
    render () {

      
      if (this.state.brewTour) console.log(this.state.brewTour, 'mirza');

      return(
        <GoogleMap 
        defaultZoom={10}
        defaultCenter={{ lat: 30.3005, lng: -97.7388 }}
      >
          {
            this.state.brewTour ? this.state.brewTour.map((item, index) => {
              return (
                <DirectionRenderComponent
                  key={index}
                  index={index + 1}
                  strokeColor={'#f68f54'}
                  from={item.from}
                  to={item.to}
                />
            );
            }): null }            
            {/* {
            this.state.brews.map((item, index) => {
              return (<Marker
                key={index}
                onClick = { this.onMarkerClick }
                position = {item.position}
                photos = {item.photos}
                opening_hours = {item.opening_hours}
                rating = {item.rating}
                website = {item.website}
                id={index}
                name = { item.name }
                address = { item.address }
                place_id = { item.place_id }
                icon = {{ url: require('../../beer.png')}}
                style={{size:'3'}}
              />);
            }) } */}

            
      </GoogleMap>
    )
    }

}

   
      export default compose(
        withProps({
          googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDRUpBESMbs6306QTg9QeIvQmbhApYl2Qw&v=3.exp&libraries=geometry,drawing,places",
          loadingElement: <div style={{ height: `100%` }} />,
          containerElement: <div style={{ height: mapHeight }} />,
          mapElement: <div style={{ height: `100%` }} />,
        }),
        withScriptjs,
        withGoogleMap
      )(DisplayMap);;