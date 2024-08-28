import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Text from './CustomComponents/CustomText'


const AddSalonStepTwo = ({location, setLocation, validation2}) => {
    
    const handlePlaceSelected = (data, details) => {
        console.log(data)
        setLocation(data)
    }

  return (
    <View className="min-h-full">
        <Text className={`mb-1 text-md ${validation2 && !location && 'text-red-700'}`} semi>Lokacija salona {validation2 && !location && ' / obavezno'}</Text>
        <GooglePlacesAutocomplete
            placeholder={location ? location.description : 'Pretraži adresu'}
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
                    borderColor: validation2 && !location ? '#EF4444' : '#babbb6',
                    },
            }}
            />
    </View>
  )
}

export default AddSalonStepTwo

