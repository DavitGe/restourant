import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from '@apollo/client'

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('token')
  const cartArr = JSON.parse(localStorage.getItem('cart'))

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
      cart: cartArr ? JSON.stringify(cartArr) : '',
    },
  })

  // Call the next link in the middleware chain.
  return forward(operation)
})

const httpLink = new HttpLink({
  uri: 'https://boiling-everglades-63796.herokuapp.com/',
  opts: {
    credentials: 'include',
  },
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: new HttpLink({
  //   uri: 'http://localhost:4000/',
  //   opts: {
  //     credentials: 'include',
  //   },
  // }),
  link: authLink.concat(httpLink),
})
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
