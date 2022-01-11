import React, { Component } from 'react';
import "./style.css"
class Messagge extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.props.cp === 1 || this.props.cp === 2) {
        return (
            <h2 className="game--status">Player {this.props.cp}'s turn</h2>
        );
    }
    else {
        return (
            <h2 className="game--status"> {this.props.cp}</h2>
        );
    }
}
}

export default Messagge;