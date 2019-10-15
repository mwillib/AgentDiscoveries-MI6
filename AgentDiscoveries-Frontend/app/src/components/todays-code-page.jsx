import * as React from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import {apiPost} from './utilities/request-helper';
import {SlideDown} from 'react-slidedown';
import moment from 'moment-timezone';
import 'moment-timezone';

export default class TodaysCodePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            result: '',
            showMessage: false,
            buttonHidden: false
        };

        this.onChange = this.onChange.bind(this);
        this.handleDecode = this.handleDecode.bind(this);
        this.handleEncode = this.handleEncode.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.slideDown = this.slideDown.bind(this);

    }

    render() {
        var london = moment.tz('Europe/London');
        var losAngeles = london.clone().tz('America/Los_Angeles');
        var newYork = london.clone().tz('America/New_York');
        var tokyo = london.clone().tz('Asia/Tokyo');
        var moscow = london.clone().tz('Europe/Moscow');

        return (
            <div className='container'>

                <div className='text-center'>
                    <h1 className='title'>AGENT <span>DISCOVERIES</span></h1>
                </div>

                <div className='row'>
                    <div className='col-sm-2 col-sm-offset-1 text-center timezone'>
                        <h2><span>NEW YORK</span><br/>{newYork.format('H:mm')}</h2>
                    </div>
                    <div className='col-sm-2 text-center timezone'>
                        <h2><span>LONDON</span><br/>{london.format('H:mm')}</h2>
                    </div>
                    <div className='col-sm-2 text-center timezone'>
                        <h2><span>LOS ANGELES</span><br/>{losAngeles.format('H:mm')}</h2>
                    </div>
                    <div className='col-sm-2 text-center timezone'>
                        <h2><span>TOKYO</span><br/>{tokyo.format('H:mm')}</h2>
                    </div>
                    <div className='col-sm-2 text-center timezone'>
                        <h2><span>MOSCOW</span><br/>{moscow.format('H:mm')}</h2>
                    </div>
                </div>

                <div className='col-md-8 col-md-offset-2 text-center'>
                    {this.state.buttonHidden ? null :
                        <Button className="message-btn" onClick={this.slideDown} id="encode-button-show">Encode Message</Button>}

                    <Button className='message-btn' onClick={this.slideDown}>Encode Message</Button>

                    <SlideDown className={'my-dropdown-slidedown'}>
                        {this.state.showMessage ?
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

                                <Button id='encode-button' className='rm-3' type='submit' onClick={this.handleEncode}>Encode</Button>
                                <Button id='decode-button' type='submit' onClick={this.handleDecode}>Decode</Button>
                            </Form> : null}
                    </SlideDown>


                    <div id='code-result'>
                        {this.state.result ? <h3>Result</h3> : ''}
                        {this.state.result}
                    </div>
                </div>
            </div>

        );
    }

    slideDown(event) {
        this.setState({showMessage: true});
        this.setState({buttonHidden: true});
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
