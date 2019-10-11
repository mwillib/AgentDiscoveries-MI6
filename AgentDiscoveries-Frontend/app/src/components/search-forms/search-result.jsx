import * as React from 'react';
import {Panel} from 'react-bootstrap';
import moment from 'moment-timezone';
import jsPDF from 'jspdf';

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props);

        this.jsPdfGenerator = this.jsPdfGenerator.bind(this);
    }

    render() {
        return (
            <div className='results'>
                {this.getResultsHeader(this.props.results)}
                {this.renderResults(this.props.results)}
            </div>
        );
    }

    renderResults(results) {
    console.log(this.props.results);
        return results.map((result, index) => {
            return (
                <Panel key={index}>
                    <Panel.Heading>Result<button onClick={this.jsPdfGenerator}>Download PDF</button></Panel.Heading>
                    <Panel.Body>{this.renderResultBody(result)}</Panel.Body>
                </Panel>
            );
        });
    }

    renderResultBody(result) {
        return Object.keys(result).map(key => {

            const value = result[key];
            let display = key + ': ' + value;

            if(this.isIsoDate(value)){
                display = key + ": " + this.formatDate(value);
            }

            return <p key={key} id={key}>{display}</p>;
        });
    }

    isIsoDate(value){
        return moment(value, moment.ISO_8601, true).isValid();
    }

    formatDate(value){
        return moment(value).format('YYYY-MM-DD HH:mm:ss') + ' (' + moment.tz.guess() + ')';
    }

    getResultsHeader(results) {
        return results.length > 0
            ? (results.length === 1
                ? <h3>{`${results.length} result`}</h3>
                : <h3>{`${results.length} results`}</h3>)
            : '';
    }

    jsPdfGenerator() {
        const doc = new jsPDF('p', 'pt', 'a4');
        var header = [1,2,3,4];
        doc.text(20, 20, "HELLO");
        doc.save('generated.pdf');
    }

}
