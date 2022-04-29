import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/logo.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from "@material-ui/icons/Menu";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em"
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em"
    }
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em"
    }
  },
  tabContainer: {
    marginLeft:'auto'
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
      color: "white"
    }
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawerIcon: {
    height: "50px",
    width: "50px"
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange
  },
  drawerItemSelected: {
    "&:MuiListItemText-root": {
      opacity: 1,
    }
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1
  }
}))

function Header({value, setValue, selectedIndex, setSelectedIndex}) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); 
  const [openMenu, setOpenMenu] = useState(false);
  

  const menuOptions = [
    {name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0}, 
    {name:"Custom Software Development", link:"/customsoftware", activeIndex: 1, selectedIndex: 1},
    {name:"iOS/Android App Development", link:"/mobileapps", activeIndex: 1, selectedIndex: 2}, 
    {name:"Website Development", link:"/websites", activeIndex: 1, selectedIndex: 3}
  ]
  const routes = [
    {name: "Home",link:"/", activeIndex: 0}, 
    {name: "Services",link:"/services", activeIndex: 1, ariaOwns: anchorEl ? "simple-menu" : undefined, ariaPopup: anchorEl ? true : undefined, mouseOver: (e) => handleClick(e)}, 
    {name: "The Revolution",link:"/revolution", activeIndex: 2}, 
    {name: "About Us",link:"/about", activeIndex: 3}, 
    {name: "Contact Us",link:"/contact", activeIndex: 4}
  ]

  const handleChange = (e, newValue) => {
    setValue(newValue)
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  }

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  }

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i)
  }

  

  useEffect(() => {
    [...menuOptions, ...routes].forEach(route => {
      switch(window.location.pathname) {
        case `${route.link}`: 
          if(value !== route.activeIndex) {
            setValue(route.activeIndex)
            if(route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex)
            }
          }
          break;
        case "/estimate": 
         setValue(5);
         break;
        default: break;
      }
    })
  },[value, menuOptions, selectedIndex, routes])

  const tabs = (
    <>
      <Tabs 
        value={value} 
        onChange={handleChange} 
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route, index)=> (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
          />
        ))}
      </Tabs>
      <Button component={Link} to="/estimate" onClick={() => {setValue(5)}} variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} open={openMenu} onClose={handleClose} classes={{paper: classes.menu}} elevation={0} style={{zIndex: 1302}}>
        {menuOptions.map((option, i) => {
          return (
          <MenuItem
            key={`${option}${i}`}
            onClick={(e) => {handleMenuItemClick(e, i); setValue(1); handleClose();}}
            classes={{root: classes.menuItem}}
            component={Link}
            to={option.link}
            selected={i===selectedIndex && value === 1}
            keepmounted
          >
            {option.name}
          </MenuItem>
        )})}
      </Menu>
    </>
  )

  const drawer = (
    <>
      <SwipeableDrawer 
        disableBackdropTransition={iOS} 
        disableDiscovery={iOS} 
        open={openDrawer} 
        onClose={() => {setOpenDrawer(false)}}
        onOpen={() => {setOpenDrawer(true)}}
        classes={{paper: classes.drawer}}
      >
        <div className={classes.toolbarMargin}></div>
        <List disablePadding>
          {routes.map((route, index)=> (
            <ListItem
              key={`${route}${route.activeIndex}`}
              divider
              button
              classes={{selected: classes.drawerItemSelected}}
              component={Link}
              to={route.link}
              selected={value === route.activeIndex}
              onClick={() => {setOpenDrawer(false); setValue(route.activeIndex)}}
            >
              <ListItemText 
                disableTypography
                className={classes.drawerItem}
              >
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem className={{root: classes.drawerItemEstimate, selected: classes.drawerItemSelected}} onClick={() => {setOpenDrawer(false); setValue(5)}} divider button component={Link} to="/estimate" selected={value === 5}>
            <ListItemText className={classes.drawerItem} disableTypography>Free Estimate</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton className={classes.drawerIconContainer} onClick={() => {setOpenDrawer(!openDrawer)}} disableRipple>
        <MenuIcon className={classes.drawerIcon}/>
      </IconButton>
    </>
  )

  return (
    <>
    <ElevationScroll>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar disableGutters>
          <Button component={Link} disableRipple onClick={() => {setValue(0)}} to="/" className={classes.logoContainer}>
            <img alt="company logo" src={logo}  className={classes.logo}/>
          </Button>
          {matches ? drawer : tabs}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
    <div className={classes.toolbarMargin}/>
    </>
   
  )
}

export default Header