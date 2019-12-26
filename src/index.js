/* eslint-disable react/prefer-stateless-function */
import "./style";

import { Component, render } from "preact";
import VideoChatDemo from "./video-transfer/demo-components/VideoChatDemo";
export default class App extends Component {
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <VideoChatDemo />
      </div>
    );
  }
}

render(<VideoChatDemo />, document.getElementById("root"));
