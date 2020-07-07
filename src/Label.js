import React, { Component } from 'react';
import styles from './Label.module.css';

class Label extends Component {
  render() {
      return <p className={styles.strong}>{this.props.text}</p>;
  }
}

export default Label;
