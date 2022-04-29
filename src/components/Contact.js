import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/styles';
import { Snackbar, useMediaQuery } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import ButtonArrow from './ui/ButtonArrow';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import SnackBar from '@material-ui/core/SnackBar';
import background from '../assets/background.jpg';
import mobileBackground from '../assets/mobileBackground.jpg';
import phoneIcon from '../assets/phone.svg';
import emailIcon from '../assets/email.svg';
import airplane from '../assets/send.svg';
const useStyles = makeStyles(theme => ({ 
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat : "no-repeat",
    height:"60em",
    paddingBottom:"10em",
    [theme.breakpoints.down('md')]: {
      backgroundImage: `url(${mobileBackground})`,
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
    marginLeft: "2em",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      marginRight: 0
    }
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    [theme.breakpoints.down('md')]: {
      marginBottom: "2em",
    }
  },
  message: {
    border: `2px solid ${theme.palette.common.blue}`,
    marginTop:"5em",
    borderRadius: 5,
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: "1rem",
    background: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down('sm')]: {
      height: 40,
      width: 225
    }
  }
}))
function Contact({setValue}) {
  const classes = useStyles()
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"))
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneHelper, setPhoneHelper] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ open: false, message: "", backgroundColor: ""})

  const onChange = e => {
    let valid;
    switch(e.target.id) {
      case 'email':
          setEmail(e.target.value);
          valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value);
          if (!valid) {
            setEmailHelper("Invalid email");
          } else {
            setEmailHelper("");
          }
          break;
      case 'phone':
          setPhone(e.target.value);
          valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(e.target.value);
          if (!valid) {
            setPhoneHelper("Invalid phone");
          } else {
            setPhoneHelper("");
          }
          break;
      default: break;
    }
  }

  const onConfirm = () => {
    setLoading(true)
    axios.get('https://us-central1-material-ui-practice-b43ea.cloudfunctions.net/sendMail').then(res => {
      setLoading(false)
      setOpen(false)
      setName("")
      setEmail("")
      setPhone("")
      setMessage("")
      setAlert({open: true, message: "Message sent successfully!", backgroundColor: "#4BB543"})
    }).catch(err => {
      setLoading(false)
      setAlert({open: true, message: "Something went wrong, please try again!", backgroundColor: "#FF3232"})
    })
  }

  const buttonContents = (
    <>
      Send Message 
      <img 
        src={airplane} 
        alt="Paper airplane" 
        style={{marginLeft: "1em"}}
      />
    </>
  )

  return (
    <Grid container direction="row" >
      <Grid item container direction="column" justifyContent='center' alignItems='center' lg={4} xl={3} style={{marginBottom:matchesMD ? "5em": 0, marginTop:matchesSM ? "1em" : matchesMD ? "5em": 0}}>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography align={matchesMD ? "center" : undefined} variant='h2' style={{lineHeight: 1}}>Contact Us</Typography>
              <Typography align={matchesMD ? "center" : undefined} variant='body1' stlye={{color: theme.palette.common.blue}}>We're waiting.</Typography>
            </Grid>
            <Grid item container style={{marginTop: "2em"}}>
              <Grid item>
                <img src={phoneIcon} alt="phone" style={{marginRight: "0.5em", verticalAlign:"bottom"}}/>
              </Grid>
              <Grid item>
                <Typography variant='body1' style={{color: theme.palette.common.blue, fontSize:"1rem"}}>
                  <a href="tel:5555555555" style={{textDecoration:"none", color:"inherit"}}>(555) 555-5555</a>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container style={{marginBottom: "2em"}}>
              <Grid item>
                <img src={emailIcon} alt="envelope" style={{marginRight: "0.5em", verticalAlign:"bottom"}}/>
              </Grid>
              <Grid item>
                <Typography variant='body1' style={{color: theme.palette.common.blue, fontSize:"1rem"}}>
                  <a href="mailto:zachary@gmail.com" style={{textDecoration:"none", color:"inherit"}}>zachary@gmail.com</a>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="column"  style={{ width:"20em" }}>
              <Grid item style={{marginBottom: "0.5em"}}>
                <TextField fullWidth label="Name" id="name" value={name} onChange={(e) => {setName(e.target.value)}}/>
              </Grid>
              <Grid item style={{marginBottom: "0.5em"}}>
                <TextField error={emailHelper.length !== 0} helperText={emailHelper} fullWidth label="Email" id="email" value={email} onChange={onChange}/>
              </Grid>
              <Grid item style={{marginBottom: "0.5em"}}>
                <TextField error={phoneHelper.length !== 0} helperText={phoneHelper} fullWidth label="Phone" id="phone" value={phone} onChange={onChange}/>
              </Grid>
            </Grid>
            <Grid item style={{ width:"20em" }}>
              <TextField 
                InputProps={{ disableUnderline: true }}
                className={classes.message} 
                fullWidth
                multiline 
                rows={10} 
                id="message" 
                value={message} 
                onChange={(e) => {setMessage(e.target.value)}}
              />
            </Grid>
            <Typography> 
            </Typography>
            <Grid item container justifyContent='center' style={{marginTop:"2em"}}>
              <Button 
                className={classes.sendButton} 
                variant='contained'
                disabled={name.length === 0 || message.length === 0 || phone.length === 0 || email.length === 0 || phoneHelper.length !== 0 || emailHelper.length !== 0}
                onClick={() => setOpen(true)}
              >
                {buttonContents}
              </Button>
            </Grid>
          </Grid> 
        </Grid>
      </Grid>
      <Dialog
        style={{ zIndex: 1302 }}
        open={open}
        onClose={() => setOpen(false)} 
        fullScreen={matchesSM}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? "1em" : "5em", 
            paddingBottom: matchesXS ? "1em" : "5em", 
            paddingLeft: matchesXS ? 0 : matchesSM ? "5em" : matchesMD ? "15em" : "25em", 
            paddingRight: matchesXS ? 0 : matchesSM ? "5em" : matchesMD ? "15em" : "25em", 
        }}}
      >
        <DialogContent>
          <Grid container direction="column">
            <Grid item>
              <Typography align={"center"} variant='h4' gutterBottom>Confirm Message</Typography>
            </Grid>
            <Grid item style={{marginBottom: "0.5em"}}>
                <TextField fullWidth label="Name" id="name" value={name} onChange={(e) => {setName(e.target.value)}}/>
              </Grid>
              <Grid item style={{marginBottom: "0.5em"}}>
                <TextField error={emailHelper.length !== 0} helperText={emailHelper} fullWidth label="Email" id="email" value={email} onChange={onChange}/>
              </Grid>
              <Grid item style={{marginBottom: "0.5em"}}>
                <TextField error={phoneHelper.length !== 0} helperText={phoneHelper} fullWidth label="Phone" id="phone" value={phone} onChange={onChange}/>
              </Grid>
            </Grid>
            <Grid item style={{ width: matchesSM ? "100%" : "20em"}}>
              <TextField 
                InputProps={{ disableUnderline: true }}
                className={classes.message} 
                fullWidth
                multiline 
                rows={10} 
                id="message" 
                value={message} 
                onChange={(e) => {setMessage(e.target.value)}}
              />
            </Grid>
            <Grid item container style={{ marginTop:"2em" }} alignItems="center" direction={matchesSM ? "column" : "row"}>
              <Grid item>
                <Button style={{fontWeight: 300}} color="primary" onClick={()=> setOpen(false)}>Cancel</Button>
              </Grid>
              <Grid item>
                <Button 
                  className={classes.sendButton} 
                  variant='contained'
                  onClick={onConfirm}
                >
                  {loading ? <CircularProgress size={30}/>: buttonContents}
                </Button>
              </Grid>
            </Grid>
        </DialogContent>
      </Dialog>
      <Snackbar 
        open={alert.open} 
        message={alert.message} 
        ContentProps={{ style: {backgroundColor: alert.backgroundColor}}} anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={()=> setAlert({...alert, open: false})}
        autoHideDuration={4000}
      />
      <Grid item container direction={matchesMD ? "column": "row"} className={classes.background} lg={8} xl={9} alignItems="center" justifyContent={matchesMD? "center" : undefined}>
        <Grid item style={{marginLeft: matchesMD ? 0 : "3em", textAlign: matchesMD ? "center" : "inherit"}}>
          <Grid container direction="column">
            <Grid item>
              <Typography align={matchesMD ? "center": undefined} variant='h2'>Simple Software.<br/>Revolutionary Results.</Typography>
              <Typography align={matchesMD ? "center": undefined} variant='subtitle2' style={{fontSize:"1.5rem"}}>Take advantage of the 21st Century.</Typography>
              <Grid container item justifyContent={matchesMD ? "center": undefined}>
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
    </Grid>
  )
}

export default Contact