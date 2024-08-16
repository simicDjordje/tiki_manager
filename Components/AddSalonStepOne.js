import { View } from 'react-native'
import React from 'react'
import CustomInput from './CustomComponents/CustomInput'


const AddSalonStepOne = ({handleNext}) => {
  return (
    <View className="h-full">
        <CustomInput 
            label={'Naziv salona'}
            placeholder={'Unesi naziv salona'}
        />

        <CustomInput 
            label={'Opis salona ili usluga'}
            placeholder={'Unesi kratak opis salona ili usluga'}
            multiline={true}
            numberOfLines={3}
            classNameCustom='mt-4'
        />
    </View>
  )
}

export default AddSalonStepOne