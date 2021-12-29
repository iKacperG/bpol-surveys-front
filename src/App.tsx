import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import Survey from '../src/Survey';
import './App.css';
import { cache } from './cache';
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider
} from '@apollo/client';
import AdminPanel from "./AdminPanel";
import theme from "./utils/theme";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:3000/graphql',
});


export interface AppProps {
    answers: {}[];
}

function App() {
    return (
      <ApolloProvider client = {client}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<AdminPanel />}/>
                      <Route path="/:id" element={<Survey />}/>
                  </Routes>
              </BrowserRouter>
          </ThemeProvider>
        </StyledEngineProvider>
      </ApolloProvider>
  );
}

export default App;
