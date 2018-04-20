import React from 'react';
import { MenuItem, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

import npmLogo from '../images/header/npm-logo.png';
import githubLogo from '../images/header/github-logo.png';

import '../styles/header.css';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedNavKey: 0
        };
    }

    componentDidMount() {
        const path = this.props.route.path;

        this.setState({
            selectedNavKey: this.getNavKeyByRoutePath(path)
        })
    }

    getNavKeyByRoutePath(path) {
        switch (path) {
            case '/' :
                return 1;
            case '/basic' :
                return 2.1;
            case '/hint' :
                return 2.2;
            case '/responsive-images' :
                return 2.3;
            case '/dimensions' :
                return 2.4;
            case '/react-slick' :
                return 2.5;
            case '/external' :
                return 2.6;
            case '/lens' :
                return 2.7;
            case '/image-magnify' :
                return 3.1;
            case '/support' :
                return 4;
            default :
                return 1;
        }
    }

    render() {
        return (
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a className="logo" href="#/">
                            &lt;ReactImageMagnify /&gt;
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav {...{activeKey: this.state.selectedNavKey}}>
                        <NavItem eventKey={1} href="#/">Home</NavItem>
                        <NavDropdown eventKey={2} title="Examples" id="nav-dropdown">
                            <MenuItem eventKey={2.1} href="#/basic">Basic Example</MenuItem>
                            <MenuItem eventKey={2.2} href="#/hint">Interaction Hint</MenuItem>
                            <MenuItem eventKey={2.3} href="#/responsive-images">Responsive Images</MenuItem>
                            <MenuItem eventKey={2.4} href="#/dimensions">Enlarged Image Container Dimensions</MenuItem>
                            <MenuItem eventKey={2.5} href="#/react-slick">Carousel Integration</MenuItem>
                            <MenuItem eventKey={2.6} href="#/external">External Enlarged Image</MenuItem>
                            <MenuItem eventKey={2.7} href="#/lens">Alternate Lens</MenuItem>
                        </NavDropdown>
                        <NavItem href="https://github.com/ethanselzer/react-image-magnify#required-props">
                            Docs
                        </NavItem>
                        <NavItem eventKey={4} href="#/support">Support</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem
                            eventKey={1}
                            className="github-link"
                            href="https://github.com/ethanselzer/react-image-magnify"
                        >
                            <img src={githubLogo} alt="GitHub Logo" />
                        </NavItem>
                        <NavItem
                            eventKey={2}
                            href="https://www.npmjs.com/package/react-image-magnify"
                            className="npm-link"
                        >
                            <img src={npmLogo} alt="NPM Logo" />
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
