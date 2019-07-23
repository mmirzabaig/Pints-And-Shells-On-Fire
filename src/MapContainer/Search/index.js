import React, { Component } from "react";
import { Input } from 'semantic-ui-react';

import PropTypes from "prop-types";

export class Search extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };
  static defaultProperty = {
    suggestions: []
  };
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
            filteredSuggestions.map((suggestion, index) => {
              let className;
              if (index > 5) {
                  return;
              }
              if (index === activeSuggestion) {
                className = "";
              }

              return (
                <div style={{color: 'black', position: 'relative', border: '2px solid green'}} key={suggestion} onClick={onClick}>
                  {suggestion}
                </div>
              );
            })
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions</em>
          </div>
        );
      }
    }
    let menuHeight = window.innerHeight / 16 + 'px';
    let menuWidth = window.innerWidth / 7 + 'px';
    

    return (
        <div className='search' style={{borderRadius: '50px', width: menuWidth, height: menuHeight, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: '1', left: '75%', top: '5%', background: 'black', opacity: '0.8', }}>      
                <div className='input'> 
                    <input
                        type="search"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={userInput}
                        style={{background: 'black', border: '1px solid white', height: menuHeight, width: menuWidth,  outline: 'none', color: 'white', placeholder: 'brewerey', borderRadius: '50px' }}  
                        size='small' 
                    />
                </div>
                <div>
                    {suggestionsListComponent}
                </div>
        </div>
      
    );
  }
}

export default Search;


{}
