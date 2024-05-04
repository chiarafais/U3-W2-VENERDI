import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Meteohomepage from "./components/Meteohomepage";
import Meteopage from "./components/Meteopage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Meteohomepage />} />
          <Route path="/Meteopage/:lon/:lat" element={<Meteopage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
