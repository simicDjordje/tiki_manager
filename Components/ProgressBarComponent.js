import { View, Text } from 'react-native'
import React from 'react'
import Animated, { SequencedTransition } from 'react-native-reanimated'

const AnimatedComponentView = Animated.createAnimatedComponent(View)

const ProgressBarComponent = ({stepsCount, currentStep}) => {
   
  return (
    <View className="w-full h-4 rounded-full flex flex-row justify-between items-center">
        {Array.from({length: stepsCount}).map((_, index) => {
            const indexPlusOne = index + 1
            const first = indexPlusOne === 1
            const last = indexPlusOne === stepsCount

            return (
                <AnimatedComponentView 
                    layout={SequencedTransition}
                    className={`${indexPlusOne <= currentStep ? 'bg-appColor' : 'bg-bgSecondary'} h-full ${first && 'rounded-l-full'} ${last && 'rounded-r-full'}`}
                    style={{ width: `${100 / stepsCount}%` }}
                    key={index}
                    >
                </AnimatedComponentView>
            )
        })}
    </View>
  )
}

export default ProgressBarComponent