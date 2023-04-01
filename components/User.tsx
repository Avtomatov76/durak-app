import { useState } from "react";
import { View, Text, Button, Dimensions } from "react-native";
import HandRenderer from "./HandRenderer";

export default function User(props: any) {
  console.log("USER hand cards: ", props.userHand);

  function endTurn() {
    props.completeTurn("userAttack");
  }

  return (
    <View
      style={{
        //height: 200,
        //flex: 1,
        //alignSelf: "flex-end",
        alignItems: "center",
        //backgroundColor: "red",
        justifyContent: "center",
      }}
    >
      {!props.isUserActive ? null : (
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={{ marginRight: 30, borderRadius: 20 }}>
            <Button
              color="orange"
              title="Pick Up"
              onPress={props.pickUpCards}
            />
          </View>

          <View style={{ borderRadius: 20 }}>
            <Button color="red" title="Done" onPress={endTurn} />
          </View>
        </View>
      )}

      <Text style={{ color: "#FFFFFF", marginBottom: 10, fontSize: 36 }}>
        You
      </Text>

      {!props.userHand ? null : (
        <HandRenderer
          flag="user"
          isUserActive={props.isUserActive}
          turn={props.turn}
          hand={props.userHand}
          handleTurn={props.handleTurn}
        />
      )}
    </View>
  );
}
