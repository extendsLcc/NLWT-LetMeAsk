import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { NewRom } from "./pages/NewRom/NewRom";

import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
