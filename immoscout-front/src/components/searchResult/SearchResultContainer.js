import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withStyles, } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';

import ApartmentPriceTrend from './ApartmentPriceTrend';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  }
});

class SearchResultContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Route path="/price_trend" component={ApartmentPriceTrend} />
      </div>
    );
  }
}

export default compose(
  withStyles(styles)
)(SearchResultContainer);