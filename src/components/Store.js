import React, { Component } from 'react'
import {Route, Switch } from 'react-router-dom'
import FormStore from './FormStore'

class Store extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            dataArray: [this.props.userArray]
        }
    }
    
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/store' component={FormStore}/>
                </Switch> 
            </div>
        )
    }
}

export default Store
