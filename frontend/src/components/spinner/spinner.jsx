import React from 'react';
import styles from './spinner.module.css';

const Spinner = (props) => {
            
    return (
        <div className={styles.loading}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Spinner;