import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';

export default class Issue22 extends Component {
    render() {
        return (
            <div className="fluid">
                <div className="fluid__image-container">
                    <Link
                        to="/"
                        style={{
                            width: '100%',
                            display: 'block',
                            border: 'solid 1px gray',
                            textAlign: 'center',
                            lineHeight: '200px'
                        }}
                    >
                        Go
                    </Link>
                </div>
            </div>
        );
    }
}
