import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import { Analytics } from "@vercel/analytics/react"

function App() {
  




  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<Home/>}/>
        </Routes>
      </Router>
      <Analytics/>
    </>
  );
}

export default App;