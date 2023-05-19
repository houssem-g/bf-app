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
  "/Dashboard/" : 0,
  "/Explorer/": 1,
  "/Governance/": 2,

};


const Navbar = ({titles}) => {
  let history = useNavigate();

  const goTo = (path) => {
    path = path.split(":")[0] || path
      history(path || All.ROOT);
  }

  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let location = useLocation()
  location = location.pathname.split("?")[0] || location.pathname
  let curPath = dict_paths[location]
  
  const handleChangeSwitcher = (event) => {
    setChecked(event.target.checked);
  };
  useEffect(() => {
    
    if (Object.keys(dict_paths).includes(location)) {
      setValue(dict_paths[location]);
    }
    else {
      setValue(false)
    }
    }, [curPath, location]);


  const listOfTab = []
  titles.forEach((val, ind) => {
    listOfTab.push(<Tab sx={{opacity:1, fontFamily: "Verdana", background: value === ind ? 'white' : 'transparent', color: value === ind ? '#161819' : '#9e9c9c', borderRadius:"23px", width: "30%"}} key = {val} label={val} {...dynamicProps(ind)} onClick={()=>goTo(All[val])}/>)
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
            <NightlightRoundIcon style={{ fontSize: 16, color: 'black' }} /> {/* Adjust the icon size and color */}
          </div>
        }
        checkedIcon= {
          <div className={styles.switcherCircle}>
            <NightlightRoundIcon style={{ fontSize: 16, color: 'black' }} /> {/* Adjust the icon size and color */}
          </div>
        }

        />

      </div>
         
    </div>
      
  );
}

export default Navbar;