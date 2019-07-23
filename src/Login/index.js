import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
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
      if(user.additionalUserInfo.isNewUser){
        await console.log(firebase.auth().currentUser.uid)
        let currentUser = await firebase.auth().currentUser.uid;
        let userData = await {
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
        await console.log(userData)

        const addUserToDB = await fetch('https://us-central1-pintsandshells-e38a2.cloudfunctions.net/helloWorld1', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
    

        const addUserResponse = await addUserToDB.json();
        await console.log(addUserResponse);
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
        <h2 style={headingStyle}>Sign in below with Facebook or Google</h2>

      <div style={loginStyle}>
        <FacebookLogin
          style={loginStyle}
          appId="2012853998969903" //APP ID NOT CREATED YET
          fields="name,email,picture"
          callback={responseFacebook}
        />
      </div>

      <br />
      <br />

      <Button style={loginStyle} onClick={this.handleSubmit}>
        Google Login
      </Button>

      <Form style={formStyle} onSubmit={this.handleSubmit}>

        <Form.Input placeholder='Username' type='text' name="username" onChange={this.handleChange} />

        <Form.Input placeholder='Password' type='password' name="password" onChange={this.handleChange} />
        <Button type="Submit" class="ui inverted black button">Login</Button> <br/><br/>
        <Link to='/register'><Button class="ui inverted black button">Register</Button></Link>
      </Form>

      </div>

      )
  }
}

export default Login;
