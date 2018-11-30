import React, { Component } from 'react'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import Listing from './Listing.js'

export class MapContainer extends Component {
    state={
        places: [],
        selectedPlace: 'default',
        markerAnimation: '',
        zoomLevel: 5,
        center: this.props.query.location,
        bounds: new window.google.maps.LatLngBounds()
    }

    fetchPlaces(mapProps, map) {
        const { google } = mapProps;
        const service = new google.maps.places.PlacesService(map);

        service.nearbySearch(this.props.query, (results, status) => this.makeMarkers(results, status, google));
    }

    makeMarkers(res, status, google) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            const placeList = [];
            for (let result of res) {
                placeList.push(result)
            }
            this.props.generatePlacesList(placeList);
            this.extendBounds(placeList);
        }
    }

    extendBounds(list) {
        const points = list.map((place) => place.geometry.location);
        const bounds = new window.google.maps.LatLngBounds();
        for (let point of points) {
            bounds.extend(point)
        }
        this.setState({bounds: bounds});
        this.props.updateBounds(bounds);
    }

    test(props) {
        console.log(props);
    }

    onMapClick(props) {
        if (this.props.showingInfoWindow) {
            this.props.closeInfoWindow();
        }
    }

    monitorWidth() {
        return this.props.shouldMinify ? { width: '60vw', height: '90vh' } : { width: '100vw' , height: '90vh' }
    }

    handleChange(e) {
        console.log(e);
    }

    getBounds() {
        return this.state.bounds;
    }

    render() {

        const google = this.props.google;
        console.log(this.props);

        return (
            <Map 
                className={`map ${this.props.shouldMinify ? 'small' : ''}`}
                style={this.monitorWidth()}
                google={google}
                initialCenter={{ lat: 41.646784, lng: -86.242087 }}
                // zoom={this.state.zoomLevel}
                bounds={this.getBounds()}
                onReady={this.fetchPlaces.bind(this)}
                onClick={this.onMapClick.bind(this)}>
                {this.props.placesList && this.props.placesList.map((place) => {
                    return (
                    <Marker
                        onChange={((e) => this.handleChange.bind(this, e))}
                        id={place.id}
                        height={this.markerHeight}
                        onClick={this.props.onMarkerClick.bind(this)} 
                        key={place.id} 
                        name={place.name}
                        position={{lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}}
                        animation={this.props.newList[place.id]}
                    ></Marker>
                    )}, this)}
                <InfoWindow
                    marker={this.props.activeMarker}
                    visible={this.props.showingInfoWindow}>
                    <div>
                        <h1>{this.props.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper((props) => ({
    apiKey: ("AIzaSyDiqc07QP9TUx1GyT91KB-FERkS8lBa_A0"),
    onHandleChangeAnimations: props.onHandleChangeAnimations
}))(MapContainer)