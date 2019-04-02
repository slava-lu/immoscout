import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles, } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { selectRoom } from '../../modules/apartment';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
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

class RoomSelector extends Component {
  handleChange = (event) => {
    const { selectRoom } = this.props;
    selectRoom(event.target.value);
  };

  render() {
    const { classes } = this.props;
    const { rooms, roomsSelected } = this.props;
    const menuItems = rooms.map(room => (
      <MenuItem key={room.room} value={room.room}>{room.room}</MenuItem>
    ));
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="room">Rooms number</InputLabel>
        <Select
          value={roomsSelected}
          onChange={this.handleChange}
          MenuProps={MenuProps}
          inputProps={{
            name: 'Rooms',
            id: 'room',
          }}
        >
          {menuItems}
        </Select>
      </FormControl>
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.apartment.rooms,
  roomsSelected: state.apartment.roomsSelected,
});

export default compose(
  connect(mapStateToProps, { selectRoom }),
  withStyles(styles),
)(RoomSelector);