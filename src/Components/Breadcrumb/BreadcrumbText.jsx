import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Button from '@material-ui/core/Button';
import './BreadcrumbText.css';

const styles = theme => ({
  lastPath: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  paths: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  }
});

class BreadcrumbText extends Component {

    render() {
        const { classes, handleClickPath, path, rootTitle, handleGoBack, canGoBack } = this.props;

        const separator = <span>&gt;</span>;
        const rootPath = <span onClick={(e) => handleClickPath(e, -1, path)} data-index={0}>
            { rootTitle } { path.length ? separator : '' }
        </span>;
        const lastPath = [...path].pop() || rootTitle;

        const directories = path.map((dir, index) => {
            return <span key={index} data-index={index} onClick={(e) => handleClickPath(e, index, path)}>
                <span>{dir}</span> { path.length -1 !== index ? separator : '' }&nbsp;
            </span>
        });

        return (
            <div className="BreadcrumbText">
                <div className={classes.lastPath}>
                    <Button onClick={handleGoBack} color="inherit" type="button" style={{display: canGoBack ? 'inline-flex' : 'none'}}>
                        <KeyboardArrowLeftIcon />
                    </Button>
                    {lastPath}
                </div>
                <div className={classes.paths}>{rootPath} {directories}</div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
    };
};

const mapStateToProps = (state) => {
    return {
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BreadcrumbText));
