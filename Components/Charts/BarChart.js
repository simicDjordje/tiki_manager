import { forwardRef, useEffect, useRef, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import { View, TouchableOpacity } from "react-native";
import Text from "../CustomComponents/CustomText";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LootieLoader from "../LootieAnimations/Loader";



const BarChartComponent = forwardRef(({chartData, setSelectedMonth, maxValue}, ref) => {


    return (
        <View className="-ml-2">
            <BarChart 
                onPress={(item, index) => setSelectedMonth(index)}
                spacing={7}
                scrollRef={ref}
                data={chartData}
                barWidth={21}
                // barBorderTopLeftRadius={5}
                // barBorderTopRightRadius={5}
                barBorderRadius={5}
                hideRules={true}
                hideYAxisText={true}
                yAxisThickness={0}
                xAxisThickness={0}
                xAxisLabelTextStyle={{color: 'transparent'}}
                isAnimated
                maxValue={maxValue * 1.2}
            />
        </View>
    );
})

export default BarChartComponent;
