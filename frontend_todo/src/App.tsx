import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Signup } from "./routes/Signup";
import {Signin} from "./routes/Signin";
import {Dashboard} from "./routes/Dashboard";
function App() {

  return (
        <div className="w-screen h-screen">
            <BrowserRouter>
              {localStorage.getItem('token') ? (
                <Routes>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="*" element={<Dashboard/>}/>
                </Routes>
              ) : (
                <Routes>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="/signin" element={<Signin/>}/>
                  <Route path="*" element={<Signin/>}/>
                </Routes>
              )} 
            </BrowserRouter>
        </div>
  )
}

export default App