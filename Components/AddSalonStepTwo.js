import { View, Text, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AddSalonStepTwo = ({handleNext}) => {

    const handlePlaceSelected = (data, details) => {
        console.log(data.description)
        // dispatch(setSearchData({ carLocation: data.description }))
        // navigation.navigate('MainTabs', {screen: 'Search'})
    }

  return (
    <View className="mt-10 min-h-screen">
        <Text className="mb-1 text-md font-bold">Lokacija salona</Text>
        <GooglePlacesAutocomplete
            placeholder='Pretraži adresu'
            query={{
                key: 'AIzaSyAblphXgwdp65CIEBWrfrQdAASIcSDlr98',
                language: 'sr-Latn', // Specify the language as Serbian
                components: 'country:rs', // Restrict results to Serbia
                types: 'geocode', // Restrict results to geographical locations
            }}
            onPress={handlePlaceSelected}
            styles={{
                textInput: {
                    marginRight: 0,
                    height: 60,
                    paddingHorizontal: 20,
                    color: '#5d5d5d',
                    fontSize: 14,
                    borderRadius: 10,
                    borderWidth: 1, 
                    borderColor: '#babbb6',
                    },
            }}
            />

        <TouchableOpacity 
            onPress={handleNext}
            className="bg-appColorDark rounded-3xl p-4 flex flex-row justify-center items-center" style={{marginBottom: 300}}>
            <Text className="text-white font-bold text-lg">Dalje</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AddSalonStepTwo

