import { useState } from "react";
import { View, Text, Button, Dimensions } from "react-native";
import HandRenderer from "./HandRenderer";

export default function Ai(props: any) {
  console.log("AI hand cards: ", props.aiHand);
  return (
    <View
      style={{
        //height: 200,
        //flex: 1,
        //backgroundColor: "#FFFFFF",
        alignItems: "center",
      }}
    >
      {/* <Button
        title="Go to About"
        onPress={() => {
          props.navigation.navigate("About", {
            userId: 1,
            userName: "Awesome User",
          });
        }}
      /> */}

      <Text style={{ fontSize: 36, color: "#FFFFFF" }}>AI</Text>
      <Text style={{ color: "#FFFFFF" }}>Displaying hidden card backs...</Text>

      {!props.aiHand ? null : (
        <HandRenderer
          flag="ai"
          hand={props.aiHand}
          handleTurn={props.handleTurn}
        />
      )}
    </View>
  );
}
