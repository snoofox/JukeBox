import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from "react-router-dom";
import { PlayerProvider } from './context/PlayerContext';
import { AuthProvider } from './context/AuthContext';
import App from './App';

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const theme = extendTheme({ config });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <PlayerProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </PlayerProvider>
    </ChakraProvider>
  </React.StrictMode>
);
