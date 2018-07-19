import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
const rootElement = document.querySelector('#app')

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
)
