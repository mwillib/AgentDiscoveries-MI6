import * as React from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import {apiPost} from './utilities/request-helper';
import Timezones from './timezones';
import $ from 'jquery';

export default class TodaysCodePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            result: '',
            showMessage: true,
            hideButton: false
        };

        this.onChange = this.onChange.bind(this);
        this.handleDecode = this.handleDecode.bind(this);
        this.handleEncode = this.handleEncode.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.slideDown = this.slideDown.bind(this);
    }

    render() {
    console.log(this.state.showMessage);
        return (
            <React.Fragment>

                <Timezones />
                <div className='box'></div>
                <div className='col-md-8 col-md-offset-2 text-center'>

                    {this.state.hideButton ? null : <Button className="message-btn" onClick={this.slideDown}>Encode Message</Button>}

                        {this.state.showMessage ? <Form className="encode-form">
                            <h3>Encode/decode message with today's secret</h3>
                            <FormGroup>
                                <FormControl type='text' required
                                    id='message-input'
                                    componentClass='textarea' rows={6}
                                    placeholder='Enter message'
                                    value={this.state.message}
                                    onChange={this.onChange}/>
                            </FormGroup>
                            <Button id="encode-button" className='rm-3' type='submit' onClick={this.handleEncode}>Encode</Button>
                            <Button id="decode-button" type='submit' onClick={this.handleDecode}>Decode</Button>
                        </Form> : null}
                    <div id='code-result'>
                        {this.state.result ? <h3>Result</h3> : ''}
                        {this.state.result}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    slideDown(event) {
        this.setState({hideButton: true});
        this.setState({showMessage: true});
        $('.encode-form').animate({height: '35vh'}, 'slow');
        $('h3').addClass('animation');
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
