import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SubStore extends Component {
    state={
        key: '',
        name: '',
        email: '',
        number: '',
        address: '',
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
    }
    render() {
        return (
            <div>
                <h1>SubStore</h1>
                <h3>Fill SubStore Data</h3>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>Name</label>
                        <input 
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        /><br />

                        <label>Email</label>
                        <input 
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange} 
                        /><br />
                        
                        <label>Contact Number</label>
                        <input 
                            type="number"
                            name="number"
                            value={this.state.number}
                            onChange={this.handleChange} 
                        /><br />
                        
                        <label>Address</label>
                        <input 
                            type="text"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChange}
                        /><br />

                        <button>Add Successfully</button>
                    </form>
                    <Link to="/store">Back</Link>
                </div>
            </div>
        )
    }
}

export default SubStore
