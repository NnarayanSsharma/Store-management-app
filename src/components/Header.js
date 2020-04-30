import React, { Component } from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import Home from './Home'

class Header extends Component {
    
    render() {
        const style = {
            color: "#faf7f7"
        }
        return (
            <div>
                <header>
                    <nav>
                        <div className="nav-bar" style={style}><Link to="/">Home</Link></div>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                        </Switch>
                    </nav>
                </header>
            </div>
        )
    }
}

export default Header
