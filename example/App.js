import React, { Component } from 'react'
import { Button } from '../dist/index';
import '../dist/index.css';
import './App.less'

class App extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="App">
                <Button></Button>   
            </div>
        )
    }
}

export default App