import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withStyles, } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
  title: {
    marginLeft: theme.spacing.unit
  },
  langSelector: {
    marginLeft: 'auto',
    marginRight: 30
  },
  radioButtons: {
    display: 'flex',
    flexDirection: 'row',
  }
});

class Header extends Component {
  render() {
    const {title } = this.props;
    const { classes } = this.props;
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <div className={classes.title}>{title}</div>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  title: state.apartment.title,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
  translate()
)(Header);