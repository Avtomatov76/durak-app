import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function HandRederer(props: any) {
  let flag = props.flag;

  const handlePress = (el: any) => {
    props.updateGameHand(el, flag);
  };

  if (!props.hand) return null;

  return (
    <View style={{ flexDirection: "row" }}>
      {props.hand.map((el: any, index: any) => (
        <TouchableOpacity
          key={index}
          disabled={props.flag == "game" ? true : false}
          style={{
            width: 50,
            height: 80,
            justifyContent: "center",
            borderWidth: 1,
            borderColor: flag == "ai" ? "#000000" : "#FFFFFF",
            borderRadius: 10,
            margin: 2,
          }}
        >
          <Text
            style={{
              color: flag == "ai" ? "#000000" : "#FFFFFF",
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
