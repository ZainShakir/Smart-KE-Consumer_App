import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";

const Bar_chart = (props) => {
  const { fact1, fact2, factor1label, factor2label } = props;

  const barData = [
    {
      value: fact1[0].value,

      label: fact1[0].label,

      spacing: 2,

      labelWidth: 40,

      labelTextStyle: { color: "gray" },

      frontColor: "#177AD5",
    },

    { value: fact2[0].value, frontColor: "#ED6665" },

    {
      value: fact1[1].value,

      label: fact1[1].label,

      spacing: 2,

      labelWidth: 40,

      labelTextStyle: { color: "gray" },

      frontColor: "#177AD5",
    },

    { value: fact2[1].value, frontColor: "#ED6665" },

    {
      value: fact1[2].value,

      label: fact1[2].label,

      spacing: 2,

      labelWidth: 40,

      labelTextStyle: { color: "gray" },

      frontColor: "#177AD5",
    },

    { value: fact2[2].value, frontColor: "#ED6665" },

    {
      value: fact1[3].value,

      label: fact1[3].label,

      spacing: 2,

      labelWidth: 40,

      labelTextStyle: { color: "gray" },

      frontColor: "#177AD5",
    },

    { value: fact2[3].value, frontColor: "#ED6665" },

    {
      value: fact1[4].value,

      label: fact1[4].label,

      spacing: 2,

      labelWidth: 40,

      labelTextStyle: { color: "gray" },

      frontColor: "#177AD5",
    },

    { value: fact2[4].value, frontColor: "#ED6665" },

    {
      value: fact1[5].value,

      label: fact1[5].label,

      spacing: 2,

      labelWidth: 40,

      labelTextStyle: { color: "gray" },

      frontColor: "#177AD5",
    },

    { value: fact2[5].value, frontColor: "#ED6665" },
    {
      value: fact1[6].value,

      label: fact1[6].label,

      spacing: 2,

      labelWidth: 40,

      labelTextStyle: { color: "gray" },

      frontColor: "#177AD5",
    },

    { value: fact2[6].value, frontColor: "#ED6665" },
  ];

  const renderTitle = () => {
    return (
      <View style={{ marginVertical: 30 }}>
        <Text
          style={{
            color: "white",

            fontSize: 20,

            fontWeight: "bold",

            textAlign: "center",
          }}
        >
          Bar Chart Analysis
        </Text>

        <View
          style={{
            flex: 1,

            flexDirection: "row",

            justifyContent: "space-evenly",

            marginTop: 24,

            backgroundColor: "yellow",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,

                width: 12,

                borderRadius: 6,

                backgroundColor: "#177AD5",

                marginRight: 8,
              }}
            />

            <Text
              style={{
                width: 60,

                height: 16,

                color: "lightgray",
              }}
            >
              {factor1label}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,

                width: 12,

                borderRadius: 6,

                backgroundColor: "#ED6665",

                marginRight: 8,
              }}
            />

            <Text
              style={{
                width: 60,

                height: 16,

                color: "lightgray",
              }}
            >
              {factor2label}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#333340",

        paddingBottom: 40,

        borderRadius: 10,
      }}
    >
      {renderTitle()}

      <BarChart
        data={barData}
        barWidth={15}
        spacing={20}
        roundedTop
        roundedBottom
        hideRules
        xAxisThickness={0}
        yAxisThickness={3}
        yAxisTextStyle={{ color: "gray" }}
        noOfSections={5}
        maxValue={1}
        showFractionalValues
      />
    </View>
  );
};

export default Bar_chart;

const styles = StyleSheet.create({});
