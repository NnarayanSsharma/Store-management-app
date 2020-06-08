import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";


class Map extends Component {
    constructor(props) {
        super(props)
        
        const localStorageData = localStorage.getItem("users");
        let userArray = [];
        if(localStorageData){
            userArray = JSON.parse(localStorageData);
        }
        console.log(this.props)
        let storeData = userArray.filter( item=> item.key === this.props.paramsData.match.params.parentStoreKey )
        console.log(storeData)
        this.state = {
            storeKey: this.props.paramsData.match.params.parentStoreKey,
            data: userArray,
            lat: null, 
            lng: null,
            selectedMark: null,
            centerPosition: {lat: storeData[0].location.lat, lng: storeData[0].location.lng}
        }
    }


    
    render() {
        console.log(this.state.storeKey)
        console.log(this.state.data)
        console.log(this.state.selectedMark)
        let storeData = this.state.data.filter( item=> item.key === this.state.storeKey )
        console.log(storeData[0].subStore)

        let storeMarker = storeData.map(mark=> {
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
        
        let subStoreMarker = storeData[0].subStore.map(mark=> {
            return  (<Marker
                        key={mark.key}
                        position={{
                        lat: mark.location.lat,
                        lng: mark.location.lng
                        }}
                        icon={{
                        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                        scaledSize: new window.google.maps.Size(40, 40)
                        }}
                        onClick={()=>{
                            this.setState({selectedMark: mark})
                        }}
                    />)
                }
            )
        
        let store = <h1>Store</h1>
        let subStore = <h1>Substore</h1>

        let storeInfoWindow = this.state.selectedMark && (
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
                    {this.state.selectedMark.key === this.state.storeKey ? store : subStore}
                    <h3>{this.state.selectedMark.key}</h3>
                    <h3>{this.state.selectedMark.address}</h3>
                </div>
            </InfoWindow>
        )
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={this.state.centerPosition}
                // defaultOptions={{ styles: mapStyles }}
            >   
                <div>
                    {storeMarker}
                    {subStoreMarker}
                    {storeInfoWindow}
                </div>
            </GoogleMap>
        )
    }
}


const WrappedMap = withScriptjs(withGoogleMap(Map));

function ShowSubStore(props) {
    console.log(props)
    return (
        <div>
            <h1>SubStores</h1>
            <div className="squarebox blue"><span>Store</span></div>
            <div className="squarebox green"><span>Substore</span></div>

            <div style={{ width: "100%", height: "66vh", paddingBottom: "1rem"  }}>
                <WrappedMap
                    googleMapURL= "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBSTjFMTei2xgFZhbyeQPo7UXXBeK3r35s"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    paramsData={props}
                />
            </div>
            <div className="back"><Link to={`/store/${props.match.params.parentStoreKey}`}>Back</Link></div>              
        </div>
    )

}

export default ShowSubStore
