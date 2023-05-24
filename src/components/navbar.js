import React from 'react';
import { Tabs, Tab, Dialog, Button } from '@mui/material';
import * as All from '../navigation/constants';
import {useNavigate, useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react';
import styles from ".././styles/header.module.css";
import OGY_logo from '../assets/OGY_logo.svg'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import ".././styles/muiTab.css"
import Switch from '@mui/material/Switch';

function dynamicProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const dict_paths = {
  "/": 0,
  "/dashboard" : 0,
  "/explorer": 1,
  "/governance": 2,

};


const Navbar = ({titles}) => {
  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState(true);
  let history = useNavigate();

  const goTo = (path) => {
      history(path || All.ROOT);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSwitcher = (event) => {
    setChecked(event.target.checked);
  };
  
  let location = useLocation()
  location = location.pathname
  let curPath = dict_paths[location]


  useEffect(() => {
    
    if (Object.keys(dict_paths).includes(location)) {
      setValue(dict_paths[location]);
    }
    else {
      setValue(0)
    }
    }, [curPath, location]);


  const listOfTab = []
  titles.forEach((val, ind) => {
    listOfTab.push(<Tab {...dynamicProps(ind)}  sx={{opacity:1, fontFamily: "Verdana", background: value === ind ? 'white' : 'transparent', color: value === ind ? '#161819' : '#9e9c9c', borderRadius:"23px", width: "30%"}} key = {val} label={val} onClick={()=>goTo(All[val])}/>)
    }
  )


  return (
    <div className={styles.containerParrent}>
        <div className={styles.logoContainer}>
          <img src={OGY_logo} alt="logo" />
        </div>

        <div className={styles.contentTitleBar}>
          <Tabs className={styles.titlesBar} value={value} onChange={handleChange} aria-label="simple tabs example" textColor="inherit" >
          {listOfTab}
          </Tabs>
        </div>
        
      <div className={styles.switcherContainer}>
       <Switch
        className={styles.switcher}
        checked={checked}
        onChange={handleChangeSwitcher}
        inputProps={{ 'aria-label': 'controlled' }}
        icon= {
          <div className={styles.switcherCircle}>
            <NightlightRoundIcon style={{ fontSize: 16, color: 'black' }} /> 
          </div>
        }
        checkedIcon= {
          <div className={styles.switcherCircle}>
            <NightlightRoundIcon style={{ fontSize: 16, color: 'black' }} /> 
          </div>
        }

        />

      </div>
         
    </div>
      
  );
}

export default Navbar;