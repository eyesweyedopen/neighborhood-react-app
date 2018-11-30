import React from 'react'
import { Marker } from 'google-maps-react'
import GoogleApiComponent from 'google-maps-react/dist/GoogleApiComponent';

const Listing = (props) => {
        console.log(props.place.geometry.location.lat())
            return (
                <Marker
                    title={"title"}
                    key={props.place.id}
                    name={props.place.formatted_address}
                    position={{ lat: props.place.geometry.location.lat(), lng: props.place.geometry.location.lng() }}
                />
            )
}

export default Listing;