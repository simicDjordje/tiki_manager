import { View } from 'react-native'
import React from 'react'
import CustomInput from './CustomComponents/CustomInput'


const AddSalonStepOne = ({name, setName, description, setDescription, validation1}) => {
  return (
    <View className="h-full">
        <CustomInput 
            label={'Naziv salona'}
            placeholder={'Unesi naziv salona'}
            value={name}
            onChangeText={(text) => setName(text)}
            isError={validation1 && !name}
            errorMessage={'obavezno'}
        />

        <CustomInput 
            label={'Opis salona ili usluga'}
            placeholder={'Unesi kratak opis salona ili usluga'}
            multiline={true}
            numberOfLines={3}
            classNameCustom='mt-4'
            value={description}
            onChangeText={(text) => setDescription(text)}
            isError={validation1 && !description}
            errorMessage={'obavezno'}
        />
    </View>
  )
}

export default AddSalonStepOne