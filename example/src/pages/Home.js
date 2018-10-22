import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Header from '../components/Header';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/app.css';

import {
    Clearfix,
    Col,
    Grid,
    Jumbotron,
    Nav,
    NavItem,
    Panel,
    Row
} from 'react-bootstrap';

export default class extends Component {
    render() {
        return (
            <div>
                <Helmet title="React Image Magnify" />
                <Header {...this.props} />
                <Jumbotron className="jumbotron--home">
                    <Grid>
                        <h2>Demo</h2>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col xs={12} sm={6} md={5} lg={4}>
                            <Panel header="Examples" bsStyle="primary" className="panel">
                                <Nav bsStyle="pills" stacked>
                                    <NavItem href="#/basic">Basic Example</NavItem>
                                    <NavItem href="#/hint">Interaction Hint</NavItem>
                                    <NavItem href="#/responsive-images">Responsive Images</NavItem>
                                    <NavItem href="#/dimensions">Enlarged Image Container Dimensions</NavItem>
                                    <NavItem href="#/react-slick">Carousel Integration</NavItem>
                                    <NavItem href="#/external">External Enlarged Image</NavItem>
                                    <NavItem href="#/lens">Alternate Lens</NavItem>
                                </Nav>
                            </Panel>
                        </Col>
                        <Clearfix visibleSmBlock />
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <Panel header="Live Edit" bsStyle="primary" className="panel">
                                <Nav bsStyle="pills" stacked>
                                    <NavItem href="https://codepen.io/ethanselzer/full/oePMNY/">
                                        CodePen
                                    </NavItem>
                                </Nav>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
