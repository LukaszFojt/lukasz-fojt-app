import React from 'react'

const PlaceLink = ({children, className=null}) => {

  if (!className) {
    className = 'block my-2'
  }

  className += ' font-semibold underline';

  return (
    <a
      target="_blank"
      href={'https://maps.google.com/?q=' + children}
      className={className}>
      {children}
    </a>
  )
}

export default PlaceLink