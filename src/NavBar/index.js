import React, { Component } from 'react'
import { Menu, Segment, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import firebase from '../firebaseConfig';
// import '../App.css';

export default class MenuExampleInvertedSecondary extends Component {
   
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  // breweriesInDB = () => {
  //   const db = firebase.firestore();

  // }

  componentDidMount() {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(async(user) =>{
      if (user === null) {
        return;
      } else {
        console.log(user, '<----- userrrr')
        let doc = 'UserData-' + user.uid
        console.log(doc, 'doc')
        await db.collection(doc).orderBy('timestamp',"asc")
          .onSnapshot(async(result) => {
            let array = [];
            await result.forEach((item, index) => {
              console.log(item.data(), 'created')
              array.push(item.data());
            })
            await this.setState({
              brewTour: array
            })
    
          })
      }
    })
  }

  render() {

    if(this.state.brewTour) {
      console.log(this.state.brewTour, 'brewToyr')
    }

    const { activeItem } = this.state
    const style = {
      fontSize: '17px',
      // marginBottom: '5px'
    }

    const styleFull = {
      fontSize: '17px',
      color: 'yellow'
    }

    const headingStyle = {
      color: 'white',
      fontSize: '24px',
      marginLeft: '27%'
    }

      const navBar = {
        position: 'relative',
        marginBottom: '10px',
        // top: 0,
        zIndex: '2',
      }


    return (
      <div className='navBar' style={navBar}>
      <style>
        @import url('https://fonts.googleapis.com/css?family=Permanent+Marker');
        @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,700|Vidaloka');
      </style>

      <Segment inverted >

        <Menu inverted pointing secondary style={{height: '20px' }}>

        <Image src={require('../images/logoCircle.png')} style={{height:'60px', marginTop: '-10px'}}/>


          <Menu.Item name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}>
            <Link style={style} to="/">Home</Link>
          </Menu.Item>

          <Menu.Item name='View Your Tour'
            active={activeItem === 'View Your Tour'}
            onClick={this.handleItemClick}>

            <Link style={this.state.brewTour ? this.state.brewTour.length < 5 ? style : styleFull : null} to="/OtherMap">View Your Tour</Link>

          </Menu.Item>

          <p style={headingStyle}>Pints And Shells</p>

          <Menu.Item name='GitHub'
            position='right'
            href='//github.com/WBHankins93/Pints-Shells'
            active={activeItem === 'GitHub'}
            onClick={this.handleItemClick}>
            <Link style={style} to="">GitHub</Link>
          </Menu.Item>

          <Menu.Item name='Logout'
            active={activeItem === 'Logout'}
            onClick={this.handleItemClick}>
            <Link style={style} to="/login">Logout</Link>
          </Menu.Item>

          <Menu.Item name='Login'
            active={activeItem === 'Login'}
            onClick={this.handleItemClick}>
            <Link style={style} to="/login">Login</Link>
          </Menu.Item>

        </Menu>
      </Segment>
      </div>
    )
  }
}
