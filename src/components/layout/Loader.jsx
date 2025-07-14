import React from 'react'

const Loader = () => {
  return (
    <div className="loader">
  <div className="cable-segment" style={{height: "50px"}}></div>
  <div className="cable-segment" style={{height: "70px"}}></div>
  <div className="cable-segment" style={{height: "40px"}}></div>
  <div className="cable-segment" style={{height: "60px"}}></div>
  <div className="cable-segment"></div>
</div>
  )
}

export default Loader;