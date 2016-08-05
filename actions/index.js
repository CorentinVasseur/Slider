import { SLIDER } from '../constants/ActionTypes'

export const changeGraphValue = (value) =>(
	{
		type: SLIDER.CHANGE_GRAPH_VALUE,
		value
	 })

export const toggleGraphAutoplay = () =>(
	{
		type: SLIDER.TOGGLE_AUTOPLAY
 	})

export const increment = (value) =>(
	{
		type: SLIDER.INCREMENT_UPPER_BOUND_VALUE,
		value: value
	})

export const decrement = (value) =>(
	{
		type: SLIDER.DECREMENT_UPPER_BOUND_VALUE,
		value: value
	})

export const decrement2 = (value1, value2) =>(
	{
		type: SLIDER.DECREMENT_UPPER_BOUND_AND_GRAPH_VALUE,
		value1: value1,
		value2: value2
	})