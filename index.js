import React from 'react'
import createLogger from 'redux-logger'
import { render } from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Provider } from 'react-redux'
import immutable from 'immutable'

import thunkMiddleware from 'redux-thunk'

import { createStore, applyMiddleware } from 'redux'

import App from './App'

import rootReducer from './reducers/Slider.js'
  
const DO_NOT_LOG = [
]

const loggerMiddleware = createLogger({
  stateTransformer: state => state && state.toJS(),
  predicate: (getState, action) =>
    !DO_NOT_LOG.includes(action.type)
})


fetch(`/api/session/state`,
  {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Credentials' : 'true',
      'Content-Type': 'application/json'
    }
  })
  .then(response =>
  response.json())
  .then(json => {
	const store = createStore(
		rootReducer,
		immutable.fromJS(json),
		applyMiddleware(
  			thunkMiddleware,
			  loggerMiddleware
		)
	)
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('app')
    )
  }
)