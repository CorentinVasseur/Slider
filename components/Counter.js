import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  increment,
  decrement, 
  decrement2
} from '../actions/'

const decrementupperBound = (decrement, decrement2, upperBound, graphValue) =>
  upperBound > 0 && graphValue < upperBound && graphValue >= 0 ?
    decrement(upperBound - 1)
  :
    (
      graphValue==upperBound && upperBound > 0 ?
      decrement2(upperBound - 1, graphValue - 1)
      :
      null
    )

const incrementupperBound = (increment, upperBound) =>
    increment(upperBound + 1)

const Counter = React.createClass({
  render() {
    const { graphValue, upperBound, dispatchIncrement, dispatchDecrement2, dispatchDecrement,state } = this.props
    return (
      <p>
        Upper Bound: {upperBound} <br/>
        {' '}
        <button onClick={
          () => incrementupperBound(dispatchIncrement,upperBound)}>
          +
        </button>
        {' '}
        <button onClick={
          () => decrementupperBound(dispatchDecrement, dispatchDecrement2, upperBound, graphValue)}>
          -
        </button>
      </p>
    )
  }
})

const mapStateToProps = state => (
  {
    upperBound: state.getIn(['slider','upperBound']) || 0,
    graphValue: state.getIn(['slider','graphValue']) || 0
  }
)

const mapDispatchToProps = dispatch => (
  {
    dispatchChangeGraphValue: value => dispatch(changeGraphValue(value)),    
    dispatchIncrement: value => dispatch(increment(value)),
    dispatchDecrement: value => dispatch(decrement(value)),
    dispatchDecrement2: (value1, value2) => dispatch(decrement2(value1,value2))
  }
)
const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default CounterContainer
