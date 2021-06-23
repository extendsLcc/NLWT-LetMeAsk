import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { NewRom } from "./pages/NewRom/NewRom";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/rooms/new" component={NewRom} />
    </BrowserRouter>
  );
}

export default App;
