import React, { useEffect, useState } from "react";
import axios from "axios";
import Lottie from "react-lottie";
import { cloneDeep } from "lodash";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

import check from "../assets/check.svg";
import send from "../assets/send.svg";
import software from "../assets/software.svg";
import mobile from "../assets/mobile.svg";
import website from "../assets/website.svg";
import backArrow from "../assets/backArrow.svg";
import backArrowDisabled from "../assets/backArrowDisabled.svg";
import forwardArrow from "../assets/forwardArrow.svg";
import forwardArrowDisabled from "../assets/forwardArrowDisabled.svg";
import camera from "../assets/camera.svg";
import upload from "../assets/upload.svg";
import person from "../assets/person.svg";
import persons from "../assets/persons.svg";
import info from "../assets/info.svg";
import bell from "../assets/bell.svg";
import people from "../assets/people.svg";
import users from "../assets/users.svg";
import iphone from "../assets/iphone.svg";
import gps from "../assets/gps.svg";
import customized from "../assets/customized.svg";
import data from "../assets/data.svg";
import android from "../assets/android.svg";
import globe from "../assets/globe.svg";
import biometrics from "../assets/biometrics.svg";
import estimateAnimation from "../animations/estimateAnimation/data.json";
import { Icon } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  icon: {
    width:"12em",
    height:"10em"
  },
  estimateButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    backgroundColor: theme.palette.common.orange,
    height: 50,
    width: 225,
    fontSize: "1.25rem",
    marginTop:"5em",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    }
  },
  message: {
    border: `2px solid ${theme.palette.common.blue}`,
    marginTop:"5em",
    borderRadius: 5,
  },
  specialText:{
    fontFamily: "Raleway",
    fontWeight: 700,
    fontSize: "1.5rem",
    color: theme.palette.common.orange
  }
}))

const defaultQuestions = [
  {
    id: 1,
    title: "Which service are you interested in?",
    active: true,
    options: [
      {
        id: 1,
        title: "Custom Software Development",
        subtitle: null,
        icon: software,
        iconAlt: "three floating screens",
        selected: false,
        cost: 0
      },
      {
        id: 2,
        title: "iOS/Android App Development",
        subtitle: null,
        icon: mobile,
        iconAlt: "outlines of phones and tablets",
        selected: false,
        cost: 0
      },
      {
        id: 3,
        title: "Website Development",
        subtitle: null,
        icon: website,
        iconAlt: "computer outline",
        selected: false,
        cost: 0
      }
    ]
  }
];
const softwareQuestions = [
  { ...defaultQuestions[0], active: false },
  {
    id: 2,
    title: "Which platforms do you need supported?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Web Application",
        subtitle: null,
        icon: website,
        iconAlt: "computer outline",
        selected: false,
        cost: 100
      },
      {
        id: 2,
        title: "iOS Application",
        subtitle: null,
        icon: iphone,
        iconAlt: "outline of iphone",
        selected: false,
        cost: 100
      },
      {
        id: 3,
        title: "Android Application",
        subtitle: null,
        icon: android,
        iconAlt: "outlines of android phone",
        selected: false,
        cost: 100
      }
    ],
    active: true
  },
  {
    id: 3,
    title: "Which features do you expect to use?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Photo/Video",
        subtitle: null,
        icon: camera,
        iconAlt: "camera outline",
        selected: false,
        cost: 25
      },
      {
        id: 2,
        title: "GPS",
        subtitle: null,
        icon: gps,
        iconAlt: "gps pin",
        selected: false,
        cost: 25
      },
      {
        id: 3,
        title: "File Transfer",
        subtitle: null,
        icon: upload,
        iconAlt: "outline of cloud with arrow pointing up",
        selected: false,
        cost: 25
      }
    ],
    active: false
  },
  {
    id: 4,
    title: "Which features do you expect to use?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Users/Authentication",
        subtitle: null,
        icon: users,
        iconAlt: "outline of a person with a plus sign",
        selected: false,
        cost: 25
      },
      {
        id: 2,
        title: "Biometrics",
        subtitle: null,
        icon: biometrics,
        iconAlt: "fingerprint",
        selected: false,
        cost: 25
      },
      {
        id: 3,
        title: "Push Notifications",
        subtitle: null,
        icon: bell,
        iconAlt: "outline of a bell",
        selected: false,
        cost: 25
      }
    ],
    active: false
  },
  {
    id: 5,
    title: "What type of custom features do you expect to need?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "Low Complexity",
        subtitle: "(Informational)",
        icon: info,
        iconAlt: "'i' inside a circle",
        selected: false,
        cost: 25
      },
      {
        id: 2,
        title: "Medium Complexity",
        subtitle: "(Interactive, Customizable, Realtime)",
        icon: customized,
        iconAlt: "two toggle switches",
        selected: false,
        cost: 50
      },
      {
        id: 3,
        title: "High Complexity",
        subtitle: "(Data Modeling and Computation)",
        icon: data,
        iconAlt: "outline of line graph",
        selected: false,
        cost: 100
      }
    ],
    active: false
  },
  {
    id: 6,
    title: "How many users do you expect?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "0-10",
        subtitle: null,
        icon: person,
        iconAlt: "person outline",
        selected: false,
        cost: 1
      },
      {
        id: 2,
        title: "10-100",
        subtitle: null,
        icon: persons,
        iconAlt: "outline of two people",
        selected: false,
        cost: 1.25
      },
      {
        id: 3,
        title: "100+",
        subtitle: null,
        icon: people,
        iconAlt: "outline of three people",
        selected: false,
        cost: 1.5
      }
    ],
    active: false
  }
];
const websiteQuestions = [
  { ...defaultQuestions[0], active: false },
  {
    id: 2,
    title: "Which type of website are you wanting?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "Basic",
        subtitle: "(Informational)",
        icon: info,
        iconAlt: "person outline",
        selected: false,
        cost: 100
      },
      {
        id: 2,
        title: "Interactive",
        subtitle: "(Users, API's, Messaging)",
        icon: customized,
        iconAlt: "outline of two people",
        selected: false,
        cost: 200
      },
      {
        id: 3,
        title: "E-Commerce",
        subtitle: "(Sales)",
        icon: globe,
        iconAlt: "outline of three people",
        selected: false,
        cost: 250
      }
    ],
    active: true
  }
];

function Estimate() {
  const classes = useStyles();
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))
  const [questions, setQuestions] = useState(defaultQuestions)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneHelper, setPhoneHelper] = useState("");

  const [message, setMessage] = useState("");

  const [total, setTotal] = useState(0)

  const [service, setService] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [customFeatures, setCustomFeatures] = useState("");
  const [users, setUsers] = useState("");
  const [category, setCategory] = useState("");

  const [alert, setAlert] = useState({ open: false, color: "" });
  const [alertMessage, setAlertMesssage] = useState("");

  const [loading, setLoading] = useState(false);


  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: estimateAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  
  const nextQuestion = () => {
    const newQuestions = cloneDeep(questions);
    const currentlyActive = newQuestions.filter(question => question.active)
    const activeIndex = currentlyActive[0].id - 1
    const nextIndex = activeIndex + 1

    newQuestions[activeIndex] = {...currentlyActive[0], active: false}
    newQuestions[nextIndex] = {...newQuestions[nextIndex], active: true}

    setQuestions(newQuestions)
  }
  const previousQuestion = () => {
    const newQuestions = cloneDeep(questions);
    const currentlyActive = newQuestions.filter(question => question.active)
    const activeIndex = currentlyActive[0].id - 1
    const nextIndex = activeIndex - 1

    newQuestions[activeIndex] = {...currentlyActive[0], active: false}
    newQuestions[nextIndex] = {...newQuestions[nextIndex], active: true}

    setQuestions(newQuestions)
  }

  const navigationPreviousDisabled = () => {
    const currentlyActive = questions.filter(question => question.active)

    if (currentlyActive[0].id === 1) {
      return true 
    } else {
      return false
    }
  }

  const navigationNextDisabled = () => {
    const currentlyActive = questions.filter(question => question.active)

    if (currentlyActive[0].id === questions[questions.length - 1].id) {
      return true 
    } else {
      return false
    }
  }
  
  const handleSelect = (id) => {
    const newQuestions = cloneDeep(questions)

    const currentlyActive = newQuestions.filter(question => question.active)
    const activeIndex = currentlyActive[0].id - 1

    const newSelected = newQuestions[activeIndex].options[id - 1]

    const previousSelected = currentlyActive[0].options.filter(option => option.selected)

    switch (currentlyActive[0].subtitle) {
      case "Select one.":
        if (previousSelected[0]) {
          previousSelected[0].selected = !previousSelected[0].selected;
        }
        newSelected.selected = !newSelected.selected;
        break;
      default:
        newSelected.selected = !newSelected.selected;
        break;
    }

    switch(newSelected.title){
      case 'Custom Software Development':
        setQuestions(softwareQuestions)
        setService(newSelected.title)
        break;
      case 'iOS/Android App Development':
        setQuestions(softwareQuestions)
        setService(newSelected.title)
        break;
      case 'Website Development':
        setQuestions(websiteQuestions)
        setService(newSelected.title)
        break;
      default:
        setQuestions(newQuestions)
        break;
    }
  }

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

  const getTotal = () => {
    let cost = 0;

    const selections = questions
      .map(question => question.options.filter(option => option.selected))
      .filter(question => question.length > 0);

    selections.map(options => options.map(option => (cost += option.cost)));

    if (questions.length > 2) {
      const userCost = questions
        .filter(question => question.title === "How many users do you expect?")
        .map(question =>
          question.options.filter(option => option.selected)
        )[0][0];

      

      cost -= userCost.cost;
      cost *= userCost.cost;
    }

    setTotal(cost);
  };

  const getPlatforms = () => {
    let newPlatforms = []

    if(questions.length > 2) {
      questions.filter(
        question => question.title === "Which platforms do you need supported?"
      ).map(
        question => question.options.filter(option => option.selected))[0]
       .map(
        option => newPlatforms.push(option.title)
       )

      setPlatforms(newPlatforms)
    }
  }


  return (
    <Grid container direction="row">
      <Grid item container direction="column" lg>
        <Grid item style={{marginTop:"2em", marginLeft:"5em"}}>
          <Typography variant="h2">Estimate</Typography>
        </Grid>
        <Grid item style={{ marginRight:"10em", maxWidth:"50em", marginTop: "7.5em"}}>
          <Lottie options={defaultOptions} height="100%" width="100%"/>
        </Grid>
      </Grid>
      <Grid item container direction="column" alignItems="center" lg style={{marginRight: "2em", marginBottom:"25em"}}>
        {questions.filter(question => question.active).map((question, index) => (
          <React.Fragment key={index}>
            <Grid item> 
              <Typography 
                variant="h2" 
                gutterBottom align="center" 
                style={{
                  fontWeight:500, 
                  fontSize:"2.25rem", 
                  marginTop:"5em",
                  lineHeight: 1.25
                }}
              >
                {question.title}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom style={{marginBottom: "2.5em"}}>
                {question.subtitle}
              </Typography>
            </Grid>
            <Grid item container>
              {question.options.map(option => (
                <Grid 
                  item 
                  container 
                  direction="column" 
                  md 
                  component={Button} 
                  style={{display: "grid", borderRadius: 0, textTransform: "none", backgroundColor: option.selected ? theme.palette.common.orange : null}}
                  onClick={() => handleSelect(option.id)}
                >
                  <Grid item style={{maxWidth: "14em"}}>
                    <Typography 
                      variant="h6" 
                      align="center" 
                      style={{marginBottom:"1em"}}
                    >
                      {option.title}
                    </Typography>
                    <Typography variant="caption" align="center">
                      {option.subtitle}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <img src={option.icon} alt={option.iconAlt} className={classes.icon}/>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </React.Fragment>
        ))}
        
        
        <Grid item container justifyContent="space-between" style={{width:"18em", marginTop: "3em"}}>
          <Grid item>
            <IconButton disabled={navigationPreviousDisabled()} onClick={previousQuestion}>
              <img src={navigationPreviousDisabled() ? backArrowDisabled : backArrow} alt="Previous question"/>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton disabled={navigationNextDisabled()} onClick={nextQuestion}>
              <img src={navigationNextDisabled() ? forwardArrowDisabled : forwardArrow} alt="Next question"/>
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            className={classes.estimateButton} 
            onClick={() => {setDialogOpen(true); getTotal(); getPlatforms()}}
          >
            Get Estimate
          </Button>
        </Grid>
      </Grid>
      <Dialog style={{ zIndex: 1302 }} open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Grid container justifyContent="center">
          <Typography variant="h2" align="center">
            Estimate
          </Typography>
        </Grid>
        <DialogContent>
          <Grid container>
            <Grid item container direction="column" md={7}>
              <Grid item style={{marginBottom: "0.5em"}}>
                <TextField fullWidth label="Name" id="name" value={name} onChange={(e) => {setName(e.target.value)}}/>
              </Grid>
              <Grid item style={{marginBottom: "0.5em"}}>
                <TextField error={emailHelper.length !== 0} helperText={emailHelper} fullWidth label="Email" id="email" value={email} onChange={onChange}/>
              </Grid>
              <Grid item style={{marginBottom: "0.5em"}}>
                <TextField error={phoneHelper.length !== 0} helperText={phoneHelper} fullWidth label="Phone" id="phone" value={phone} onChange={onChange}/>
              </Grid>
              <Grid item style={{maxWidth:"20em"}}>
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
              <Grid item>
                <Typography variant="body1" paragraph>
                  We can create this digital solution for an estimated <span className={classes.specialText}>${total.toFixed(2)}</span>
                </Typography>
                <Typography variant="body1" paragraph>
                  Fill out your name, phone number, and email, place your request, and we'll get back to you with details moving forward and a final price.
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="column" md={5}>
              <Grid item>
                <Grid container direction="column">
                  <Grid item container alignItems="center">
                    <Grid item>
                      <img src={check} alt="checkmark"/>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        You want {service}
                        {platforms.length > 0 ? `for ${
                              //if only web application is selected...
                              platforms.indexOf("Web Application") > -1 &&
                              platforms.length === 1
                                ? //then finish sentence here
                                  "a Web Application."
                                : //otherwise, if web application and another platform is selected...
                                platforms.indexOf("Web Application") > -1 &&
                                  platforms.length === 2
                                ? //then finish the sentence here
                                  `a Web Application and an ${platforms[1]}.`
                                : //otherwise, if only one platform is selected which isn't web application...
                                platforms.length === 1
                                ? //then finish the sentence here
                                  `an ${platforms[0]}`
                                : //otherwise, if other two options are selected...
                                platforms.length === 2
                                ? //then finish the sentence here
                                  "an iOS Application and an Android Application."
                                : //otherwise if all three are selected...
                                platforms.length === 3
                                ? //then finish the sentence here
                                  "a Web Application, an iOS Application, and an Android Application."
                                : null
                            }` : null }
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container alignItems="center">
                    <Grid item>
                      <img src={check} alt="checkmark"/>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">Second options check</Typography>
                    </Grid>
                  </Grid>
                  <Grid item container alignItems="center">
                    <Grid item>
                      <img src={check} alt="checkmark"/>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">Third options check</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Button variant="contained" className={classes.estimateButton}>
                  Place request
                  <img src={send} alt="paper airplane" style={{marginLeft: "0.5em"}}/>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default Estimate