import * as React from 'react';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {clearUserInfo, isAdmin, isAgent, isLoggedIn} from './utilities/user-helper';
import logo from '../../static/agent.png';

export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: isLoggedIn(),
            isAdmin: isAdmin(),
            isAgent: isAgent()
        };

        this.onLoginEvent = this.onLoginEvent.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    componentDidMount() {
        window.addEventListener('login', this.onLoginEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('login', this.onLoginEvent);
    }

    onLoginEvent() {
        this.setState({
            isLoggedIn: isLoggedIn(),
            isAdmin: isAdmin(),
            isAgent: isAgent()
        });
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>
                            <span>
                                <img className='agent-discoveries-logo'
                                    src={logo}
                                    alt='Agent Discoveries'/>
                            </span>
                            <span>AGENT DISCOVERIES</span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                {this.state.isLoggedIn ? this.renderLoggedIn() : this.renderLoggedOut() }
            </Navbar>
        );
    }

    renderLoggedIn() {
        return (
            <Navbar.Collapse>
                {this.state.isAdmin ? this.renderAdminOptions() : null}
                <Nav>
                    {this.state.isAgent ? this.renderAgentOptions() : null}
                    <NavItem componentClass={Link} href='/message' to='/message' eventKey={5}>
                        Today's Message
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem componentClass={Link} href='/profile' to='/profile' eventKey={6}>
                        Profile
                    </NavItem>
                    <NavItem id="logout-link" onClick={this.handleLogOut} href='/login' to='/login' eventKey={1}>
                        Log Out
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        );
    }

    renderAdminOptions() {
        return (
            <Nav>
                <NavDropdown eventKey={2} title='Admin' id='basic-nav-dropdown'>
                    <MenuItem componentClass={Link} href='/admin/locations' to='/admin/locations' eventKey={2.1}>
                        Locations
                    </MenuItem>
                    <MenuItem componentClass={Link} href='/admin/regions' to='/admin/regions' eventKey={2.2}>
                        Regions
                    </MenuItem>
                    <MenuItem componentClass={Link} href='/admin/users' to='/admin/users' eventKey={2.3}>
                        Users
                    </MenuItem>
                    <MenuItem componentClass={Link} href='/admin/decode' to='/admin/decode' eventKey={2.4}>
                        Decode
                    </MenuItem>
                </NavDropdown>
                <NavDropdown eventKey={3} title='Search' id='basic-nav-dropdown'>
                    <MenuItem componentClass={Link} href='/search/location' to='/search/location' eventKey={3.1}>
                        Location Reports
                    </MenuItem>
                    <MenuItem componentClass={Link} href='/search/region' to='/search/region' eventKey={3.2}>
                        Region Summaries
                    </MenuItem>
                </NavDropdown>
            </Nav>
        );
    }

    renderAgentOptions() {
        return (
            <NavDropdown eventKey={4} title='Submit' id='basic-nav-dropdown'>
                <MenuItem componentClass={Link} href='/submit/location' to='/submit/location' eventKey={4.1}>
                    Location Report
                </MenuItem>
                <MenuItem componentClass={Link} href='/submit/region' to='/submit/region' eventKey={4.2}>
                    Region Summary
                </MenuItem>
            </NavDropdown>
        );
    }

    renderLoggedOut() {
        return (
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem componentClass={Link} href='/login' to='/login' eventKey={1}>
                        Login
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        );
    }

    handleLogOut(event) {
        event.preventDefault();

        clearUserInfo();
        window.location.hash = '#/';
    }
}
