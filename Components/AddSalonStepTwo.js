import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Text from './CustomComponents/CustomText'


const AddSalonStepTwo = ({handleNext}) => {

    const handlePlaceSelected = (data, details) => {
        console.log(data.description)
        // dispatch(setSearchData({ carLocation: data.description }))
        // navigation.navigate('MainTabs', {screen: 'Search'})
    }

  return (
    <View className="min-h-full">
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
    </View>
  )
}

export default AddSalonStepTwo

