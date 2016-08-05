import immutable from 'immutable'
import { SLIDER } from '../constants/ActionTypes'

function sliderReducer (state = {}, action) {
  switch (action.type) {
    case SLIDER.INCREMENT_UPPER_BOUND_VALUE:
      return state.setIn(
        ['slider', 'upperBound'], immutable.fromJS(action.value))
    case SLIDER.DECREMENT_UPPER_BOUND_VALUE:
      return state.setIn(
        ['slider', 'upperBound'], immutable.fromJS(action.value))
    case SLIDER.DECREMENT_UPPER_BOUND_AND_GRAPH_VALUE:
      return state.setIn(
        ['slider', 'upperBound'], immutable.fromJS(action.value1))
        .setIn(
        ['slider', 'graphValue'], immutable.fromJS(action.value2))         
    case SLIDER.CHANGE_GRAPH_VALUE:
      return state.setIn(
        ['slider', 'graphValue'], immutable.fromJS(action.value))
    case SLIDER.TOGGLE_AUTOPLAY:
      return state.setIn(['slider', 'autoPlay'], !state.getIn(['slider', 'autoPlay']))
    default:
      return state
  }
}

export default sliderReducer