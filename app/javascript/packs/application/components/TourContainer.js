import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import Tour from "./Tour";
import PointCards from "./PointCards";

const TourContainer = ({ tourId }) => (
  <div>
    <Tour tourId={tourId} />
    <h3 className="point-header">What you will see on this tour:</h3>
    <PointCards tourId={tourId} />
  </div>
);

TourContainer.propTypes = {
  tourId: PropTypes.string
};

export default TourContainer;
