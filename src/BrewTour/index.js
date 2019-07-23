import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import TacoMapContainer from '../TacoMapContainer';
import Tacos from '../Tacos'
import swal from '@sweetalert/with-react';
import '../App.css';


class BrewTour extends Component {
  constructor(){
    super();

    this.state = {
      tourData: []
    }
  }

  getTourData = async () => {
    try{

      const brewTourData = await fetch('http://localhost:9000/brews');
      const brewTourDataJson = await brewTourData.json();
      return brewTourDataJson;

    } catch(err) {
      return(err)
    }
  }

  deleteBrewTour = async (id) => {
    swal('Your Trip Has Been Deleted, Go Back To Add Another!')
    const deletedBrewTourResponse = await fetch('http://localhost:9000/brews/' + id, {
      method: 'DELETE'
    });

    const deleteBrewTourJson = deletedBrewTourResponse.json();
    
    this.setState({
      tourData: this.state.tourData.data.filter((tour) => tour._id !== id)
    })
  }


  componentDidMount() {
    this.getTourData().then((data) => {
      this.setState({
        tourData: data
      })
    }).catch((err) => {
      console.log(err);
    })
  }



  render() {

    const style = {
      color: 'black',
      height: '400px',
      fontWeight : 'Bold',
      border: '2px solid black',
      width: '950px',
      textAlign: 'right',
      margin: '12px 0 12px 25%',

    }


    let tourData;
    if(this.state.tourData.data) {

    tourData = this.state.tourData.data.map((item, index) => {

      return(
        <div key={item._id} style={style}>
          <Button onClick={this.deleteBrewTour.bind(null, item._id)}>Delete</Button>
          <p>{item.name}</p>

              <Tacos pos={[item.position[0].lat, item.position[0].lng]}  />


        </div>
      );

    })

  }
    return(

      <div class='two column row'>
        {tourData}
    </div>
    );
  }
}

export default BrewTour;
