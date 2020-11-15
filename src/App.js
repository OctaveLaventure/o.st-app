import React, { useState } from 'react'
import copy from 'copy-to-clipboard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles.css'

document.title = "ø.st - URL shortener"

function App() {
  
  const [link, setLink] = useState(null)
  const [url, setURL] = useState(null)
  const [slug, setSlug] = useState(null)

  const getLink = () => {
    fetch("https://ø.st/s/new", {
      method: 'POST',
      body: JSON.stringify({url, slug}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }}).then(response => response.json()).then(data => setLink(data.link)).catch(() => toast("Something went wrong.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }))
  }

  const handleCopy = () => {
    try {
      copy(link)
      toast('🦄 Copied to your clipboard !', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch {
      toast('something went wrong :/')
    }
  }

  return (
    <div className="formContainer">
      <h1>ø.st</h1>
      <div className="urlContainer">
        <div className="label">1. URL to shorten</div>
        <input id="url" placeholder='https://...' onChange={e => setURL(e.target.value)}></input>
      </div>
      <div className="slugContainer">
        <div className="label">2. Custom URL <i>(Optional)</i></div>
        <div>https://ø.st/<input id="slug" placeholder="your-custom-url" onChange={e => setSlug(e.target.value)}></input></div>
      </div>
      <div className="submitContainer">
        <button className="submitButton" onClick={getLink}>Get Link</button>
      </div>
      {link && <div className="linkContainer">
        <div className="link">{link}</div>
        <div className="clickToCopy" onClick={handleCopy}>Click to Copy</div>
      </div>}
      <ToastContainer />
    </div>
  )
}

export default App
