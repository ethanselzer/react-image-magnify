import React, { Component } from 'react';
import {
  Col,
  Grid,
  Jumbotron,
  Row
} from 'react-bootstrap';
import Helmet from 'react-helmet';

import Header from '../components/Header';
import Basic from '../components/Basic';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/app.css';

export default class extends Component {
    render() {
        return (
            <div>
                <Helmet title="React Image Magnify" />
                <Header {...this.props}/>
                <Jumbotron>
                    <Grid>
                        <Row>
                            <Col sm={12}>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col sm={12}>
                            <Basic />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
