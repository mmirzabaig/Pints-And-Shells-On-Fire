import React, { Component } from 'react';
import firebase from '../firebaseConfig/index';
import DisplayMap from './DisplayMap';


class OtherMap extends React.PureComponent {
  constructor(){
    super();

    this.state = {
   
    }
  }

  getBrewsInDB = () => {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(async(user) =>{
      console.log(user.uid, '<----- userrrr')
      let doc = 'UserData-' + user.uid
      console.log(doc, 'doc')
      await db.collection(doc).orderBy('timestamp',"asc")
        .onSnapshot(async(result) => {
          let array = [];
          await result.forEach((item, index) => {
            console.log(item.data(), 'created/MIRZA')
            array.push(item.data());
          })
          await this.setState({
            brewsFromDB: array
          })
  
        })
  
    })
  };

  getBrewsInDB = () => {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(async(user) =>{
      console.log(user.uid, '<----- userrrr')
      let doc = 'UserData-' + user.uid
      console.log(doc, 'doc')
      await db.collection(doc).orderBy('timestamp',"asc")
        .onSnapshot(async(result) => {
          let array = [];
          await result.forEach((item, index) => {
            console.log(item.data(), 'created/MIRZA')
            array.push(item.data());
          })
          await this.setState({
            brewsFromDB: array
          })
  
        })
  
    })
  };

  componentDidMount() {
    this.getBrewsInDB();
  }

  onHover = (name, address, opening_hours, photos, rating, website) => {

    this.setState({
      breweryName: name,
      breweryAddress: address,
      breweryOpening_hours: opening_hours,
      breweryPhotos: photos,
      breweryRating: rating,
      breweryWebsite: website,
      showBrewery: true
    })
    console.log(this.state)
  }
 
  render(){

    let height = window.innerHeight - 20 + 'px';

    const showBrewery = () => {
      let index = 0;
      return(
        <div>
          <p>{this.state.breweryName}</p>
          <p>{this.state.breweryAddress}</p>
          <p>{this.state.breweryRating}</p>
          <a href={this.state.breweryWebsite} target="_blank">{this.state.breweryWebsite}</a> <br/>
          <img width='500' src={this.state.breweryPhotos[index]}/>
        </div>
      );
    }
    return (
      <div style={{height: height, marginTop: '-.6%', display: 'flex'}}>
        {/* {this.state.brews ? <DisplayMap brews={this.state.brews} />: null} */}

        <div style={{height: '95%',width: '100%',border: '1px solid black', display: 'flex', flexDirection: 'column'}} >
          <div  className='map' style={{height: '100%', border: '2px solid blue'}}>
            {this.state.brewsFromDB ? <DisplayMap/> : null}
          </div>

          <div className='brewery' style={{height: '100%', border: '1px solid black', display: 'flex'}}>
            {
              this.state.brewsFromDB ? this.state.brewsFromDB.map((item, i) => (
                <div
                  name='mirza'
                  onMouseEnter={() => this.onHover(item.name, item.address, item.opening_hours, item.photos, item.rating, item.website)}
                  style={{width: '100%', border: '2px solid black'}}
                >
                  {i+1}
                  <p>{item.name}</p>
                </div>
              )) : null
            }
          </div>
        </div>

        <div style={{height: '95%',width: '100%', border: '2px solid pink'}}>
            {this.state.showBrewery ? showBrewery() : null}
        </div>
      </div>
      )
  }
}

export default OtherMap;
