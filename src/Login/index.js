import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';
import firebase from '../firebaseConfig/index';


class Login extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: '',
      name: 'mirza'
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  handleSubmit = async (e) => {

    const provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider)
    firebase.auth().signInWithPopup(provider)
    .then(async(user) => {
      console.log(user)
      // await console.log('awefawfeawaf YELLOWWW')
      console.log('AOAOAOAOA')

      if(user.additionalUserInfo.isNewUser){
        console.log(firebase.auth().currentUser.uid)
        let currentUser = firebase.auth().currentUser.uid;
        let userData = {
           name: user.additionalUserInfo.profile.name,
            id: user.additionalUserInfo.profile.id,
            email: user.additionalUserInfo.profile.email,
            family_name: user.additionalUserInfo.profile.family_name,
            given_name: user.additionalUserInfo.profile.given_name,
            googleUserId: user.user.uid,
            currentUser: currentUser
        }
        // let userData = {
        //   name: 'MIRZA'
        // }
   

        const addUserToDB = await fetch('https://us-central1-pintsandshells-e38a2.cloudfunctions.net/helloWorld1', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        await this.props.history.push('/');


        const addUserResponse = await addUserToDB.json();

   
        // const db = firebase.firestore();
        // db.collection('User').doc(firebase.auth().currentUser.uid)
        // .set({
        //   name: user.additionalUserInfo.profile.name,
        //   id: user.additionalUserInfo.profile.id,
        //   email: user.additionalUserInfo.profile.email,
        //   family_name: user.additionalUserInfo.profile.family_name,
        //   given_name: user.additionalUserInfo.profile.given_name,
        //   googleUserId: user.user.uid
        // })
      } else {
        this.props.history.push('/')
      }

      // this.props.history.push('/');
    })
    // const loginResponse = await fetch('http://localhost:9000/auth/login', {
    //   method: 'POST',
    //   credentials: 'include', // this sends our session cookie with our request
    //   body: JSON.stringify(this.state),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    //
    // const parsedResponse = await loginResponse.json();
    // console.log(parsedResponse)
    // if(parsedResponse.data === 'login successful'){
    //   // change our component
    //   console.log('success login')
    //   this.props.history.push('/')
    //
    // }
  }
  render(){

    const style = {
      'max-width': '300px',
      'text-align': 'center'
    }

    const responseFacebook = (response) => {
      console.log(response);
    }

    const responseGoogle = (response) => {
      console.log(response);
    }
    const formStyle = {
       width: '550px',
       top: '50px',
       margin: '20px auto'

    }
    const loginStyle = {
      height: '40px',
      margin: '10px'
    }

    const headingStyle = {
      color: 'black',
      'font-size': '25px',
      margin: '40px'
    }

    return (

      <div className="Login">
        <h2 style={headingStyle}>Sign in below with Google</h2>

      <br />
      <br />

      <Button style={loginStyle} onClick={this.handleSubmit}>
        Google Login
      </Button>



      </div>

      )
  }
}

export default Login;
