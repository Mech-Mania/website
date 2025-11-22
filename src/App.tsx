import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Layout from "./pages/layout";
import { Analytics } from "@vercel/analytics/react"

function App() {
  




  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<Layout/>}/>
        </Routes>
      </Router>
      <Analytics/>
    </>
  );
}

export default App;