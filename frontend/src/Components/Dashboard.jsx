import { Event, Search, DashboardCustomize, Settings,} from "@mui/icons-material";
import { AppBar, Toolbar, Typography, TextField, InputAdornment, Stack, Button,} from "@mui/material";
import React, { useState } from "react";
import SettingsComponent from "./Settings";
import NestedDashboard from "./NestedDashboard";
import EventsMenu from "./EventsMenu";


const Dashboard = () => {
  const items = [
    { iconName: DashboardCustomize, textName: "DASHBOARD" },
    { iconName: Event, textName: "EVENTS" },
    { iconName: Settings, textName: "SETTINGS" },
  ];

  // For Settings Menu
  const [anchorEl, setanchorEl] = useState(null);
  const menuClose = () => {
    setanchorEl(null);
  };

  //Opening Appbar components
  const [seletedComponent, setSelectedComponent] = useState(null)
  const compoentHandler = (e,name)=>{
    setSelectedComponent(name)
    setanchorEl(e.currentTarget)
  }

  return (
    <>
      <AppBar position="sticky"  sx={{minWidth:375, height: "100%" }}>

        <Toolbar
          sx={{ justifyContent: "center", height: "70px", backgroundColor: "rgb(206, 240, 241)", }}
        >
          <Event sx={{ color: "red", width: 30, height: 30 }} />

          <Typography variant="h5" color="black" fontWeight={"bolder"}>EVENTS</Typography>

          <TextField
            fullWidth type="text" variant="outlined" color="error" 
            InputProps={{ startAdornment: (<InputAdornment> <Search sx={{ mr: 1 }}/> </InputAdornment>) }}
            sx={{ ml: 2, width: "70%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
                backgroundColor: "white",
                border: "none",
                "& fieldset": { border: "none",}// Default border color
              },
              "& .MuiInputBase-input": { height: 14, },
            }}/>

        </Toolbar>

        <Toolbar
          sx={{ justifyContent: "center", backgroundColor: "rgb(11, 29, 45)", height: "70px", }}
        >
          {items.map((item, ind) => {
            const ComponentName = item.iconName;
            return (
              <React.Fragment key={ind}>

                <Button disableElevation disableFocusRipple disableRipple disableTouchRipple
                  onClick={(e)=>compoentHandler(e,item.textName) }
                  sx={{ mr: 10 }}
                >
                  <Stack justifyContent={"center"} alignItems={"center"} sx={{ cursor: "pointer" }}>
                    <ComponentName sx={{ color: "white" }} />
                    <Typography fontSize={15} fontWeight={"bolder"} color="white"> {item.textName} </Typography>
                  </Stack>
                </Button>

              </React.Fragment>
            );
          })}
        </Toolbar>
      </AppBar>

      { seletedComponent === 'DASHBOARD' && <NestedDashboard/> }
      { seletedComponent === 'EVENTS' && <EventsMenu anchorEl={anchorEl} menuClose={menuClose} /> }
      { seletedComponent === 'SETTINGS' && <SettingsComponent anchorEl={anchorEl} menuClose={menuClose} /> }

    </>
  );
};

export default Dashboard;
