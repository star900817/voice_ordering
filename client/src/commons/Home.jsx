import React, { createContext, useState } from 'react';
import SearchBox from '../components/SearchBox';
import HomeLine from '../components/HomeLine';
import SocialBox from '../components/SocialBox';
import UserMessageBox from '../components/UserMessageBox';
import BotMesssageBox from '../components/BotMessageBox';
import './Home.css';

export const ProductContext = createContext();

const Home = () => {
  const [message, setMessage] = useState([]);
  return (
    <ProductContext.Provider value={{ message, setMessage }}>
      <div className="home-wrapper">
        <div className="header-wrapper">
          <h1 className="header1">Voice Ordering</h1>
          <h1 className="header2">
            based on <span>AI</span>
          </h1>
        </div>
        <div className="searchbox-container">
          <SearchBox />
        </div>
        <div className="chat-container">
          {message.map((element, idx) =>
            element.user == 'USER' ? (
              <div key={idx} className="user-message-container">
                <UserMessageBox message={element.text} />
              </div>
            ) : (
              <div key={idx} className="bot-message-container">
                <BotMesssageBox message={element.text} />
              </div>
            )
          )}
        </div>
        <div className="social-container">
          <div className="homeline-container">
            <HomeLine />
          </div>
          <SocialBox />
        </div>
      </div>
    </ProductContext.Provider>
  );
};

export default Home;
