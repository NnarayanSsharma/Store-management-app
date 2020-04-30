import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import FormStore from './FormStore'
import UpdateStoreData from './UpdateStoreData'

export class EditStoreData extends Component {
    constructor(props) {
        super(props)
        let data = this.props.userArray
        this.state = {
            data: data,
            key: '',
            name: '',
            email: '',
            number: '',
            address: '',
        }
    }
    
    render() {
        const style = {
            border: "solid 2px #5a5858",
            margin: "10px auto",
            padding: "10px"
        }
        return (
            <div style={style}>
                {this.state.data?(
                    <div>
                        <p>key: {this.props.userArray.key?this.props.userArray.key:null}</p>
                        <p>Name: {this.props.userArray.name?this.props.userArray.name:null}</p>
                        <p>Email: {this.props.userArray.email?this.props.userArray.email:null}</p>
                        <div className="button-link">
                            <Link><button onClick={()=> this.props.handleDelete(this.props.userArray.key)}>Delete</button></Link>
                        
                            <Link to={`/updateStoreData/${this.props.userArray.key}`}><button>Edit Store</button></Link>
                            <Link to={`/store/${this.props.userArray.key}`}><button>Show Store</button></Link>
                        </div>
                    </div>
                ):null}
            </div>
        )
    }
}

export default EditStoreData
