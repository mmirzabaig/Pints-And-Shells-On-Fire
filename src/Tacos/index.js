import React, { Component } from 'react';
import TacoMapContainer from '../TacoMapContainer';

class Tacos extends Component {
  constructor(props){
    super(props);

    this.state = {
      tacos: [],
      deriveProps: this.props,
      pos: this.props.pos
    }


    console.log(this.state, 'CONSTRUCTOR FUNCTION JUST RAN')
  }

//get tacos

  getTacos = async () => {
    try {

       console.log('hello mirza')
      const tacosData = await fetch('https://developers.zomato.com/api/v2.1/search?lat=' + this.state.deriveProps.pos[0] + '&lon=' + this.state.deriveProps.pos[1] + '&radius=1609.34&count=10&category=tacos&sort=real_distance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'user-key': 'ef8d69da47e7a4a0e7a44ca73a44c018'
        }
      });
      const tacosDataJson = await tacosData.json();

      return tacosDataJson;
    } catch(err) {
      return(err)
    }
  }

  componentWillMount(){
    this.getTacos().then((item) => {
      this.setState({
        tacos: item
      })
    }).catch((err) => {
      console.log(err)
    })
  }



  render(){

    return(!Array.isArray(this.state.tacos) ?
      <TacoMapContainer pos={this.props.pos} tacos={this.state.tacos} /> : null
    );
  }
}

export default Tacos;
