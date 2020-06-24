import React, { Component } from 'react'
import Com from '../src/index'
import './App.scss'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: 666
        }
    }
    render() {
        return (
            <div className="App">
                <Com/>        
            </div>
        )
    }
}

export default App