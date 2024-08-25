import { View } from 'react-native'
import React, { forwardRef } from 'react'
import Text from './CustomComponents/CustomText'
import SalonCard from './SalonCard'
import Animated, { FadeInDown } from 'react-native-reanimated'

const SalonsPartHomeScreen = forwardRef(({salonsActive, salonsInactive, params}, ref) => {
    
  
  return (
    <Animated.View entering={FadeInDown}>
        {( salonsActive.length > 0 || salonsInactive.length ) > 0 && 
            <View className="mt-8">
                <Text className="text-textPrimary text-lg" bold>Tvoji saloni</Text>
                <View className="bg-textSecondary w-full h-0.5 my-2"></View>
            </View>
        }

        {salonsActive.length > 0 &&
            <View>
                <Text className="text-textPrimary mt-2">Aktivni saloni</Text>
            </View>
        }

        <View className="flex flex-row flex-wrap justify-between mt-4">
            {salonsActive?.map((salon, index) => {
                    return (
                        <SalonCard 
                            key={index}
                            salonData={salon} 
                        />
                    )
                })}
        </View>

        {salonsInactive.length > 0 &&
            <View>
                <View className={`${salonsActive.length > 0 && 'flex flex-row justify-between items-center'} mt-2`}>
                    <Text className={`text-textPrimary`}>Neaktivni saloni</Text>
                    {salonsActive.length > 0 && <View className="bg-textSecondary w-4/6" style={{height: 0.5}}></View>}
                </View>
                <Text className="text-textMid text-xs">Dodaj članove i usluge, zatim aktiviraj salon kako bi bio vidljiv mušterijama</Text>
            </View>
        }

        <View className="flex flex-row flex-wrap justify-between mt-4">
            {salonsInactive?.map((salon, index) => {
                    if(params?.newSalonCreated && params?.salonId == salon?._id){
                        return (
                            <SalonCard 
                                key={index}
                                salonData={salon} 
                                ref={ref}
                                isJustCreated={isNewSalonCreated}
                            />
                        )
                    }

                    return (
                        <SalonCard 
                            key={index}
                            salonData={salon} 
                        />
                    )
                })}
        </View>
    </Animated.View>
  )
})

export default SalonsPartHomeScreen