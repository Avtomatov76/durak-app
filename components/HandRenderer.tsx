import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function HandRederer(props: any) {
  let flag = props.flag;

  const handlePress = (el: any) => {
    if (!props.isUserActive) {
      console.log("Please wait for the other party to make a play!!");
      return;
    }

    if (props.turn == "user") props.handleTurn(el, "userAttack");
    if (props.turn == "ai") props.handleTurn(el, "userDefense");
  };

  if (!props.hand) return null;

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      {props.hand.map((el: any, index: any) => (
        <TouchableOpacity
          key={index}
          disabled={props.status == "game" ? true : false}
          style={{
            width: 50,
            height: 80,
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#FFFFFF", //flag == "ai" ? "#000000" : "#FFFFFF",
            borderRadius: 10,
            //marginLeft: -10,
            //marginRight: -10,
            margin: 2,
            marginRight: 2,
            marginLeft: props.status == "game" ? 0 : -10,
            backgroundColor: flag == "ai" ? "red" : "blue",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF", //flag == "ai" ? "#000000" : "#FFFFFF",
              fontSize: 24,
              // marginLeft: -10,
            }}
            onPress={() => handlePress(el)}
          >
            {el}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
