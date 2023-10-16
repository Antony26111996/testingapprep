import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../Themes'
import { mockInitiatedByMe } from '../Data/Mockdata'
import Header from './Header'
import ChatIcon from "@mui/icons-material/Chat";
import  { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";



const InitiatedByMe = () => {
    const theme = useTheme()
    const colors = tokens (theme.palette.mode)
    const [showChatWidget, setShowChatWidget] = useState(false);
    const [viewLinkPopupOpen, setViewLinkPopupOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);


    const handleOpenViewLinkPopup = () => {
      setViewLinkPopupOpen(true);
    };
  
    const handleCloseViewLinkPopup = () => {
      setViewLinkPopupOpen(false);
    };




    useEffect(() => {
    axios({

      method: "post",

      url: "https://dms.missancomputer.com:8081/windream.web.api/search/Search",

      data:{
        "Mode": 1,
        "Entity": 1,
        "Conditions": [
          {
            "Column": "szCreatorName",
            "Name": "szCreatorName",
            "Value": "Namra Iqbal",
            "SearchOperator": 1,
            "AutoWildcards": false,
            "SearchRelation": 1,
            "LeftBrackets": 1,
            "RightBrackets": 0
          },
          {
            "Column": "szText26",
            "Name": "szText26",
            "Value": "NULL",
            "SearchOperator": 2,
            "AutoWildcards": false,
            "SearchRelation": 1,
            "LeftBrackets": 0,
            "RightBrackets": 0
          },
          {
            "Column": "szText26",
            "Name": "szText26",
            "Value": "Completed",
            "SearchOperator": 2,
            "AutoWildcards": false,
            "SearchRelation": 1,
            "LeftBrackets": 0,
            "RightBrackets": 1
          },
          {"Column": "dwFlags", "Value": 2048, "SearchOperator": 9}
        ],
        "Sorting": {"AttributeName": "szLongName", "Direction": 0},
        "AttributeFlags": 0,
        "Values": [
          "dwDocID",
          "szText03",
          "szText04",
          "szLongName",
          "szText26",
          "szText08",
          "dwDocID"
        ],
        "Limit": 0
      },
      headers: {

        'Content-Type': 'application/json',

        Accept: 'application/json',

        Authorization: `Bearer ${localStorage.getItem('logintoken')}`,

      },

    }).then(response =>{

      
      

      console.log(response.data.Result)

    }).catch(console.error)
 
}, []);






    const toggleChatWidget = () => {
      setShowChatWidget((prevShowChatWidget) => !prevShowChatWidget);
    };
  
    const ChatWidget = ({ onClose }) => {
      const [message, setMessage] = useState("");
      const [chatMessages, setChatMessages] = useState([]);
  
      const handleSubmit = () => {
        if (message.trim() !== "") {
          // Add the message to the chat messages list
          setChatMessages([...chatMessages, { text: message, type: "user" }]);
  
          // Clear the input field
          setMessage("");
        }
      };
      return (
        <Box
          style={{
            position: "fixed",
            margin: "50px",
            borderRadius: "10px",
            backgroundColor:
              theme.palette.mode === "dark" ? "#ffffff" : "#ffffff",
            color: theme.palette.mode === "dark" ? "#000000" : "#000000",
            bottom: 0,
            right: 0,
            width: "400px",
            height: "600px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            p={2}
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box style={{ flexGrow: 1 }}>
              <Typography
                variant="h3"
                style={{
                  margin: "-17px",
                  padding: "0",
                  backgroundColor: "#f08622",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                Annotation
                <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "#d10000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                }}
              >
                <CloseIcon />
              </IconButton>
              </Typography>
              {/* Render chat messages */}
              <Box style={{ overflowY: "auto", marginBottom: "70px" }}>
    {chatMessages.map((chatMessage, index) => (
      <Box
        key={index}
        style={{
          display: "flex",
          flexDirection: chatMessage.type === "user" ? "row-reverse" : "row",
          alignItems: "flex-start",
          marginBottom: "10px",
          marginTop: "40px",
          maxWidth: "95%", 
        }}
      >
       {chatMessage.type === "user" && (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor:
          theme.palette.mode === "dark" ? "#ffffff" : "#ffffff",
        padding: "5px", 
        borderRadius: "50%",
      }}
    >
      <img
        src="https://e7.pngegg.com/pngimages/956/309/png-clipart-minions-minions.png"
        alt="User"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          marginRight: "10px",
        }}
      />
    </div>
  )}
  
          
        <Box
          style={{
            backgroundColor:
              chatMessage.type === "user" ? "#D3D3D3" : "yellow", 
            padding: "10px", 
            borderRadius: "8px", 
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", 
            
          }}
        >
          {chatMessage.text}
        </Box>
      </Box>
    ))}
  </Box>
  
            </Box>
            {/* Input field and send button */}
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                gap: "10px",
              }}
            >
              <TextField
                placeholder="Type your message"
                variant="outlined"
                style={{
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  // backgroundColor:
                  //   theme.palette.mode === "dark" ? "#333333" : "transparent",
                  border: `1px solid ${
                    theme.palette.mode === "dark" ? "#000000" : "#000000"
                  }`,
                  borderRadius: "10px",
                  flex: 1,
                }}
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {/* Send message button */}
              <SendOutlinedIcon
              style={{ cursor: "pointer", color: "#348ecd" }}
              onClick={handleSubmit}
            />
            </Box>
            
  
          </Box>
        </Box>
      );
    };





    const columns = [
      
       
        {field: "filename", 
        headerName:"Filename",
         
         headerAlign:"left",
         align:"left",
         flex:1,
         headerClassName: "custom-header",
        cellClassName: "custom-cell",
       
        },
        {
          field: "status", 
          headerName: "Status",
          align: "left",
          flex: 0.7, 
          headerClassName: "custom-header",
           cellClassName: "custom-cell",
          renderCell: ({ row: { status } }) => {
            let backgroundColor;
           
            
            
            if (status === "On going") {
              backgroundColor = "#cc5801";
            } else if (status === "Completed") {
              backgroundColor = "green"; 
            } else if (status === "Yet to Start") {
              backgroundColor = "#d10000"; 
              
            }
            
            return (
              <Box
                width="100px"
                m="10 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={backgroundColor}
                borderRadius="4px"
              >
                
                <Typography color={colors.grey[100]} sx={{ ml: "5px", }}>
                  {status}
                </Typography>
              </Box>
            );
          },
        },
        {field: "employeename", 
        headerName:"Employee Name",
        flex:0.5, 
        headerClassName: "custom-header",
         cellClassName: "custom-cell",
         
         
    },
    {
      field: "chat",
      headerName: "Annotation",
      flex: 0.4,
      renderCell: ({ row }) => (
        <ChatIcon
          // color="primary"
         style={{ cursor: "pointer", color: "#348ecd" }}
          onClick={() => toggleChatWidget(row)}
        />
      ),
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "preview",
      headerName: "Preview",
      flex: 0.5,
      renderCell: ({ row }) => (
        <Button
          variant="text"
          onClick={handleOpenViewLinkPopup}
          style={{
            color: "#348ecd",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          View
        </Button>
      ),
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    ]




  return (
    <Box margin="20px" border="none" borderBottom="none" outline="none" >
    <Header title="Initiated By Me" subtitle= "Initiated the Projects and the Status"/>
    <Box
    margin="40px 0 0 0"
    height="100%"
    outline="none"
    display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        "& .MuiDataGrid-root": {
          // border: "none",
          outline:"none",
          width: "80%", 
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#f08622",
          borderBottom: "none",
          outline:"none",
        },
       
        '@media (max-width: 768px)': { 
          "& .MuiDataGrid-root": {
            boxShadow: theme.shadows[3], 
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            outline: "none",
            padding: "8px", 
          },
          // "& .MuiDataGrid-footerContainer": {
          //   borderTop: "none",
          //   outline:"none",
          //   backgroundColor: "#f08622",
          // },
        },
      }}

    
    >
        <DataGrid 
        rows={mockInitiatedByMe}
        columns={columns}/>



<Dialog
  open={viewLinkPopupOpen}
  onClose={handleCloseViewLinkPopup}
  maxWidth="lg"
  fullWidth
  PaperProps={{
    style: {
      backgroundColor:
        theme.palette.mode === "dark" ?  "#ffffff" : "#ffffff",
        color: theme.palette.mode === "dark" ? "#000000" : "#000000"
    },
  }}
>
  <DialogTitle>PDF POPUP</DialogTitle>
  <DialogContent style={{ height: "600px" }}>
   
    {selectedRow && (
      <iframe
        title="Preview"
        src={selectedRow.previewLink}
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseViewLinkPopup} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>






        {showChatWidget && <ChatWidget onClose={toggleChatWidget} />}
    </Box>
</Box>
  )
}

export default InitiatedByMe
