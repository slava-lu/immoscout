import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import RegionSelector from './RegionSelector';
import RoomSelector from './RoomSelector';
import SearchButton from './SearchButton';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

class SearchFormContainer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.container}>
        <form className={classes.root} autoComplete="off">
          <div>
            <RegionSelector />
            <RoomSelector />
          </div>
          <div>
            <SearchButton />
          </div>
        </form>
      </Paper>
    );
  }
}

export default compose(
  withStyles(styles),
)(SearchFormContainer);
