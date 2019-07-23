import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';


class Register extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  handleSubmit = async (e) => {


    const loginResponse = await fetch('http://localhost:9000/auth/register', {
      method: 'POST',
      credentials: 'include', // this sends our session cookie with our request
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const parsedResponse = await loginResponse.json();
    console.log(parsedResponse)
    if(parsedResponse.data === 'registration successful'){
      // change our component
      console.log('success login')
      this.props.history.push('/');

    }
  }
  render(){

    const style = {
      'max-width': '300px',
      'text-align': 'center'
    }

    const formStyle = {
       width: '550px',
       top: '50px',
       margin: '20px auto'

    }
    const loginStyle = {
      height: '20px',
      margin: '10px'
    }

    const headingStyle = {
      color: 'black',
      'font-size': '25px',
      margin: '40px'
    }

    return (

      <div className="Login">
        <h2 style={headingStyle}>Sign up below</h2>
        <Form style={formStyle} onSubmit={this.handleSubmit}>

          <Form.Input placeholder='Username' type='text' name="username" onChange={this.handleChange} />

          <Form.Input placeholder='Password' type='password' name="password" onChange={this.handleChange} />
          <Button type="Submit" class="ui inverted black button">Submit</Button>
        </Form>

      </div>

      )
  }
}

export default Register;
