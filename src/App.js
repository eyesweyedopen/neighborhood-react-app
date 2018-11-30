import React, { Component } from 'react';
import MapContainer from './MapContainer.js';
import Menu from './Menu.js'
import './App.css';

class App extends Component {
  state = {
    searchQuery: {
      location: { lat: 41.646784, lng: -86.242087 },
      radius: '10000',
      type: ['restaurant']
    },
    clicked: false,
    list: [],
    markerToAnimate: '',  // denotes the marker that is currently active => passed to MapContainer
    infoWindowStatus: false,  // denotes if the InfoWindow should be displayed => passed to MapContainer
    placeDetails: 'default',  // denotes the google maps marker props
    markerAnimationList: []
  }

  toggle(e) {
    if (!this.state.clicked) {
      this.setState({ clicked: true })
    } else {
      this.setState({ clicked: false })
    }
  }

  onUpdateMarkerAnimations(props, list) {
    console.log(list);
    props.map.setCenter(props.position);
    props.map.setZoom(15);
    for (let animationId in list) {
      if (animationId == props.id) {
        list[animationId] = 4;
      } else {
        list[animationId] = null;
      }
    }
    this.setState({ markerAnimationList: list })
  }

  onHandleClick(place, e) {
    // console.log(place);
    this.toggle();
    this.setState({markerToAnimate: place})
    const newList = this.state.markerAnimationList;
    for (let i in newList) {
      if (i == place.id) {
        newList[i] = 4;
      } else {
        newList[i] = null;
      }
    }
    console.log(this.state.markerToAnimate);
    // place.map.setCenter(place.location);
    // place.map.setZoom(15);
    // this.setState({markerAnimationList: newList})
  }

  markerClick(props, marker, e) {
    console.log(this.state.infoWindowStatus)
    const updatedAnimations = { ...this.state.markerAnimationList }
    this.onUpdateMarkerAnimations(props, updatedAnimations)
    this.setState({
      placeDetails: props,
      markerToAnimate: marker,
      infoWindowStatus: true,
    })
  }

  setBounds(bounds) {
    const center = new window.google.maps.LatLng(bounds.getCenter().lat(), bounds.getCenter().lng());
    return center
    // return [{ lat: 41.632817, lng: -86.278303 }, { lat: 85.656358, lng: -26.236762 }]
    // !(this.state.searchQuery.bounds) && this.setState((prevState) => {
    //   return {searchQuery: {bounds: bounds, query: prevState.searchQuery.query}}
    // })
  }

  createMarkerIdList(places) {
    const idList = {};
    places.map((place) => {
      idList[place.id] = null;
    })
    this.setState({ markerAnimationList: idList })
  }

  onCloseInfoWindow() {
    console.log(this);
    this.setState({
      infoWindowStatus: false,
      markerToAnimate: null
    })
  }

  returnInfoWindowStatus() {
    return this.state.infoWindowStatus;
  }

  generateList(list) {
    this.setState({list: list});
    this.createMarkerIdList(list);
  }

  render() {
    return (
      <div className="App">
        <div className="main-content">
          <header className="App-header">
            <div>
              <img onClick={(e) => this.toggle(e)} className="menu-icon" src="menu.ico" height="40em" />
            </div>
            <p id="title">Neighborhood React Project</p>
          </header>
          <div className="container">
            <MapContainer

              placesList={this.state.list}
              showingInfoWindow={this.returnInfoWindowStatus()}
              activeMarker={this.state.markerToAnimate}
              selectedPlace={this.state.placeDetails}
              shouldMinify={this.state.clicked}
              query={this.state.searchQuery}
              newList={this.state.markerAnimationList} 

              generatePlacesList={this.generateList.bind(this)}
              onMarkerClick={this.markerClick.bind(this)}
              closeInfoWindow={this.onCloseInfoWindow.bind(this)}
              updateMarkerAnimations={this.onUpdateMarkerAnimations.bind(this)} 
              updateBounds={this.setBounds.bind(this)} 
              // selectedMarker={this.state.markerToAnimate} 
              />
          </div>
        </div>

        { (this.state.list&&this.state.clicked) ? <Menu handleClick={this.onHandleClick.bind(this)} listOfPlaces={this.state.list} wasClicked={this.state.clicked} /> : null }
      </div>
    );
  }
}

export default App;
