import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class FormStore extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            key: '',
            name: '',
            email: '',
            number: '',
            address: '',
            subStore: [],
            numberOfSubStore: 0
        }
    }
    
    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value,
            key: `store${Date.now()}`
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const userData = this.state;
        // get existing users from localstorage

        const userString = localStorage.getItem("users");
        let userArray = [];

        if(userString){
            // if user exists, then parse it from string to an array
            userArray = JSON.parse(userString)
        }
        userArray.push(userData)
        localStorage.setItem("users", JSON.stringify(userArray));
        window.location = "/";
    }
    render() {
        return (
            <div className="form-store">
                <h1>Create Store Data</h1>
                <div>
                    <form onSubmit={this.handleSubmit} className="form">
                        <label>Name</label>
                        <input 
                            type="text"
                            name="name"
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

                        <button>Create Store</button>
                    </form>
                    {/* <Link to="/store/substore">Add SubStore</Link> */}
                </div>
            </div>
        )
    }
}

export default FormStore
