import LottieView from 'lottie-react-native'

const LootieError = ({d}) => {
  return (
    <LottieView
            autoPlay
            loop={false}
            style={{
            width: d || 50,
            height: d || 50,
            marginLeft: 'auto',
            marginRight: 'auto',
            }}
        source={require('../../assets/LootieAnimations/ErrorAnimation.json')}
    />
  )
}

export default LootieError