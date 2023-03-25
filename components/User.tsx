import { useState } from "react";
import { View, Text, Button, Dimensions } from "react-native";
import HandRenderer from "./HandRenderer";

export default function User(props: any) {
  return (
    <View
      style={{
        height: 200,
        alignItems: "center",
        backgroundColor: "red",
        justifyContent: "center",
      }}
    >
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <View style={{ marginRight: 30 }}>
          <Button color="blue" title="Attack" onPress={props.attackOpponent} />
        </View>

        <View style={{ marginRight: 30 }}>
          <Button color="orange" title="Pick Up" onPress={props.pickUpCards} />
        </View>

        <View>
          <Button color="green" title="Done" onPress={props.completeTurn} />
        </View>
      </View>
      <Text style={{ color: "#FFFFFF", marginBottom: 10, fontSize: 36 }}>
        You
      </Text>

      {!props.userHand ? null : (
        <HandRenderer
          flag="user"
          hand={props.userHand}
          updateGameHand={props.updateGameHand}
        />
      )}
    </View>
  );
}
