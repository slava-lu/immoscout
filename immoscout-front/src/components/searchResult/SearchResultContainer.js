import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ApartmentPriceTrend from './ApartmentPriceTrend';
import CostMovement from './CostMovement';

class SearchResultContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div >
        <Route path="/" exact component={ApartmentPriceTrend} />
        <Route path="/cost_movement" component={CostMovement} />
      </div>
    );
  }
}

export default SearchResultContainer;