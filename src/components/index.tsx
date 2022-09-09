import "./index.css";
import { Component } from "react";

type HeaderState = { time: number };
type HeaderProps = {};

class Header extends Component<HeaderProps, HeaderState> {
  state: HeaderState = { time: 59 };

  render() {
    return <h1>Hello</h1>;
  }
}

export default Header;
