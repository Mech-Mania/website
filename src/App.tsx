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
          <Route path='/*' element={<h1>404 - Page Not Found</h1>}/>
        </Routes>
      </Router>
      <Analytics/>
    </>
  );
}

export default App;