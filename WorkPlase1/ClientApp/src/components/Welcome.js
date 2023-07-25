import React, { Component } from 'react';

export class Welcome extends Component {
    static displayName = Welcome.name;

    constructor(props) {
        super(props);
        this.state = {};
    }

  render() {
    return (
      <div>
            <h1>Hello,{this.props.name},<br />
             Welcime to the WorkPlase!</h1>
      </div>
    );
  }
}
