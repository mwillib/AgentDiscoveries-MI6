import React from 'react';
import {Button} from 'react-bootstrap';
import Link from 'react-router-dom/Link';

export default class Entity extends React.Component {
    constructor (props) {
        super(props);

        // Assume that the first JSON property is the ID property
        this.id = Object.values(props.entity)[0];
    }

    render() {
        return (
            <tr key={this.id}>
                {this.getEntityRow()}
                <td key='edit'>
                    {this.getEditButton()}
                </td>
            </tr>
        );
    }

    getEntityRow() {
        const headers = this.props.headers;
        return headers.map((header) => {
            if(this.props.entity[header] === undefined) this.props.entity[header] = 'N/A';
            return <td key={header}>{this.props.entity[header].toString()}</td>;
        });
    }

    getEditButton() {
        return (
            <Link to={`/admin/${this.props.type}/edit/${this.id}`}>
                <Button type='button'>Edit</Button>
            </Link>
        );
    }
}
