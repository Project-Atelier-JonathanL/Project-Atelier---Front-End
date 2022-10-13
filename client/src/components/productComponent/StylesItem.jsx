import React, { useState } from 'react';

const StylesItem = (props) => {
  const { style, handleStyles } = props
  return (
    <div className="styles">
    <img className="styles-thumbnails" src={`${style.photos[0].thumbnail_url}`} alt={`${style.name}`} onClick={(e) => {
      e.preventDefault()
      handleStyles(style)
    }}></img>
    </div>
  )
}

export default StylesItem;