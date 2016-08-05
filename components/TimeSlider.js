import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Input } from 'react-bootstrap'

import {
  changeGraphValue,
  toggleGraphAutoplay
} from '../actions/'

const decrementgraphValue = (changeGraphValue, graphValue) =>
  graphValue > 0 ?
    changeGraphValue(graphValue - 1)
  :
    null

const incrementGraphValue = (changeGraphValue, graphValue, upperBound)  =>
  graphValue < upperBound ?
    changeGraphValue(graphValue + 1)
  :
    null

const AUTOPLAY_TIMESTEP = 1000

let autoplayVar = null

const startAutoplay = ({
  dispatchToggleGraphAutoplay, dispatchChangeGraphValue, graphValue, autoplay
}, upperBound) => () => {
  dispatchToggleGraphAutoplay()
  /*eslint-disable no-var*/
  var memorizeGraphValue = graphValue
  autoplayVar = setInterval(
    function() {
      incrementGraphValue(dispatchChangeGraphValue, memorizeGraphValue, upperBound)
      memorizeGraphValue += 1
    },
    AUTOPLAY_TIMESTEP)
  setTimeout(
    () => autoplay ?
      clearInterval(autoplayVar)
    :
      null,
    (upperBound - graphValue)*AUTOPLAY_TIMESTEP
  )
}

const stopAutoplay = ({dispatchToggleGraphAutoplay}) => () => {
  clearInterval(autoplayVar)
  dispatchToggleGraphAutoplay()
}
const TimeSlider = React.createClass({
  render() {
    const { graphValue, upperBound, dispatchChangeGraphValue, autoplay} = this.props
     /*latestInput.getIn(['graph', 'global', 'upperBound'])*/
    return (
      <div className="graph-box time-slider">
        <div className="graph-box-header">
          Time Slider
        </div>
        <div className="graph-box-content">
          {graphValue} 
          <input type="range"
            min={0} max={upperBound}
            value={graphValue}
            onChange={e => dispatchChangeGraphValue(parseInt(e.target.value))}/>
          <div className="buttons-panel">
            <i className="fa fa-backward" onClick={
              () => decrementgraphValue(dispatchChangeGraphValue, graphValue)}/>
            <i className={'fa ' + (autoplay ? 'fa-pause' : 'fa-play')}
              onClick={
                autoplay ?
                  stopAutoplay(this.props)
                :
                  startAutoplay(this.props, upperBound)
              }/>
            <i className="fa fa-forward" onClick={
              () => incrementGraphValue(dispatchChangeGraphValue, graphValue, upperBound)
            }/>
          </div>
        </div>
      </div>
    )
  }
})

const mapStateToProps = state => (
  {
    graphValue: state.getIn(['slider', 'graphValue']) || 0,
    autoplay: state.getIn(['slider', 'autoplay']) || false,
    upperBound: state.getIn(['slider','upperBound']) || 0
  }
)

const mapDispatchToProps = dispatch => (
  {
    dispatchChangeGraphValue: value => console.log(changeGraphValue(value)) || dispatch(changeGraphValue(value)),
    dispatchToggleGraphAutoplay: () => console.log(toggleGraphAutoplay()) ||dispatch(toggleGraphAutoplay())
  }
)
const TimeSliderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeSlider)

/*TimeSliderContainer.propTypes = {
  resultData: PropTypes.object.isRequired
}
*/
export default TimeSliderContainer
