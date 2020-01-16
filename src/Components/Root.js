import React from "react";

/**
 * This is a top level component which wraps and renders the Notification and the Spinner component
 * around the top level parent container view
 */
export default class Root extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}
