import { View, TextInput } from 'react-native'
import React, { useState } from 'react'
import Text from './CustomText'

const CustomInput = (props) => {
    const [isFocused, setIsFocused] = useState(false)
    const { 
      classNameCustom, 
      label, 
      inputIcon: IconComponent, 
      iconSide, 
      isError,
      errorMessage,
      ...textInputProps 
    } = props


  return (
    <View className={`w-full ${classNameCustom}`}>
        <Text className={`mb-1 text-md ${isFocused ? 'text-appColor' : ''}`} semi>
          {label || 'No Label'}
          <Text className="text-red-500">{isError ? !errorMessage ? ' *' : ` / ${errorMessage}` : ''}</Text>
        </Text>
        <View className={`
                p-4 rounded-lg w-full border 
                ${isError ? 'border-red-500' : isFocused ? 'border-appColor' : 'border-textSecondary'} 
                flex flex-row ${IconComponent && iconSide === 'right' ? 'justify-between' : 'justify-start'} items-center`}
              
            >
            {IconComponent && iconSide === 'left' && <IconComponent />}
            <TextInput 
                onFocus={()=>{setIsFocused(prev => !prev)}}
                onBlur={()=>{setIsFocused(prev => !prev)}}
                {...textInputProps}
                className={`${IconComponent ? iconSide === 'left' ? 'ml-2' : 'mr-2' : ''} flex-1`}
            />

            {IconComponent && iconSide === 'right' && <IconComponent />}
        </View>
    </View>
  )
}

export default CustomInput