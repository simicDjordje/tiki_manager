import { forwardRef, useEffect, useRef, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import { View, TouchableOpacity } from "react-native";
import Text from "../CustomComponents/CustomText";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LootieLoader from "../LootieAnimations/Loader";

const barData = [
    {value: 15, label: 'Jan'}, 
    {value: 150, label: 'Feb'}, 
    {value: 39, label: 'Mar'}, 
    {value: 111, label: 'Apr'}, 
    {value: 89, label: 'Maj'}, 
    {value: 66, label: 'Jun'}, 
    {value: 69, label: 'Jul'}, 
    {value: 158, label: 'Avg'}, 
    {value: 10, label: 'Sep'}, 
    {value: 8, label: 'Okt'}, 
    {value: 49, label: 'Nov'}, 
    {value: 77, label: 'Dec'}];


const BarChartComponent = forwardRef(({chartData}, ref) => {
    return (
        <View className="-ml-2">
            <BarChart 
                scrollRef={ref}
                data={barData}
                barWidth={35}
                barBorderTopLeftRadius={4}
                barBorderTopRightRadius={4}
                hideRules={false}
                hideYAxisText={false}
                yAxisThickness={0}
                xAxisThickness={0}
                isAnimated
                maxValue={200}
                renderTooltip={(item, index) => {
                    return (
                        <View 
                            className="bg-bgSecondary border border-textPrimary p-2 rounded-xl -mb-20 -ml-20 flex flex-col justify-center items-center"
                        >
                            <Text className="text-textPrimary text-xs">Mart / 2024</Text>
                            <Text className="text-textPrimary text-xs" bold>1,230,100.00 RSD</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
})

export default BarChartComponent;
