import './Homepage.css'

import { useState } from "react" 
function Homepage() {
      const [message, setMessage] = useState("")
  async function callHelloApi() {
    try {
      console.log("callingapi")
      const response = await fetch("http://localhost:3000/hello")
      if(!response.ok) {
        throw new Error(`${response.status}`)
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (Error) {
      throw new Error(`${response.status}`)
    }
  }

    return (
        <>
        <div>
            <h1>Vite + React</h1>
              <div className="card">
                <button onClick={() => callHelloApi()}>
                  {message}
                </button>
                <p>
                  Edit <code>src/App.jsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
        </div>
              
        </>
    )
}

export default Homepage