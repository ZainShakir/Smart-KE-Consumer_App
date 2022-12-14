import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";

const Line_chart = (props) => {
  const { fact1, fact2, factor1label, factor2label } = props;

  return (
    <View>
      <LineChart
        data={fact1}
        data2={fact2}
        height={250}
        showVerticalLines
        spacing={44}
        //  initialSpacing={14}
        color1="skyblue"
        color2="orange"
        textColor1="green"
        dataPointsHeight={6}
        dataPointsWidth={6}
        dataPointsColor1="blue"
        dataPointsColor2="red"
        textShiftY={-2}
        textShiftX={-6}
        textFontSize={13}
        showFractionalValues
        maxValue={1}
        pressEnabled
        showStripOnPress
        showTextOnPress
      />
    </View>
  );
};

export default Line_chart;

const styles = StyleSheet.create({});
