import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ButtonArrow from './ButtonArrow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from "react-router-dom";
import background from '../../assets/background.jpg';
import mobileBackground from '../../assets/mobileBackground.jpg';
const useStyles = makeStyles(theme => ({
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    [theme.breakpoints.down('sm')]: {
      marginBottom: "2em",
    }
  },
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat : "no-repeat",
    backgroundAttachment:"fixed",
    height:"60em",
    width:"100%",
    [theme.breakpoints.down('md')]: {
      backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment:"inherit",
    }
  },
  estimateButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 80,
    width: 205,
    backgroundColor: theme.palette.common.orange,
    fontSize: "1.5rem",
    marginRight: "5em",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginRight: 0
    }
  }
}))

function CallToAction({setValue}) {
  const classes = useStyles();
  const theme = useTheme()
  const metchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Grid container alignItems="center" justifyContent={metchesSM ? "center" : "space-between"} className={classes.background} direction={metchesSM ? "column" : "row"}>
      <Grid item style={{marginLeft: metchesSM ? 0 : "5em", textAlign: metchesSM ? "center" : "inherit"}}>
        <Grid container direction="column">
          <Grid item>
            <Typography variant='h2'>Simple Software.<br/>Revolutionary Results.</Typography>
            <Typography variant='subtitle2' style={{fontSize:"1.5rem"}}>Take advantage of the 21st Century.</Typography>
            <Grid container item justifyContent={metchesSM ? "center": undefined}>
              <Button onClick={()=>setValue(2)} component={Link} to="/estimate" variant="outlined" className={classes.learnButton}>
                <span style={{marginRight: 5}}>Learn More</span>
                <ButtonArrow width={10} height={10} fill={theme.palette.common.blue}/>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button onClick={()=>setValue(5)} variant="contained" className={classes.estimateButton}>Free Estimate</Button>
      </Grid>
    </Grid>
  )
}

export default CallToAction