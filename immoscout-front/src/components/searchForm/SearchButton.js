import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withStyles, } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { requestApartmentPriceTrend } from '../../modules/apartment';

const styles = theme => ({
  container: {
    margin: theme.spacing.unit * 2,
  }
});

class SearchButton extends Component {
  render() {
    const { t } = this.props;
    const { classes } = this.props;
    const { requestApartmentPriceTrend } = this.props;
    return (
      <div className={classes.container}>
        <Button variant="outlined" color="primary" onClick={requestApartmentPriceTrend}>
          {t('get_result')}
        </Button>
      </div>
    );
  }
}

export default compose(
  connect(null, { requestApartmentPriceTrend }),
  withStyles(styles),
  translate()
)(SearchButton);