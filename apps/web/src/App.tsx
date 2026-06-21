import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Layout from "./pages/layout";
import { Analytics } from "@vercel/analytics/react";
import EmailLanding from "./pages/emailLanding.tsx";
import Dashboard from "./pages/dashboard.tsx";

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/emailLanding" element={<EmailLanding/>}/>
          <Route path="/*" element={<Layout/>}/>
        </Routes>
      </Router>
      <Analytics/>
    </>
  );
}

export default App;
