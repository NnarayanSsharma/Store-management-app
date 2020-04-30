import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class UpdateSubStoreData extends Component {
    
    constructor(props) {
        super(props)

        let users = localStorage.getItem("users");
        let userArray = [];
        if(users){
            userArray = JSON.parse(users);
        }
        let name = '';
        let email = '';
        let number = '';
        let address = '';
        let subKey = this.props.match.params.subStoreKey;
        userArray.forEach(item=>{
            for(let i = 0; i < item.subStore.length; i++){
                if(item.subStore[i].key === subKey){
                    name = item.subStore[i].name;
                    email = item.subStore[i].email;
                    number = item.subStore[i].number;
                    address = item.subStore[i].address;
                }
                
            }
        })
        this.state = {
            storeKey: this.props.match.params.parentStoreKey,
            key: this.props.match.params.subStoreKey,
            name: name,
            email: email,
            number: number,
            address: address,
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let users = localStorage.getItem("users");
        let userArray = [];
        if(users){
            userArray = JSON.parse(users);
        }
        let subKey = this.props.match.params.subStoreKey;
        userArray.forEach(item=>{
            for(let i = 0; i < item.subStore.length; i++){
                if(item.subStore[i].key === subKey){
                    item.subStore.splice(i,1)
                    item.subStore.push(this.state)
                }

            }
        })
        localStorage.clear()
        localStorage.setItem("users", JSON.stringify(userArray))
        window.location = `/store/${this.props.match.params.parentStoreKey}`

    }
    
    render() {
        return (
            <div className="update-substore-data">
                <h1>Update SubStoreData</h1>
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
                <div className="back"><Link to={`/store/${this.props.match.params.parentStoreKey}`}>Back</Link></div>
            </div>
        )
    }
}

export default UpdateSubStoreData
