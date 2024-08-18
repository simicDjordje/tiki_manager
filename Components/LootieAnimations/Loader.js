import LottieView from 'lottie-react-native'

const LootieLoader = ({d}) => {
  return (
    <LottieView
            autoPlay
            loop
            style={{
            width: d || 50,
            height: d || 50,
            marginLeft: 'auto',
            marginRight: 'auto',
            }}
        source={require('../../assets/LootieAnimations/LoaderAnimation.json')}
    />
  )
}

export default LootieLoader