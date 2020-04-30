import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import EditStoreData from './EditStoreData';

class Home extends Component {
    constructor(props) {
        super(props)
        const users = localStorage.getItem("users");
        let userArray = [];
        if(users){
            userArray = JSON.parse(users);
        }
        this.state = {
            userArray: userArray
        }
    }
    
    handleDelete = (key) => {
        localStorage.clear()
        this.setState((pervData)=>{
            const upDatedData = pervData.userArray.filter(item=>
                item.key != key
            )
            
            return {
                userArray: upDatedData
            }
        }, ()=>{
            localStorage.setItem("users", JSON.stringify(this.state.userArray));
        })
    }

    render(){
        
        return (
            <div className="home">
                <h1>Welcome to Stores catalog and orders management App</h1>
                <div className="create-store-link"><Link to="/store">Create Store</Link></div>
                <div className="box">
                {
                    this.state.userArray.length?
                    this.state.userArray.map((user, i)=>{
                        return (
                            <div>
                                <EditStoreData userArray={this.state.userArray[i]} handleDelete={this.handleDelete}/>
                            </div>
                        )
                    }): null
                }
                </div>
                 
            </div>
        )
    }
}

export default Home
