import React, { Component } from 'react';
import Cell from "../Cell"
class GridRow extends Component {
    render() {
        return (
            <div className="GridRow">{this.props.row.map((col,colIndex)=>(
                <Cell handleClick={this.props.handleClick} rowIndex={this.props.rowIndex} colIndex={colIndex} colText={col} />
            ))}
            </div>
        );
    }
}

export default GridRow;