import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class DynamicSnackbar extends React.Component {
  render() {
    const { classes, errorMsg, handleClose, open, notificationDuration } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={notificationDuration}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{errorMsg}</span>}
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={handleClose} >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

DynamicSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state, ownState) => {
    return {
        open: !!state.errorMsg,
        errorMsg: state.errorMsg,
        notificationDuration: state.notificationDuration || 15000
    };
};

const mapDispatchToProps = (dispatch, ownState) => {
    return {
        handleClose: (event) => {
            dispatch({
                type: 'SET_ERROR_MSG',
                value: null
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DynamicSnackbar));

