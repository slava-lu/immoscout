import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles, } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { selectRegion } from '../../modules/apartment';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit * 2,
    minWidth: 140,
  },
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
    },
  },
};

class RegionSelector extends Component {
  handleChange = (event) => {
    const { selectRegion } = this.props;
    selectRegion(event.target.value);
  };

  render() {
    const { classes } = this.props;
    const { regions, regionSelected } = this.props;
    const menuItems = regions.map(region => (
      <MenuItem key={region.region} value={region.region}>{region.region}</MenuItem>
    ));
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="region">Region</InputLabel>
        <Select
          value={regionSelected}
          onChange={this.handleChange}
          MenuProps={MenuProps}
          inputProps={{
            name: 'Region',
            id: 'region',
          }}
        >
          {menuItems}
        </Select>
      </FormControl>
    );
  }
}

const mapStateToProps = state => ({
  regions: state.apartment.regions,
  regionSelected: state.apartment.regionSelected,
});

export default compose(
  connect(mapStateToProps, { selectRegion }),
  withStyles(styles),
)(RegionSelector);