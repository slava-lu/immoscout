import React, { Component } from 'react';
import { withStyles, } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../header/Header';
import SearchResultContainer from '../searchResult/SearchResultContainer';

const styles = theme => ({
  container: {
    maxWidth: 1160,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.background.paper,
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
  headerContainer: {
    height: 100,
  },
  contentContainer: {
    padding: theme.spacing.unit * 0
  },
});

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.headerContainer}>
          <Header />
        </div>
        <div className={classes.contentContainer}>
          <SearchResultContainer />
        </div>
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(),
  withStyles(styles)
)(App);