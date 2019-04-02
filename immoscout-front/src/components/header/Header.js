import React, { Component } from 'react';
import compose from 'recompose/compose';
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
    const { t } = this.props;
    const { classes } = this.props;
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <div className={classes.title}>{t('app_price_trend')}</div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default compose(
  withStyles(styles),
  translate()
)(Header);