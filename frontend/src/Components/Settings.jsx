import { Menu, MenuItem } from "@mui/material";
import "../CssFiles/settings.css";
import React from "react";

const SettingsComponent = ({ anchorEl, menuClose }) => {
  const menuItems = [
    { textName: "Profile" },
    { textName: "Payment" },
    { textName: "Notifications" },
    { textName: "Personal" },
  ];

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={menuClose}
        sx={{
          mt: 0.7,
          ".MuiPaper-root": {
            maxWidth: 200,
            width: "100%",
            borderRadius: 4,
            p: 1,
            border: "2px solid lightgray",
            boxShadow: "none",
          },
        }}
      >
        {menuItems.map((item, ind) => {
          return (
            <React.Fragment key={ind}>
              <MenuItem className="menu-item" onClick={()=>menuClose()} >{item.textName}</MenuItem>
            </React.Fragment>
          );
        })}
      </Menu>
    </>
  );
};

export default SettingsComponent;
