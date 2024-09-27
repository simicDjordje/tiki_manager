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

    const {value, maxLength} = textInputProps
    

  return (
    <View className={`w-full ${classNameCustom}`}>
        <Text className={`mb-1 text-md ${isError ? 'text-red-700' : isFocused ? 'text-textPrimary' : ''}`} semi>
          {label || 'No Label'}
          <Text className="text-red-700">{isError ? !errorMessage ? ' *' : ` / ${errorMessage}` : ''}</Text>
        </Text>
        <View className={`
                p-4 rounded-lg w-full border 
                ${isError ? 'border-red-500' : isFocused ? 'border-textPrimary' : 'border-textSecondary'} 
                flex flex-row ${IconComponent && iconSide === 'right' ? 'justify-between' : 'justify-start'} items-center`}
              
            >
            {IconComponent && iconSide === 'left' && <IconComponent />}
            <TextInput 
                placeholderTextColor={'#6D6D60'}
                onFocus={()=>{setIsFocused(prev => !prev)}}
                onBlur={()=>{setIsFocused(prev => !prev)}}
                {...textInputProps}
                className={`${IconComponent ? iconSide === 'left' ? 'ml-2' : 'mr-2' : ''} flex-1`}
            />

            {IconComponent && iconSide === 'right' && <IconComponent />}
        </View>
        {maxLength && 
          <View className="flex flex-row justify-end mt-0.5 mr-2 -mb-4">
              <Text className="text-xs text-textMid">{value.length}/{maxLength}</Text>
          </View>
        }
    </View>
  )
}

export default CustomInput