import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import { withStyles } from '@material-ui/core/styles';
import { BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Cell } from 'recharts';

import { requestApartmentCostMovement } from '../../modules/apartment';

const styles = theme => ({
  linkStyle: {
    margin: theme.spacing.unit * 4,
  }
});

class CostMovement extends Component {
  componentDidMount() {
    const { requestApartmentCostMovement } = this.props;
    requestApartmentCostMovement();
  }

  render() {
    const { dataMap } = this.props;
    const { classes } = this.props;

    const data = Object.values(dataMap).map(el => {
      const name = el[0].id;
      const date = el[0].date;
      const value = ((el[el.length - 1].pricePerMeter - el[0].pricePerMeter) / el[el.length - 1].pricePerMeter) * 100;
      const labelKey = el[el.length - 1].pricePerMeter;
      return { name, value, labelKey, date }
    });
    const dataSorted = sortBy(data, ["date"]);
    const dateFrom = get(dataSorted[0], ['date'], '');
    const dateTo = get(dataSorted[dataSorted.length -1], ['date'], '');

    return (
      <div>
        <div>
          All cases of price changes during the period from <b>{dateFrom}</b> to <b>{dateTo}</b> for MUC-15 region.
        </div>
        <div>
          Values on the top of the bar is the final cost per meter price.
        </div>
        <div className={classes.linkStyle}>
          <Link to="/">Home</Link>
        </div>
        <BarChart width={1100} height={700} data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <YAxis ticks={[-35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35]}
                 label={{ value: '% ', position: 'insideTopLeft' }} />
          <ReferenceLine y={0} stroke='#000' />
          <Bar dataKey="value" isAnimationActive={false}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.value > 0 ? "#db1515" : "#16b720"} />
            ))}
            <LabelList dataKey="labelKey" position="top" />
          </Bar>
        </BarChart>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataMap: state.apartment.movementMap,
});


export default compose(
  connect(mapStateToProps, { requestApartmentCostMovement }),
  withStyles(styles),
)(CostMovement);