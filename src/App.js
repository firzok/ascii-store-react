import React from "react";
import "./App.css";

import Root from "./Components/Root";
import Container from "./Views/Container/Container";

export default class App extends React.PureComponent {
  render() {
    return (
      <Root>
        <Container />
      </Root>
    );
  }
}
