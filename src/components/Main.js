import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Store from './Store'
import UpdateStoreData from './UpdateStoreData'
import ShowStore from './ShowStore'
import FormSubStore from './FormSubStore'
import UpdateSubStoreData from './UpdateSubStoreData'

function Main() {
    return (
        <div className="main">
            <main>
                <Switch>
                    <Route exact path='/store' component={Store}/>
                    <Route exact path='/updateStoreData/:key' component={UpdateStoreData} />
                    <Route exact path='/store/:key' component={ShowStore} />
                    <Route exact path='/store/:key/formSubStore' component={FormSubStore} />
                    <Route exact path='/store/:parentStoreKey/formSubStore/:subStoreKey' component={UpdateSubStoreData} />
                </Switch>
            </main>
        </div>
    )
}

export default Main
