// import React, { useState } from "react";
// import ChatIcon from "@mui/icons-material/Chat";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// // import "./ChatBox.css"; // Import your CSS file for styling

// const ChatBox = () => {
//   const [showChatbox, setShowChatbox] = useState(false);
//   const [message, setMessage] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);

//   const toggleChatbox = () => {
//     setShowChatbox((prev) => !prev);
//   };

//   const sendUserMessage = () => {
//     if (message.trim() !== "") {
//       setChatMessages((prevMessages) => [...prevMessages, { text: message, user: true }]);
//       setMessage("");
//       setTimeout(sendChatbotResponse, 500); // Simulate chatbot response
//     }
//   };

//   const sendChatbotResponse = () => {
//     const chatbotResponse = { text: `You said: ${message}`, user: false }; // Simulated response
//     setChatMessages((prevMessages) => [...prevMessages, chatbotResponse]);
//   };

//   return (
//     <div className={`chat-container ${showChatbox ? "active" : ""}`}>
//       {showChatbox && (
//         <div className="chat-content">
//           <div className="chat-messages">
//             {chatMessages.map((msg, index) => (
//               <div key={index} className={`chat-message ${msg.user ? "user" : "bot"}`}>
//                 {msg.text}
//               </div>
//             ))}
//           </div>
//           <div className="chat-input">
//             <TextField
//               label="Type your message"
//               variant="outlined"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <Button variant="contained" color="primary" onClick={sendUserMessage}>
//               Send
//             </Button>
//           </div>
//         </div>
//       )}
//       <div className="chat-toggle">
//         <ChatIcon color="primary" onClick={toggleChatbox} />
//       </div>
//     </div>
//   );
// };

// export default ChatBox;
