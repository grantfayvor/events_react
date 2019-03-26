import React from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import './spinner.css';

export default props => (
    <ProgressBar type="circular" className="spinner" mode="indeterminate" />
);