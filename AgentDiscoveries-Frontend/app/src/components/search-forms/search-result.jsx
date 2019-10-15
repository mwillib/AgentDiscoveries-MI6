import * as React from 'react';
import {Panel} from 'react-bootstrap';
import moment from 'moment-timezone';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
        return results.map((result, index) => {
            return (
                <Panel key={index}>
                    <Panel.Heading>Result</Panel.Heading>
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
                display = key + ': ' + this.formatDate(value);
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
                ? <div className="result-heading"><h3>{`${results.length} result`}</h3><button className='btn' onClick={this.jsPdfGenerator}>Download PDF</button></div>
                : <div className="result-heading"><h3>{`${results.length} results`}</h3><button className='btn' onClick={this.jsPdfGenerator}>Download PDF</button></div>)
            : '';
    }

    jsPdfGenerator() {
       const doc = new jsPDF();
       const col = Object.keys(this.props.results[0]);
       const rows = [];
       for( let i = 0; i < this.props.results.length; i++ ) {
            let row = [];
            rows.push(Object.values(this.props.results[i]));
       }
       doc.autoTable(col, rows, { startY: 10 });
       const date = new Date();
       let result = date.getHours() < 12 ? 'Reports - ' + date.getHours() + "." + date.getMinutes() + "am.pdf"
                  : 'Reports - ' + date.getHours() + "." + date.getMinutes() + "pm.pdf";
       doc.save(result);
    }

}
