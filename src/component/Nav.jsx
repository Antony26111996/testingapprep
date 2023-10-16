import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../Themes";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";
import { Login } from "./Login";

const Nav = (props) => {
  const theme = useTheme();
  const {handleLogout}= props

  const colorMode = useContext(ColorModeContext);

  
  const handleLockClick = () => {
   
    localStorage.clear();
    window.location.href = "/";
  };
  
  const handleLockAndLogout = () => {
    handleLockClick();
    handleLogout();
    handleLogout()
  };
  
  

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
    >
      {/* {search} */}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor={theme.palette.mode === "dark" ? "#202121" : "#e0e0e0"}
        borderRadius="50px"
        flex="0.3"
        sx={{
          border: `1px solid ${
            theme.palette.mode === "dark" ? "#ffffff" : "#e0e0e0"
          }`,
        }}
      >
        <InputBase
          sx={{
            ml: "10px !important",
            flex: 10,
            color: theme.palette.mode === "dark" ? "#ffffff" : "black",
          }}
        />
        <IconButton type="button" sx={{ padding: 1 }}>
          <SearchOutlinedIcon />
        </IconButton>
      </Box>

      {/* {icons} */}
      <Box display="flex">
      <IconButton onClick={handleLockAndLogout}>
  <LockIcon />
</IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsActiveOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ755fbHa7LmPbv-XoHtnEl6sW2doABnBoLpLCfyAtNninbqkvJfPWruXBjmFZZBhd-7w&usqp=CAU"
            alt="Custom Icon"
            style={{ cursor: "pointer", borderRadius: "50%" }}
            height="25px"
            width="25px"
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Nav;










