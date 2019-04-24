import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Paper from '@material-ui/core/Paper';
import SearchFormContainer from '../searchForm/SearchFormContainer';

import { requestApartmentPriceTrend, requestApartmentMeta } from '../../modules/apartment';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing.unit * 2,
  },
  linkStyle: {
    marginBottom: theme.spacing.unit * 4,
  }
});

class ApartmentPriceTrend extends Component {
  componentDidMount() {
    const { requestApartmentPriceTrend, requestApartmentMeta } = this.props;
    requestApartmentMeta();
    requestApartmentPriceTrend();
  }

  render() {
    const { classes } = this.props;
    const { data } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.linkStyle}>
          <Link to="/cost_movement">Cost Movement</Link>
        </div>
        <SearchFormContainer />
        <Paper>
          <LineChart width={1100} height={500} data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="pricePerMeter" stroke="#8884d8" />
          </LineChart>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.apartment.costStat,
});


export default compose(
  connect(mapStateToProps, { requestApartmentPriceTrend, requestApartmentMeta }),
  withStyles(styles),
)(ApartmentPriceTrend);