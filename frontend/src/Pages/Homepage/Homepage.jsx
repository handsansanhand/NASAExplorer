import './Homepage.css'
import { fetchDailyImage } from '../../Scripts/fetchDailyImage'
import { useState } from "react" 
import CustomButton from '../../Components/CustomButton'
function Homepage() {
      const leftBoxText = "Welcome to the NASA Visualiser!"
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
        <div className='main-container'>
            <div className='homepage-title'>NASA Visualiser</div>
              <div className='content-row'>
                  <div className='left-box'>
                      {leftBoxText}
                  </div>
                  <div className="right-box">
                  <p>View the
                    <br></br>
                    <CustomButton text="Fetch NASA Image" onClick={() => console.log('Clicked!')} />
                    <br></br>
                     Astronomy Picture of the Day!</p>
                  </div>
              </div>
     
              <div className="card">
                <button onClick={() => fetchDailyImage()}>
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