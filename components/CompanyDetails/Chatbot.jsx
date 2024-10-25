import { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from 'styled-components';

import { CloseOutlined, MessageOutlined } from "@ant-design/icons";
import Styles from "./CompanyDetails.module.css";
import AiResponse from "./AiResponse"; // Assuming AiResponse is in the same folder
// all available props
const theme = {
  background: '#f5f5fc',
  fontFamily: 'Figtree',


  headerFontSize: '15px',
  botBubbleColor: '#3b3bb6',
  botFontColor: '#fff',
  userBubbleColor: '#3b3bb6',
  userFontColor: '#fff',


};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // Store user and AI messages

  const handleToggle = () => {
    setOpen(!open);
  };

  // Add message to chat history
  const handleMessage = (message, isAiResponse = false) => {
    setChatHistory((prev) => [
      ...prev,
      { message, isAiResponse },
    ]);
  };

  const steps = [
    {
      id: "1",
      message: "Hello, how can I help you?",
      trigger: "2", // Wait for user input
    },
    {
      id: "2",
      user: true,
      trigger: "3", // After user input, trigger AiResponse
      // Save user's message to chat history
      validator: (message) => {
        handleMessage(message, false);
        return true;
      },
    },
    {
      id: "3",
      component: (
        <AiResponse
          // Pass the response from the AI to be stored
          handleMessage={(response) => handleMessage(response, true)}
        />
      ),
      waitAction: true, // Wait for the API response
      trigger: "2", // Go back to asking for user input again
    },
  ];

  return (
    <>

      <div onClick={handleToggle} className={Styles.chatbot}>
        <MessageOutlined />
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "30px",
          zIndex: 9999,
          transformOrigin: "bottom right",
          transform: open ? "scale(1)" : "scale(0)",
          opacity: open ? 1 : 0,
          transition: "transform 0.3s ease, opacity 0.3s ease",
          pointerEvents: open ? "auto" : "none",
        }}
      >
      <ThemeProvider theme={theme}>

        <ChatBot
          steps={steps}
          floating={false}
          speechSynthesis={{ enable: false, lang: "en" }}
          hideBotAvatar={true}
          hideUserAvatar={true}
          // bubbleStyle={{
          //   backgroundColor: "#3b3bb6",
          //   color: "#fff",
          //   fontFamily: "Figtree",
          //   fontSize: "0.94rem",
          // }}
          headerComponent={
            <div className={Styles.chatbotHeader}>
              <CloseOutlined
                onClick={handleToggle}
                style={{
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  color: "#fff",
                }}
              />
            </div>
          }
          
          inputStyle={{
            fontSize: "0.9rem", // Increase the font size for better readability
            // height: "60px", // Set a higher input field
            overflow: "scroll", // Allow scrolling when text exceeds height

          }}


          inputAttributes={{
            placeholder: "Type your message here...",
          }}
          

          enableSmoothScroll={true}

          
          style={{ width: "500px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
        />
      </ThemeProvider>
      </div>

    </>
  );
};

export default Chatbot;
