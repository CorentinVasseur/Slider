import React from 'react'
import ReactDOM from 'react-dom'
import TimeSlider from './components/TimeSlider'
import Counter from './components/Counter'
  
import './static/lib/font-awesome/css/font-awesome.min.css'
require('./static/css/slider.css')
class App extends React.Component {
 
  render(){
    return (
      <div>
        <TimeSlider />  
        <Counter />
      </div>
    )
  }
}

export default App
