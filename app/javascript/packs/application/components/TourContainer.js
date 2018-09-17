import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import Tour from "./Tour";
import PointsList from "./PointsList";

const TourContainer = ({ tourId }) => (
  <div>
    <Tour tourId={tourId} />
    <h3 className="point-header">Points on Tour</h3>
    <PointsList tourId={tourId} />
  </div>
);

TourContainer.propTypes = {
  tourId: PropTypes.string
};

export default TourContainer;
