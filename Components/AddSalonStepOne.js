import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomInput from './CustomComponents/CustomInput'

const AddSalonStepOne = ({handleNext}) => {
  return (
    <View className="mt-10">
        <CustomInput 
            label={'Naziv salona'}
            placeholder={'Unesi naziv salona'}
        />

        <CustomInput 
            label={'Opis salona uli usluga'}
            placeholder={'Unesi kratak opis salona ili usluga'}
            multiline={true}
            numberOfLines={3}
            classNameCustom='mt-4'
        />

        <TouchableOpacity 
            onPress={handleNext}
            className="bg-appColorDark rounded-3xl p-4 flex flex-row justify-center items-center mt-52">
            <Text className="text-white font-bold text-lg">Dalje</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AddSalonStepOne