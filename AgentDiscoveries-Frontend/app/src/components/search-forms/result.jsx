import React from 'react';
import moment from 'moment-timezone';

export default class Result extends React.Component {
    constructor (props) {
        super(props);

        // The report ID is the ID property
        this.id = Object.values(props.entity)[1];
    }

    render() {
        return (

            <tr key={this.id}>
                {this.getResultRow()}
            </tr>
        );
    }

    isIsoDate(value){
        return moment(value, moment.ISO_8601, true).isValid();
    }

    formatDate(value){
        return moment(value).format('D/M/YY HH:mm');
    }

    getResultRow() {
        const headers = this.props.headers;
        return headers.map((header) => {
            if(this.props.entity[header] === undefined) this.props.entity[header] = 'N/A';
            if(this.isIsoDate(this.props.entity[header])) {
                return <td key={header}>{this.formatDate(this.props.entity[header])}</td>;
            } else {
                return <td key={header}>{this.props.entity[header].toString()}</td>;
            }
        });
    }

}

