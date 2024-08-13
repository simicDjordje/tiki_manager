import LottieView from 'lottie-react-native'

const LootieCat = ({d}) => {
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
        source={require('../../assets/LootieAnimations/CatAnimation.json')}
    />
  )
}

export default LootieCat