import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class FormSubStore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            storeKey: this.props.match.params.key,
            key: '',
            name: '',
            email: '',
            number: '',
            address: '',

        }
    }
    
    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value,
            key: `subStore${Date.now()}`
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const {key, name, email, number, address} = this.state
        if(!name && !key && !email && !number && !address){
            alert("plese fill input fields")
        }else{
            const users = localStorage.getItem("users");
            let userArray = [];
            if(users){
                userArray = JSON.parse(users);
            }
            for(let i = 0; i < userArray.length; i++){
                if(userArray[i].key === this.props.match.params.key){
                    userArray[i].subStore.push(this.state)
                }
            }
            localStorage.setItem("users", JSON.stringify(userArray));
            window.location = `/store/${this.props.match.params.key}`;

        }
        
    }
    render() {
        const users = localStorage.getItem("users");
        let userArray = [];
        if(users){
            userArray = JSON.parse(users);
        }
        let data = userArray.filter(item=> item.key === this.props.match.params.key)
        
        return (
            <div className="form-store">
                <h1>Create SubStore Data</h1>
                <div>
                    <h2>Store Name: {data[0].name} </h2>
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

                        <button>Create SubStore</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default FormSubStore
