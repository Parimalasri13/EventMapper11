import React, { useState } from 'react';
import './Slokas.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatHistories, setChatHistories] = useState([]);
  const [activeChat, setActiveChat] = useState(0);
  const [theme, setTheme] = useState('light');






  const handleSend = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { type: 'user', text: input }];
      setMessages(newMessages);
      setInput('');
      console.log('Sending message:', input);
  
      try {
        // Sending the input value to the backend
        const response = await axios.post('https://eventmapper11.onrender.com/data', { input });
  
        const data = response.data;
        console.log('Data:', data);
  
        if (data.success && data.events && data.events.length > 0) {
          // Create a response message for each event found
          const botResponses = data.events.map((event) => ({
            type: 'bot',
            text: `Event Name: ${event.name}, Location: ${event.location}, Date: ${event.date}, Link: ${event.link}`
          }));
  
          // Set messages with all bot responses
          setMessages((prevMessages) => [...prevMessages, ...botResponses]);
        } else {
          const botResponse = { type: 'bot', text: "No events found" };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        }
      } catch (error) {
        console.error('Error retrieving event:', error);
        const errorResponse = { type: 'bot', text: "use only commands : Artificial Intelligence,Academics,Cyber Security,Machine Learning,Data Science,IoT,Edge Computing,BlockChain,Bioengineering " };
        setMessages((prevMessages) => [...prevMessages, errorResponse]);
      }
    }
  };
  
  

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`https://eventmapper11.onrender.com/chat-history/${localStorage.getItem('userId')}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setChatHistories([data.messages]); // Assuming one chat session for now
          setMessages(data.messages);
        } else {
          console.error('Failed to fetch chat history:', data.message);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };
  
    fetchChatHistory();
  }, []);
    

 
  const handleInputChange = (e) => {
    setInput(e.target.value);
   
    
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleNewChat = () => {
    setChatHistories((prevHistories) => [...prevHistories, []]);
    setActiveChat(chatHistories.length);
    setMessages([]);
  };

  const handleChatSelection = (index) => {
    setActiveChat(index);
    setMessages(chatHistories[index]);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="chat_container">
      <div className="chat_sidebar">
        <button onClick={handleNewChat} className="new_chat_button">New Chat</button>
        {chatHistories.map((history, index) => (
          <div
            key={index}
            className={`chat_history_item ${activeChat === index ? 'active' : ''}`}
            onClick={() => handleChatSelection(index)}
          >   
            Chat {index + 1}
          </div>
        ))}
      </div>
      <div className="chat_body">
        <div className="chat_bot_container">
          <div className="chat_bot_header">
            Chatbot
            <div className="theme_switch">
              {theme === 'light' ? (
                <i className="fas fa-moon"></i>
              ) : (
                <i className="fas fa-sun"></i>
              )}
              <label className="switch">
                <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          <div className="chat_bot_messages">
            {messages.map((message, index) => (
              <div key={index} className={`chat_bot_message ${message.type}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat_bot_input_container">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}

              onKeyPress={handleKeyPress}
              placeholder="Type your question here..."
              className="chat_bot_input"
            />
            <button onClick={handleSend} className="chat_bot_send_button">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
