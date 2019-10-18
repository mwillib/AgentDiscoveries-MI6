import * as React from 'react';
import {Button, ButtonGroup, Form, FormControl, FormGroup} from 'react-bootstrap';
import {apiPut} from '../utilities/request-helper';
import {currentUserId} from '../utilities/user-helper';
import Message from '../message';

export default class EditProfileUsernamePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            message: {}

        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        if (this.props.id) {
            this.loadUser(this.props.id);
        }
    }

    render () {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <Form onSubmit={this.handleSubmit}>

                    <h3>Change Username & Password</h3>

                    <Message message={this.state.message}/>

                    <FormGroup>
                        <FormControl type='text'
                            placeholder='Enter your new username'
                            value={this.state.username}
                            onChange={this.onUsernameChange}/>
                    </FormGroup>
                    <Message message={this.state.message}/>

                    <FormGroup>
                        <FormControl type='password'
                            placeholder={'Enter new password' + (this.props.id ? ' (leave blank if unchanged)' : '')}
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                            id="password"/>
                    </FormGroup>
                    <ButtonGroup>
                        <Button type='submit'>Submit</Button>
                    </ButtonGroup>
                </Form>

            </div>
        );
    }

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    onPasswordChange(event){
        this.setState({ password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        const params = {
            username: this.state.username,
            password: this.state.password,
        };

        apiPut('credentials', params, currentUserId())
            .then(() => { window.location.hash = '/profile';})
            .catch(() => this.setState({ message: { message: 'Could not update username or password, please try again later', type: 'danger'} }));

    }
}