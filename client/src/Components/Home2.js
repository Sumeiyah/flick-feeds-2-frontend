import React from 'react'
//import {Link} from 'react-router-dom'
import Navigation from './Navigation'
import '../App.css';
import '../Base.css'
// import properties from '../properties.svg'
// import house from '../house.svg'
// import tenants from '../tenants.svg'
// import issues from '../issues.svg'

function Home() {
    return (
        <div className="landing-App">
          {/* <header className="landing-header">
            <h1> rtm </h1>
            <div className="landing-login-button-container">
              <Link to="/login" className="landing-login-button">Login</Link>
              <Link to="/signup" className="landing-login-button">Sign Up</Link>
            </div>
          </header> */}
          <Navigation />
          <main className="landing-main">
            <section id="about" className="landing-about">
              
              <p>
              
              </p>
            </section>
          </main>
    
          <footer className="landing-footer">
            <div className="landing-contact-info">
              <p>Contact Us: 0700000000</p>
              <p>Email: info@mvc.com</p>
            </div>
            <p>&copy; {new Date().getFullYear()} mvc. Movie Club Management System Inc.</p>
          </footer>
        </div>
      )
    }

export default Home