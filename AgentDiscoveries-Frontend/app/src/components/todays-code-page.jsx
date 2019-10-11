import * as React from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import {apiPost} from './utilities/request-helper';

export default class TodaysCodePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            result: ''
        };

        this.onChange = this.onChange.bind(this);
        this.handleDecode = this.handleDecode.bind(this);
        this.handleEncode = this.handleEncode.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
    }

    render() {
        return (
            <div className="container">

                <div className="text-center">
                    <h1 className="title">AGENT <span>DISCOVERIES</span></h1>
                </div>

                <div className="row">
                    <div className="col-sm-2 col-sm-offset-1 text-center timezone">
                        <h2><span>NEW YORK</span><br/>18:00</h2>
                    </div>
                    <div className="col-sm-2 text-center timezone">
                        <h2><span>LONDON</span><br/>18:00</h2>
                    </div>
                    <div className="col-sm-2 text-center timezone">
                        <h2><span>LOS ANGELES</span><br/>18:00</h2>
                    </div>
                    <div className="col-sm-2 text-center timezone">
                        <h2><span>TOKYO</span><br/>18:00</h2>
                    </div>
                    <div className="col-sm-2 text-center timezone">
                        <h2><span>MOSCOW</span><br/>18:00</h2>
                    </div>
                </div>

                <div className='col-md-8 col-md-offset-2 text-center'>
                    <Button className="message-btn">Encode Message</Button>
                    <Form>
                        <h3>Encode/decode message with today's secret</h3>

                        <FormGroup>
                            <ControlLabel>Message</ControlLabel>
                            <FormControl type='text' required
                                id='message-input'
                                componentClass='textarea' rows={6}
                                placeholder='Enter message'
                                value={this.state.message}
                                onChange={this.onChange}/>
                        </FormGroup>

                        <Button id="encode-button" className='rm-3' type='submit' onClick={this.handleEncode}>Encode</Button>
                        <Button id="decode-button" type='submit' onClick={this.handleDecode}>Decode</Button>
                    </Form>


                    <div id="code-result">
                        {this.state.result ? <h3>Result</h3> : ''}
                        {this.state.result}
                    </div>
                </div>
            </div>

        );
    }

    onChange(event) {
        this.setState({ message: event.target.value });
    }

    handleEncode(event) {
        event.preventDefault();
        this.handleRequest('encodemessage');
    }

    handleDecode(event) {
        event.preventDefault();
        this.handleRequest('decodemessage');
    }

    handleRequest(api) {
        const body = { message: this.state.message };

        apiPost(api, body)
            .then(response => this.setState({ result: response.message }))
            .catch(error => this.setState({ result: error.message }));
    }
}
