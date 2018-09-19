import React, { Component } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";

class Navigation extends Component {
  state = {
    isShowing: true
  };

  handleToggle = () => {
    this.setState(({ isShowing }) => ({
      isShowing: !isShowing
    }));
  };

  render() {
    const { currentStaffUser, onLogout } = this.props;
    const { isShowing } = this.state;

    const responsiveClass = isShowing ? "hide-for-small-only" : "";

    return (
      <nav className="top-bar topbar-responsive">
        <div className="top-bar-title">
          <span className="show-for-small-only">
            <button
              className="menu-icon"
              type="button"
              onClick={this.handleToggle}
            />
          </span>
          <Link
            to={currentStaffUser ? "/admin" : "/"}
            className="topbar-responsive-logo tour-est"
          >
            <strong>tour-est</strong>
          </Link>
        </div>
        <div className={`topbar-responsive-links ${responsiveClass}`}>
          <div className="top-bar-right">
            {currentStaffUser ? (
              <ul className="menu simple vertical medium-horizontal">
                <li>
                  <a href="#" onClick={onLogout}>
                    Log Out
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="menu simple vertical medium-horizontal">
                <li>
                  <Link to="/login">Log In</Link>
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
  }
}

Navigation.propTypes = {
  currentStaffUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    cultural_center: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  }),
  onLogout: PropTypes.func.isRequired
};

export default Navigation;
