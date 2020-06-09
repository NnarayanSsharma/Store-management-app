import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import axios from 'axios'

class Map extends Component{

    constructor(props) {
        super(props)

        const localStorageData = localStorage.getItem("users");
        let userArray = [];
        if(localStorageData){
            userArray = JSON.parse(localStorageData);
        }
    
        this.state = {
            data: userArray,
            lat: null, 
            lng: null,
            selectedMark: null
        }
    }

    render(){
        console.log(this.state.data)
        console.log(this.state.selectedMark)
        // console.log(this.state.lat, this.state.lng)
        let marker = this.state.data.map(mark=> {
            return  (<Marker
                        key={mark.key}
                        position={{
                        lat: mark.location.lat,
                        lng: mark.location.lng
                        }}
                        icon={{
                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        scaledSize: new window.google.maps.Size(40, 40)
                        }}
                        onClick={()=>{
                            this.setState({selectedMark: mark})
                        }}
                    />)
                }
            )
        let infoWindow = this.state.selectedMark && (
            <InfoWindow
                position={{
                    lat: this.state.selectedMark.location.lat,
                    lng: this.state.selectedMark.location.lng
                }}
                onCloseClick={()=> {
                    this.setState({selectedMark: null})
                }}
            >
                <div>
                    <h1>Store Details</h1>
                    <h3>{this.state.selectedMark.key}</h3>
                    <h3>{this.state.selectedMark.address}</h3>
                </div>
            </InfoWindow>
        )
        return (
            <GoogleMap
                defaultZoom={9}
                defaultCenter={{ lat: 18.516726, lng: 73.856255 }}
                // defaultOptions={{ styles: mapStyles }}
            >   
                <div>
                    {marker}
                    {infoWindow}
                </div>
            </GoogleMap>
        )
    }
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function ShowOnGMap() {

    return (
        <div style={{ width: "100%", height: "85vh" }}>
            <WrappedMap
                googleMapURL= "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=YOUR-KEY"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}

export default ShowOnGMap
