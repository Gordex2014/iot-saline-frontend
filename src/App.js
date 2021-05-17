import "./scss/style.scss";

import { AppRouter } from "./routers/AppRouter";
import { Component } from "react";

class App extends Component {
  render() {
    return <AppRouter />;
  }
}

export default App;
