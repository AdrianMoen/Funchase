import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import csrfService from './services/csrfService';
import config from './config';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(null);
    const [inAGame, setInAGame] = useState(false);
    const [loading, setLoading] = useState(true);
    const [csrfToken, setCsrfToken] = useState('');
    const [jwt, setJwt] = useState('');

    useEffect(() => {

      // initialize auth context, sets the loading status and csrfToken
      const initializeAuth = async () => {
        setLoading(true);
        const token = await csrfService.getCsrfToken();
	console.log("csrftoken: ", token);
        setCsrfToken(token);
        checkLoginStatus();
      }

      const checkLoginStatus = async () => {

        try {
          const response = await axios.get(`${config.API_BASE_URL}/auth/get-status/`, { withCredentials: true });
          
          // 204 response is no content, meaning not logged in
          if (response.status === 204) {
            console.log("response is 204, not logged in ");
            setUserIsLoggedIn(false);
            setLoading(false);
            return;
          }
          console.log("response is 200, user is logged in ");
          setUserIsLoggedIn(response.data.loggedIn);
          setUsername(response.data.username);
          setInAGame(response.data.inAGame);
          setLoading(false);
	  console.log("username is: ", response.data.username);
	  console.log("in a game: ", response.data.inAGame);
        } catch (error) {
          console.error("auth: login status check failed:", error);
          setUserIsLoggedIn(false);
          setLoading(false);
        }
      };
    
      initializeAuth();
    }, [userIsLoggedIn]);
    
      return (
        <AuthContext.Provider value={{ loading, username, userIsLoggedIn, inAGame, csrfToken, jwt, setLoading, setUserIsLoggedIn, setUsername, setInAGame, setCsrfToken, setJwt}}>
          {children}
        </AuthContext.Provider>
      );
    };
