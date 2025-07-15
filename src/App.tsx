import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import { Analytics } from "@vercel/analytics/react"
import Dash from "./pages/dash";
import Scoreboard from "./pages/scoreboard"

function App() {
  const [pageStatus, setPageStatus] = useState({
    scoreboard:false
  })

  const getPageData = async () => {
    const response = await fetch('/api/status.js', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });
    
      if (!response.ok) {
          throw new Error('Failed to increment visits');
      }
      const data = await response.json();
      await setPageStatus(data) 
      // window.dispatchEvent(new Event('resize'));
      console.log(data)

  }

  useEffect(()=>{
    getPageData()
    console.log(pageStatus)
  },[])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dash/>}/>
          <Route path="/scoreboard/*" element={<Scoreboard pageStatus={pageStatus}/>}/>
          <Route path='/*' element={<h1>404 - Page Not Found</h1>}/>
        </Routes>
      </Router>
      <Analytics/>
    </>
  );
}

export default App;