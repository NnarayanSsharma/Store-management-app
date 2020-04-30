import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class ShowStore extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            isDelete: false
        }
    }

    deleteHandler = (key, parentKey) =>{
        this.setState(preState=>{
            return {isDelete: !preState.isDelete}
        })
        const users = localStorage.getItem("users");
        let userArray = [];
        if(users){
            userArray = JSON.parse(users);
        }
        userArray.forEach(item=>{
            for(let i = 0; i < item.subStore.length; i++){
                if(item.subStore[i].key === key){
                    item.subStore.splice(i,1)
                }

            }
        })
        localStorage.clear()
        localStorage.setItem("users", JSON.stringify(userArray))

    }
    
    render() {
        const users = localStorage.getItem("users");
        let userArray = [];
        if(users){
            userArray = JSON.parse(users);
        }
        let data = userArray.filter(item=> item.key === this.props.match.params.key)
        
        const style = {
            border: "solid 2px #5a5858",
            margin: "10px auto",
            padding: "10px"
        }
        return (
            <div className="show-store-details">
                <h1>Store Details</h1>
                <p>Name: {data[0].name}</p>
                <p>Email: {data[0].email}</p>
                <p>Number: {data[0].number}</p>
                <p>Address: {data[0].address}</p>
                <p>Substore: {data[0].subStore.length}</p>
                <div className="create-subStore-link"><Link to={`/store/${data[0].key}/formSubStore`} >Create Substore</Link></div>
                <h1>Substore Details</h1>
                <div className="box">
                {
                    data[0].subStore?
                    data[0].subStore.map((user, i)=>{
                        return (
                            <div style={style}>
                                <h3>{user.name}</h3>
                                <h4>{user.email}</h4>
                                <h4>{user.number}</h4>
                                <h4>{user.address}</h4>
                                <div className="subStore-button-link">
                                    <Link><button onClick = {()=> this.deleteHandler(user.key, user.storeKey)}>Delete Substore</button></Link>
                                    
                                    <Link to={`/store/${user.storeKey}/formSubStore/${user.key}`}>
                                        <button>Edit SubStore</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    }): null
                }
                </div>
            </div>
        )
    }
}

export default ShowStore
