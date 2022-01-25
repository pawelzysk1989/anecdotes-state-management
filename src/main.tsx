import './index.css';

import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import AnecdoteDetails from './components/AnecdoteDetails';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import { AnecdoteContextParams } from './types/url_context';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Navigate to="/anecdotes" />} />
              <Route path="anecdotes">
                <Route index element={<AnecdoteList />}></Route>
                <Route
                  path={`:${AnecdoteContextParams.anecdoteId}`}
                  element={<AnecdoteDetails />}></Route>
                <Route path="create" element={<AnecdoteForm />}></Route>
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
