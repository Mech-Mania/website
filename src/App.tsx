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
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dash/>}/>
          <Route path="/scoreboard/*" element={<Scoreboard/>}/>
          <Route path='/*' element={<h1>404 - Page Not Found</h1>}/>
        </Routes>
      </Router>
      <Analytics/>
    </>
  );
}

export default App;