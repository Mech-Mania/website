import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import { Analytics } from "@vercel/analytics/react"

function App() {
  
  const [pageStatus, setPageStatus] = useState({
    scoreboard:false
  })

  const getPageData = async () => {
    const response = await fetch(`${__SiteBase__}/status`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'credentials': "include"
          },
      });
    
      if (!response.ok) {
          throw new Error('Failed to get pageData');
      }
      const data = await response.json();
      await setPageStatus(data) 

  }

  useEffect(()=>{
    getPageData()
    const intervalId = setInterval(getPageData,8000)
    return () => {
        // Clear interval using intervalId
        // This function run when component unmount
    clearInterval(intervalId)
    }
  },[])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/*' element={<h1>404 - Page Not Found</h1>}/>
        </Routes>
      </Router>
      <Analytics/>
    </>
  );
}

export default App;