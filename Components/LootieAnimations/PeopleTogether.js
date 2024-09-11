import LottieView from 'lottie-react-native'

const LootiePeopleTogether = ({d}) => {
  return (
    <LottieView
            autoPlay
            loop={true}
            style={{
            width: d || 50,
            height: d || 50,
            marginLeft: 'auto',
            marginRight: 'auto',
            }}
        source={require('../../assets/LootieAnimations/PeopleTogetherAnimation.json')}
    />
  )
}

export default LootiePeopleTogether