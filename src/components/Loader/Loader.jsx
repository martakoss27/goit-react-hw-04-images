import React, { Component } from 'react';
import { ProgressBar } from 'react-loader-spinner';

class Loader extends Component {
  render() {
    return (
      <div>
        <ProgressBar
          height="100"
          width="200"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#bf4f74"
          barColor="grey"
        />
      </div>
    );
  }
}

export default Loader;
