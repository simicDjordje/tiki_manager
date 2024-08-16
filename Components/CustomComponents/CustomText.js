import React from 'react'
import { Text as RNText } from 'react-native'

const Text = (props) => {
  const isBold = props?.bold || null
  const isSemiBold = props?.semi || null
  return (
    <RNText 
      {...props} 
      style={[
        { fontFamily: isBold ? 'InterBlack' : isSemiBold ? 'InterSemi' : 'Inter' },
        props.style,
      ]}
    />
  )
}

export default Text