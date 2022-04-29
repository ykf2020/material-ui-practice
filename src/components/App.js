import React, { useState } from "react";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import LandingPage from "./LandingPage";
import Services from "./Services";
import CustomSoftware from "./CustomSoftware";
import MobileApps from "./MobileApps";
import Websites from "./Websites";
import Revolution from "./Revolution";
import About from "./About";
import Contact from "./Contact";
import Estimate from "./Estimate";
import { ThemeProvider } from '@material-ui/core/styles'
import theme from "./ui/Theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <ThemeProvider theme={theme}>  
    <BrowserRouter>
      <Header value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
      <Switch>
        <Route exact path="/" render={(props)=> <LandingPage {...props} value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>} /> 
        <Route exact path="/services" render={(props)=><Services {...props} value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>} /> 
        <Route exact path="/customsoftware" render={(props)=><CustomSoftware {...props} value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>} /> 
        <Route exact path="/mobileapps" render={(props)=><MobileApps {...props} value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>} /> 
        <Route exact path="/websites" render={(props)=><Websites {...props} value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>}  /> 
        <Route exact path="/revolution" render={(props)=><Revolution {...props} value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>}/> 
        <Route exact path="/about" render={(props)=><About {...props} value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>}/> 
        <Route exact path="/contact" render={(props)=><Contact {...props} value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>} /> 
        <Route exact path="/estimate" render={(props)=><Estimate {...props} value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>}/> 
      </Switch>
      <Footer value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
