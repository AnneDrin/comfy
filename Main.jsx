import React from 'react'
import './Main.css'
// import Arrow_icon from '../Assets/arrow.png'
// import Hand_icon from '../Assets/hand.png'
import Main_pic from '../Assets/main.png'
 
const Main = () => {
  return (
    <div className='main'>
      <div className="main-left">
        <h2>New Arrivals</h2>
        <div>
            <div className='hand'>
              <p>new</p> 
            </div>
            <p>collections</p>
            <p>for everyone!</p>
        </div>
        <div className='latest-btn'>
            <div>Latest Collections</div>
            {/* <img src={Arrow_icon} alt="" /> */}
        </div>
      </div>
      <div className="main-right">
        <img src={Main_pic} alt="main" />
      </div>
    </div>
  )
}

export default Main
