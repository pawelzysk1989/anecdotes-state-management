import './index.css';

import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import AnecdoteDetails from './components/AnecdoteDetails';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Section from './components/Section';
import { AnecdoteContextParams } from './types/url_context';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="anecdotes">
                <Route
                  index
                  element={
                    <Section title="anecdotes">
                      <Filter />
                      <AnecdoteList />
                    </Section>
                  }></Route>
                <Route
                  path={`:${AnecdoteContextParams.anecdoteId}`}
                  element={
                    <Section>
                      <AnecdoteDetails />
                    </Section>
                  }></Route>
                <Route
                  path="create"
                  element={
                    <Section title="create new">
                      <AnecdoteForm />
                    </Section>
                  }></Route>
              </Route>
              <Route
                path="*"
                element={
                  <Section title="Wrong url">
                    <main>
                      <p>There is nothing here!</p>
                    </main>
                  </Section>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
