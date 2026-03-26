import React from 'react'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
  return (
    <div className="header fixed-top">
          <div className="branding d-flex align-items-cente">

          <div className="container position-relative d-flex align-items-center justify-content-end">

              <nav id="navmenu" className="navmenu">
                  <ul>
                      <li><a href="index.html" className="active">Home</a></li>
                      <li><a href="#">News</a></li>
                      <li><a href="#">Events</a></li>
                      <li><a href="#">Sports</a></li>
                      <li><a href="#">Photo Gallery</a></li>
                      <li><a href="#">About Us</a></li>
                  </ul>
                  <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
              </nav>

          </div>

      </div>
      </div>
  )
}

export default Navbar