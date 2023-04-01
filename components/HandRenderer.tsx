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
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {props.hand.map((el: any, index: any) => (
        <TouchableOpacity
          key={index}
          disabled={props.flag == "game" ? true : false}
          style={{
            width: 50,
            height: 80,
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#FFFFFF", //flag == "ai" ? "#000000" : "#FFFFFF",
            borderRadius: 10,
            marginLeft: -10,
            marginRight: -10,
            backgroundColor: "blue",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF", //flag == "ai" ? "#000000" : "#FFFFFF",
              fontSize: 24,
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
