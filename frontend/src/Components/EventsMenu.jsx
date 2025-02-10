import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import NewEvent from "./NewEvent";


const EventsMenu = ({anchorEl,menuClose}) => {

    const menuItems = [
        { textName: "New Event" },
        { textName: "Past Events" },
      ];
    
    const [selectMenuItem, setSelectMenuItem] = useState(null)
    const itemHandler = (name)=>{
        setSelectMenuItem(name)
        menuClose()
    }

  return (
    <>
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={menuClose}
            sx={{ mt: 0.7,
            ".MuiPaper-root": { maxWidth: 200, width: "100%", borderRadius: 4, p: 1, border: "2px solid lightgray", boxShadow: "none",},
            }}
        >
        {menuItems.map((item, ind) => {
          return (
            <React.Fragment key={ind}>
              <MenuItem className="menu-item"  onClick={()=>itemHandler(item.textName)} >{item.textName}</MenuItem>
            </React.Fragment>
          );
        })}
      </Menu>

      { selectMenuItem === 'New Event' && (<NewEvent/>) }

      
    </>
  )
}

export default EventsMenu