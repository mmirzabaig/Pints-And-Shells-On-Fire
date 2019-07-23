import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

import '../index.css';

class BrewLocator extends Component {


constructor(props) {
  super(props);

  this.state = {
    coordinates: [],
    data: []
  }
}

render() {
  let i = 1;
  const brewLocations = this.props.locationData.map((item, index) => {
  i++;
  return (
    <Card key={index}>
      <Card.Content>
        <Card.Header>{item.name}</Card.Header>
          <Card.Description>
            {item.street}<br />
            {item.city}, {item.state}<br />
            {item.website_url}<br />
            Longitude: {item.longitude}<br />
            Latitude: {item.latitude}<br />
          </Card.Description>
          </Card.Content>
          <Card.Content extra>
        <Button color="green">Add to Brew Tour</Button>
      </Card.Content>
    </Card>
    )
  });
return(
    <div>
      <ul>{brewLocations}</ul>
    </div>
    );
  }
}

export default BrewLocator;
