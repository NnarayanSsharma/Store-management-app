import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

class UpdateStoreData extends Component {
    constructor(props) {
        super(props)
    
        const users = localStorage.getItem("users");
        let userArray = [];
        if(users){
            userArray = JSON.parse(users);
        }
        let data = userArray.filter(item=> item.key === this.props.match.params.key)
        
        this.state = {
            // userArray: userArray,
            key: this.props.match.params.key,
            name: data[0]?data[0].name:'',
            email: data[0]?data[0].email:'',
            number: data[0]?data[0].number:'',
            address: data[0]?data[0].address:'',
            numberOfSubStore: data[0]?data[0].subStore.length:0,
            subStore: [],
            location: {lat: data[0]?data[0].location.lat:null, lng: data[0]?data[0].location.lng: null}

        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const users = localStorage.getItem("users");
        let userArray = [];
        if(users){
            userArray = JSON.parse(users);
        }
        
        localStorage.clear()
        // let filterArray = userArray.filter(item=> item.key != this.props.match.params.key )

        const results = await geocodeByAddress(this.state.address);
        const latLng = await getLatLng(results[0]);
        console.log(results)
        console.log(latLng)

        this.setState({
            location: {
                lat: latLng.lat,
                lng: latLng.lng
            }
        })

        userArray.forEach((item)=> {
            console.log(item.address)
            
            if(item.key === this.props.match.params.key){
                item.name = this.state.name;
                item.email = this.state.email
                item.address = this.state.address
                item.number = this.state.number
                item.location = this.state.location
            }
        })
        console.log(userArray)

        // const newArr = [...filterArray, this.state]
        
        localStorage.setItem("users", JSON.stringify(userArray));
        window.location = "/";
    }



    
    render() {
        return (
            <div className="update-storeData">
                <h1>Update StoreData</h1>
                <div className="form-store">
                    <div>
                        <form  className="form" onSubmit={this.handleSubmit}>
                            <label>Name</label>
                            <input 
                                type="text"
                                name="name"
                                defaultValue={this.state.name}
                                value={this.state.name}
                                onChange={this.handleChange}
                            />

                            <label>Email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            
                            <label>Contact Number</label>
                            <input 
                                type="number" 
                                name="number"
                                value={this.state.number}
                                onChange={this.handleChange}
                            />
                            
                            <label>Address</label>
                            <input 
                                type="text"
                                name="address"
                                value={this.state.address}
                                onChange={this.handleChange}
                            />

                            <button>Update Successfully</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateStoreData
