import LottieView from 'lottie-react-native'

const LootieSuccess = ({d, white}) => {
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
        source={white ? require('../../assets/LootieAnimations/LootieSuccessWhite.json') : require('../../assets/LootieAnimations/SuccessAnimation.json')}
    />
  )
}

export default LootieSuccess