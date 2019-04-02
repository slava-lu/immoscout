import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Paper from '@material-ui/core/Paper';

import { requestApartmentPriceTrend } from '../../modules/apartment';

const styles = theme => ({
  container: {
    width: 1160,
    marginTop: theme.spacing.unit * 4,
    padding: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'center'
  }
});

class ApartmentPriceTrend extends Component {
  componentDidMount() {
    const { requestApartmentPriceTrend } = this.props;
    requestApartmentPriceTrend();
  }

  render() {
    const { classes } = this.props;
    const { data } = this.props;
    return (
      <Paper className={classes.container}>
        <LineChart width={1100} height={500} data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="pricePerMeter" stroke="#8884d8" />
        </LineChart>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  data: state.apartment.costStat,
});


export default compose(
  connect(mapStateToProps, { requestApartmentPriceTrend }),
  withStyles(styles),
)(ApartmentPriceTrend);