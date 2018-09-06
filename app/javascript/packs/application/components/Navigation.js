import React, { Component } from "react";
import { Link } from "@reach/router";

const Navigation = ({ currentStaffUser, onLogout }) => (
  <nav className="top-bar topbar-responsive">
    <div className="top-bar-title">
      <a className="topbar-responsive-logo" href="#">
        <strong>tour-est</strong>
      </a>
    </div>
    <div id="topbar-responsive" className="topbar-responsive-links">
      <div className="top-bar-right">
        {currentStaffUser ? (
          <ul className="menu simple vertical medium-horizontal">
            <li>
              <Link to="/admin">Home</Link>
            </li>
            <li>
              <Link to="/tours/new">Create Tour</Link>
            </li>
            <li>
              <a href="#" onClick={onLogout}>
                Log Out
              </a>
            </li>
          </ul>
        ) : (
          <ul className="menu simple vertical medium-horizontal">
            <li>
              <Link to="/login">Sign In</Link>
            </li>
            <li>
              <Link to="/sign-up">Create Account</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  </nav>
);

export default Navigation;
