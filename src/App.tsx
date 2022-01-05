import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import Survey from './Components/Survey';
import './App.css';
import { cache } from './cache';
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider
} from '@apollo/client';
import AdminPanel from "./Components/AdminPanel";
import theme from "./utils/theme";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:3000/graphql',
});

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

export interface IAppProps {
    answers: {}[];
}
