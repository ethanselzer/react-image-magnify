import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactImageMagnify from '../../dist/ReactImageMagnify';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ReactImageMagnify {...{
          largeImage: {
            alt: 'hello large image',
            // src: 'https://www.hautelookcdn.com/products/KS8K955S/large/5793611.jpg',
            src: 'https://lh3.googleusercontent.com/4GKGDT2GbB4xBwTSSaKBkHUvoMZEC5OktUDfHz0IOWSwDLk9v4ifq8j5uuhtsSb21xi17HQGItOlIRQP_qayDiBK2i35W-TrVWbYe7T0a-QrYxtdUcK68IYJHO59jzXH6IJLHELxgVAEOlSGwUFa3sJKW_PQi1ds7jwSDxtCHhjZz5dDrhRymRjPPQXJ8iwNoy2lI08cbrKlRF6YZ4-LV2ZuqE20oYUK1rYQ__lLvWI3oU2mOR-9owes-dJHM-RJ1hMNIVKT-2MxAQNRqRLso8-QbPW0Lvz7tvaixhQBbPOTPEIqz_Dg2XpeOUGm_C-quxmeVYObBDabbnDsa-JJHVFh5OQgtliNCLn3hkIA3RxO4JMEtYdR5ZPZsMuAn1vee3s8mLKnU9AeHnCEvZoM13sgg7QrUH6y4bTC9bSvuszJYJ1ij4_c3IroUFkJliVZsjbH6Jxa01TxGSrhmTE6V8AtAo06YwWPWqUxhBcgV5p-rOPr_8OJPIjJqaNQmBD76YI3KhllssT4rK71fxYYudu2o_coIbKdhIaU5iji58CzX-hAteB_kQU4iR0aMu5a0Po09kEaJdvoPytviv7lBV30FKoreW-MaxVfK1OWdWFOJFYP=w2758-h1554-no',
            width: 1200,
            height: 672
          },
          smallImage: {
            alt: 'hello small image',
            //src: 'https://www.hautelookcdn.com/products/KS8K955S/large/5793611.jpg?interpolation=lanczos-none&downsize=434:650&output-quality=90&output-format=jpeg',
            src: 'https://lh3.googleusercontent.com/4GKGDT2GbB4xBwTSSaKBkHUvoMZEC5OktUDfHz0IOWSwDLk9v4ifq8j5uuhtsSb21xi17HQGItOlIRQP_qayDiBK2i35W-TrVWbYe7T0a-QrYxtdUcK68IYJHO59jzXH6IJLHELxgVAEOlSGwUFa3sJKW_PQi1ds7jwSDxtCHhjZz5dDrhRymRjPPQXJ8iwNoy2lI08cbrKlRF6YZ4-LV2ZuqE20oYUK1rYQ__lLvWI3oU2mOR-9owes-dJHM-RJ1hMNIVKT-2MxAQNRqRLso8-QbPW0Lvz7tvaixhQBbPOTPEIqz_Dg2XpeOUGm_C-quxmeVYObBDabbnDsa-JJHVFh5OQgtliNCLn3hkIA3RxO4JMEtYdR5ZPZsMuAn1vee3s8mLKnU9AeHnCEvZoM13sgg7QrUH6y4bTC9bSvuszJYJ1ij4_c3IroUFkJliVZsjbH6Jxa01TxGSrhmTE6V8AtAo06YwWPWqUxhBcgV5p-rOPr_8OJPIjJqaNQmBD76YI3KhllssT4rK71fxYYudu2o_coIbKdhIaU5iji58CzX-hAteB_kQU4iR0aMu5a0Po09kEaJdvoPytviv7lBV30FKoreW-MaxVfK1OWdWFOJFYP=w2758-h1554-no',
            width: 300,
            height: 168
          }
        }}/>
      </div>
    );
  }
}

export default App;
