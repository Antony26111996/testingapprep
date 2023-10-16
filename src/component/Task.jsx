// import React from 'react'
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../Themes";
// import { mockDataTeam } from "../Data/Mockdata";
import Header from "./Header";
// import Popup from "./Popup";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";

const Task = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [byuser, setByuser] = useState("");
  const [initiatedBy, setInitiatedBy] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [viewLinkPopupOpen, setViewLinkPopupOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  // const isLoggedIn = true;
  const currentUser = localStorage.getItem("email");
  const currentUsername = currentUser ;
  // const currentUsername = "namra";
  
  const rowsWithIds = tableData.map((row) => ({
    id: uuidv4(), 
    ...row,
  }));
  
 
  useEffect(() => {
    axios({
      method: "post",
      url: "https://dms.missancomputer.com:8081/windream.web.api/search/Search",
      data: {
        Mode: 1,
        Entity: 1,
        Conditions: [
          {
            Column: "szText03",
            Name: "szText03",
            Value:"Testuser",
            SearchOperator: 1,
            AutoWildcards: false,
            SearchRelation: 1,
            LeftBrackets: 1,
            RightBrackets: 0,
          },

          {
            Column: "blBool00",
            Name: "Completed",
            Value: null,
            SearchOperator: 1,
            AutoWildcards: false,
            SearchRelation: 1,
            LeftBrackets: 0,
            RightBrackets: 1,
          },

          {
            Column: "dwFlags",
            Value: 2048,
            SearchOperator: 9,
          },
        ],

        Sorting: {
          AttributeName: "szLongName",
          Direction: 0,
        },

        AttributeFlags: 0,
        Values: [
          "szText03",
          "szText04",
          "szLongName",
          "szText26",
          "szText02",
          "decTimeStamp00",
        ],
        Limit: 0,
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("logintoken")}`,
      },
    })
      .then((response) => {
        const apiData = response.data.Result;
        const rowsWithIds = apiData.map((row) => ({
          id: uuidv4(),
          ...row.Attributes.reduce((acc, attribute) => {
            acc[attribute.Name] = attribute.Value;
            return acc;
          }, {}),
        }));
        setTableData(rowsWithIds);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setIsUnauthorized(true);
          alert("Unauthorized: Please log in.");
        } else {
          console.error(error);
        }
      });
    }, []);
  // <div>
  //   {/* <button onClick={fetchData}>Data API</button> */}
  //   {/* {apiResponse && <pre>{JSON.stringify(apiResponse, null, 2)}</pre>} */}
  // </div>;


  const openSuccessPopup = () => {
    setSuccessPopupOpen(true);
  };


  const closeSuccessPopup = () => {
    setSuccessPopupOpen(false);
  };


  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedRow(null);
    setOpen(false);

    setStatus("");
    setInitiatedBy("");
    setByuser("");
  };

  const handleOpenViewLinkPopup = () => {
    setViewLinkPopupOpen(true);
  };

  const handleCloseViewLinkPopup = () => {
    setViewLinkPopupOpen(false);
  };

  const toggleChatWidget = () => {
    setShowChatWidget((prevShowChatWidget) => !prevShowChatWidget);
  };

  const ChatWidget = ({ onClose }) => {
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    const handleSubmit = () => {
      if (message.trim() !== "") {
        setChatMessages([...chatMessages, { text: message, type: "user" }]);

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
                    flexDirection:
                      chatMessage.type === "user" ? "row-reverse" : "row",
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
    {
      field: "szLongName",
      headerName: "Filename",
      width: 200,
      flex: 0.9,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "szText03",
      headerName: "Assigned To",
      width: 150,
      flex: 0.4,
      // valueGetter: (params) => currentUsername,
      // valueGetter: (params) => "Namra Iqbal",

      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "szText04",
      headerName: "Initiated By",
      width: 150,
      flex: 0.6,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "szText26",
      headerName: "Status",
      width: 150,
      flex: 0.6,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: ({ row: { szText26 } }) => {
        let backgroundColor;

        if (szText26 === "To Be Approved") {
          backgroundColor = "Green";
        } else if (szText26 === "To Be Reviewed") {
          backgroundColor = "#cc5801";
        } else if (status === "Yet to Start") {
          backgroundColor = "#d10000";
        }

        return (
          <Box
            width="150px"
            maxWidth="200px"
            m="10 auto"
            p="5px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor={backgroundColor}
            borderRadius="4px"
          >
            <Typography>{szText26}</Typography>
          </Box>
        );
      },
    },
    {
      field: "szText02",
      headerName: "Assigned By",
      width: 150,
      flex: 0.5,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "decTimeStamp00",
      headerName: "Assigned On",
      width: 200,
      flex: 0.6,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "assignButton",
      headerName: "Action",
      flex: 0.4,
      renderCell: (params) => (
        <Button
          variant="contained"
          style={{
            background: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            padding: "5px",
            borderRadius: "5px",
            cursor: "pointer",
            border:
              theme.palette.mode === "dark"
                ? "1px solid white"
                : "1px solid black",
          }}
          onClick={() => handleOpen(params.row)}
        >
          Assign
        </Button>
      ),
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },

    {
      field: "chat",
      headerName: "Annotation",
      flex: 0.3,
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
      flex: 0.3,
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
  ];

 

  // function handleClick() {
  //     //  const handleClick = () =>{
  //     //   handleClick
  //     //  }

  //       }

  return (
    <Box margin="20px" border="none" borderBottom="none" outline="none">
      <Header title="Task" subtitle="Manage the Task" />
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
            outline: "none",
            width: "98%",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f08622",
            borderBottom: "none",
            outline: "none",
          },

          "@media (max-width: 768px)": {
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
            //   backgroundColor:"#f08622",
            // },
          },
        }}
      >
        <div style={{ height: "750px", width: "100%", maxWidth: "95%" }}>
          <DataGrid
            rows={rowsWithIds}
            columns={columns}
            pageSize={15} // Set the maximum number of rows per page
            onColumnClick={(params) => handleOpen(params.row)}
          />
        </div>
        {selectedRow && (
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: "600px",
                maxWidth: "100%",
                height: "400px",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#ffffff" : "#2861ae",
                borderRadius: "20px",
                overflow: "hidden",
              },
            }}
          >
            <DialogTitle
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
              }}
            >
              Assign
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "#cc5902",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ minWidth: "300px" }}>
              <div style={{ display: "flex" }}>
                <div
                  style={{ flex: 1, flexBasis: "50%", paddingRight: "15px" }}
                >
                  
                  <DialogContentText
                    sx={{
                      color:
                        theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    }}
                  >
                    Status
                  </DialogContentText>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label=""
                    fullWidth
                    sx={{
                      marginRight: "5px",
                      height: "57px",
                      marginTop: "10px",
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#ffffff" : "#f9f9f9",
                      color:
                        theme.palette.mode === "dark" ? "#000000" : "#000000",
                      border: `1px solid ${
                        theme.palette.mode === "dark" ? "#000000" : "#000000"
                      }`,
                    }}
                  >
                    <MenuItem value="Alfin">Completed</MenuItem>
                    <MenuItem value="Antony Raj">Ongoing Process</MenuItem>
                    <MenuItem value="Gokul">Yet To Start</MenuItem>
                  </Select>
               
                </div>
                <div style={{ flex: 1, flexBasis: "50%" }}>
                  <DialogContentText
                    sx={{
                      color:
                        theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    }}
                  >
                    Initiated By
                  </DialogContentText>
                  <TextField
                    type="text"
                    value="Initiated by"
                    fullWidth
                    readOnly
                    style={{
                      flex: 1,
                      marginLeft: "0px",
                      marginTop: "10px",
                      padding: "0px",
                      border: `1px solid ${
                        theme.palette.mode === "dark" ? "#000000" : "#000000"
                      }`,
                      borderRadius: "5px",
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#ffffff" : "#ffffff",
                      color:
                        theme.palette.mode === "dark" ? "#000000" : "#000000", // Change this line
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "10px",
                }}
              >
                <div style={{ flexBasis: "50%", paddingRight: "15px" }}>
                  <InputLabel
                    sx={{
                      color:
                        theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    }}
                  >
                    By User
                  </InputLabel>
                  <Select
                    value={byuser}
                    onChange={(e) => setByuser(e.target.value)}
                    label="By User"
                    fullWidth
                    sx={{
                      marginRight: "5px",
                      height: "57px",
                      marginTop: "10px",
                      // paddingBottom:"15px",
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#ffffff" : "#f9f9f9",
                      color:
                        theme.palette.mode === "dark" ? "#000000" : "inherit",
                      border: `1px solid ${
                        theme.palette.mode === "dark" ? "#000000" : "#000000"
                      }`,
                    }}
                  >
                    <MenuItem value="Alfin">Alfin</MenuItem>
                    <MenuItem value="Antony Raj">Antony Raj</MenuItem>
                    <MenuItem value="Gokul">Gokul</MenuItem>
                    <MenuItem value="Barath">Barath</MenuItem>
                    <MenuItem value="Sara">Sara</MenuItem>
                    <MenuItem value="Imran">Imran</MenuItem>
                    <MenuItem value="Sruthi">Sruthi</MenuItem>
                    <MenuItem value="Aisha">Aisha</MenuItem>
                    <MenuItem value="Lokesh">Lokesh</MenuItem>
                    <MenuItem value="Jerin">Jerin</MenuItem>
                  </Select>
                </div>

                <div style={{ flexBasis: "50%" }}>
                  <InputLabel
                    sx={{
                      marginTop: "5px",
                      borderRadius: "10px",
                      color:
                        theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                    }}
                  >
                    Message
                  </InputLabel>
                  <TextField
                    margin="dense"
                    label=""
                    type="text"
                    fullWidth
                    InputProps={{
                      sx: {
                        height: "57px",
                        borderRadius: "5px",
                        marginTop: "px",
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#ffffff" : "#f9f9f9",
                        color:
                          theme.palette.mode === "dark"
                            ? theme.palette.text.black
                            : "#000000",
                        border: `1px solid ${
                          theme.palette.mode === "dark" ? "#000000" : "#000000"
                        }`,
                      },
                    }}
                  />
                </div>
              </div>

              <IconButton
                onClick={openSuccessPopup}
                sx={{
                  backgroundColor: "green",
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#57EF91",
                  },
                }}
              >
                <CheckCircleOutlineOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={handleClose}
                sx={{
                  backgroundColor: "#d10000",
                  margin: "10px",
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#E9626F",
                  },
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={openSuccessPopup}
                sx={{
                  backgroundColor: "#ACE36B",
                  marginRight: "10px",
                  marginBottom: "10px",
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#B6D886",
                  },
                }}
              >
                Assign
              </Button>

              <Dialog open={successPopupOpen} onClose={closeSuccessPopup}>
  <DialogContent
    style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color:'#000000',
      backgroundColor:
        theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff', // Adjust the colors
    }}
  >
    <CheckCircleOutlineOutlinedIcon
      style={{
        fontSize: '48px', // Adjust the size as needed
        color: '#83ce34',
        marginBottom: '10px',
      }}
    />
    <Typography variant="h6" gutterBottom>
      Successful
    </Typography>
    <Typography variant="body1">
      The task has been assigned successfully.
    </Typography>
    <Button
      onClick={() => {
        handleClose();
        closeSuccessPopup();
      }}
      color="primary"
      variant="contained"
      style={{
        marginTop: '20px',
        backgroundColor:
          theme.palette.mode === 'dark' ? '#83ce34' : '#83ce34',
        color: theme.palette.mode === 'dark' ? '#000000' : '#000000',
      }}
    >
      Done
    </Button>
  </DialogContent>
</Dialog>


            </DialogActions>
          </Dialog>
        )}
        <Dialog
          open={viewLinkPopupOpen}
          onClose={handleCloseViewLinkPopup}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            style: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#ffffff" : "#ffffff",
              color: theme.palette.mode === "dark" ? "#000000" : "#000000",
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
  );
};

export default Task;
