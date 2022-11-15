import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";
import { LinearGradient } from "expo-linear-gradient";

const Graph = () => {
  const data = [
    {
      value: 250,
      frontColor: "#66D6AE",
      gradientColor: "#009FFF",
      spacing: 2,
      label: "Jan",
    },

    { value: 240, frontColor: "#FFB714", gradientColor: "#93FCF8" },

    {
      value: 350,
      frontColor: "#66D6AE",
      gradientColor: "#009FFF",
      spacing: 2,
      label: "Feb",
    },

    { value: 300, frontColor: "#FFB714", gradientColor: "#93FCF8" },

    {
      value: 450,
      frontColor: "#66D6AE",
      gradientColor: "#009FFF",
      spacing: 2,
      label: "Mar",
    },

    { value: 400, frontColor: "#FFB714", gradientColor: "#93FCF8" },

    {
      value: 520,
      frontColor: "#66D6AE",
      gradientColor: "#009FFF",
      spacing: 2,
      label: "Apr",
    },

    { value: 490, frontColor: "#FFB714", gradientColor: "#93FCF8" },

    {
      value: 300,
      frontColor: "#66D6AE",
      gradientColor: "#009FFF",
      spacing: 2,
      label: "May",
    },

    { value: 280, frontColor: "#FFB714", gradientColor: "#93FCF8" },
    {
      value: 300,
      frontColor: "#66D6AE",
      gradientColor: "#009FFF",
      spacing: 2,
      label: "June",
    },

    { value: 580, frontColor: "#FFB714", gradientColor: "#93FCF8" },
    {
      value: 300,
      frontColor: "#66D6AE",
      gradientColor: "#009FFF",
      spacing: 2,
      label: "July",
    },

    { value: 680, frontColor: "#FFB714", gradientColor: "#93FCF8" },
    {
      value: 300,
      frontColor: "#66D6AE",
      gradientColor: "#009FFF",
      spacing: 2,
      label: "Aug",
    },

    { value: 780, frontColor: "#FFB714", gradientColor: "#93FCF8" },
    {
      value: 300,
      frontColor: "#66D6AE",
      gradientColor: "#009FFF",
      spacing: 2,
      label: "Sept",
    },

    { value: 380, frontColor: "#FFB714", gradientColor: "#93FCF8" },
    {
      value: 300,
      frontColor: "#66D6AE",
      gradientColor: "#009FFF",
      spacing: 2,
      label: "oct",
    },

    { value: 280, frontColor: "#FFB714", gradientColor: "#93FCF8" },
    {
      value: 300,
      frontColor: "#66D6AE",
      gradientColor: "#009FFF",
      spacing: 2,
      label: "Nov",
    },

    { value: 480, frontColor: "#FFB714", gradientColor: "#93FCF8" },
    {
      value: 300,
      frontColor: "#66D6AE",
      gradientColor: "#009FFF",
      spacing: 2,
      label: "Dec",
    },

    { value: 480, frontColor: "#FFB714", gradientColor: "#93FCF8" },
  ];

  return (
    <View
      style={{
        margin: 10,

        padding: 16,

        borderRadius: 20,

        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Yearly Usage History
      </Text>

      <View style={{ padding: 20, alignItems: "center" }}>
        <BarChart
          data={data}
          barWidth={7}
          initialSpacing={5}
          spacing={14}
          barBorderRadius={4}
          yAxisThickness={0}
          xAxisType={"dashed"}
          xAxisColor={"gray"}
          yAxisTextStyle={{ color: "gray" }}
          stepValue={0}
          maxValue={1000}
          noOfSections={11}
          yAxisLabelTexts={[
            "0",
            "100",
            "200",
            "300",
            "400",
            "500",
            "600",
            "700",
            "800",
            "900",
            "1000",
            "1100",
          ]}
          labelWidth={30}
          xAxisLabelTextStyle={{ color: "gray", textAlign: "center" }}
          showLine
          lineConfig={{
            color: "#F29C6E",
            thickness: 3,
            curved: true,
            hideDataPoints: true,
            shiftY: 20,
            initialSpacing: -30,
          }}
        />
      </View>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={{ color: "#66D6AE" }}>Current Year Units</Text>
        <Text style={{ color: "#FFB714" }}>Last Year Units</Text>
      </View>
    </View>
  );
};

export default Graph;

const styles = StyleSheet.create({});
