import React, { Component } from 'react';
import { withStyles, } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { requestApartmentMeta } from '../../modules/apartment';

import Header from '../header/Header';
import SearchFormContainer from '../searchForm/SearchFormContainer';
import SearchResultContainer from '../searchResult/SearchResultContainer';

const styles = theme => ({
  container: {
    maxWidth: 1160,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing.unit * 6,
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
  componentDidMount() {
    const { requestApartmentMeta, defaultPage, history } = this.props;
    requestApartmentMeta();
    history.push(defaultPage);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.headerContainer}>
          <Header />
        </div>
        <div className={classes.contentContainer}>
          <SearchFormContainer />
          <SearchResultContainer />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  defaultPage: state.apartment.defaultPage,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { requestApartmentMeta }),
  withStyles(styles)
)(App);