import React, { Component } from 'react'
import './normalize.css'
import './index.scss'


class Com extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: 666
        }
    }

    render() {
        return (
            <div className="component">
                {this.state.data}
            </div>
        )
    }
}
export default Com