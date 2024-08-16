import React from 'react'
import { Text as RNText } from 'react-native'

const Text = (props) => {
  return (
    <RNText 
      {...props} 
      style={[
        { fontFamily: 'Inter' },
        props.style,
      ]}
    />
  )
}

export default Text