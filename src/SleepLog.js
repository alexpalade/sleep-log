import React, { Component } from 'react';
import moment from 'moment';
// import styles from './SleepLog.module.css';

class SleepLog extends Component {
  render() {

    let lis = this.props.items.map(
        (item, index) => {
          return (
            <li key={index}>({item.value}) {moment(item.date).format('DD ddd HH:mm')}</li>
          );
        });

    return (
      <ul>
        { lis }
      </ul>
    );
  }
}

export default SleepLog;
