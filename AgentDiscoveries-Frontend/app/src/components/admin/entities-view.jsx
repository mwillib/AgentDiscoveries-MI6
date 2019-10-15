import * as React from 'react';
import Entity from './entity';
import {Table} from 'react-bootstrap';

export default class Entities extends React.Component {

    render() {

        if (this.props.entities.length > 0) {
            return (
                <Table key={this.props.api + '-table'}>
                    {this.renderTableHeader()}
                    {this.renderTableBody()}
                </Table>
            );
        }
        return null;
    }

    renderTableHeader() {
        const entityArr = this.getHeaders();
        return (
            <thead>
                <tr>
                    {entityArr.map((key) => {
                        return <th key={key}>{key}</th>;
                    })}
                </tr>
            </thead>
        );
    }

    renderTableBody() {
        return (
            <tbody>
                {this.props.entities.map(entity => {
                    // Assume the first property is the ID, or at least unique enough to use as a key.
                    const id = Object.values(entity)[0];
                    return <Entity key={id} entity={entity} type={this.props.api} headers={this.getHeaders()} />;
                })}
            </tbody>
        );
    }

    getHeaders() {
        const entitySet = new Set();
        this.props.entities.forEach( (entity) => {
            Object.keys(entity).forEach(key => entitySet.add(key));
        } );
        return [...entitySet];
    }
}
