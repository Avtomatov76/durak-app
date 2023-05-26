import { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { Button } from "react-native-paper";
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
      <View style={{ marginLeft: 80, marginBottom: 100 }}>
        <View
          style={{
            position: "absolute",
            width: 50,
            height: 30,
            backgroundColor: "brown",
            //marginBottom: 10,
          }}
        >
          <Text style={{ color: "#FFFFFF" }}>{props.deck[0]}</Text>
        </View>
        <View
          style={{
            position: "absolute",
            width: 30,
            height: 50,
            backgroundColor: "purple",
            marginLeft: 30,
            marginTop: -10,
          }}
        >
          <Text style={{ color: "#FFFFFF" }}>{props.deck.length}</Text>
        </View>
      </View>
      {!props.isUserActive ? null : (
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={{ marginRight: 30, borderRadius: 20 }}>
            <Button
              buttonColor="orange"
              textColor="#FFFFFF"
              onPress={props.pickUpCards}
            >
              Pick Up
            </Button>
          </View>

          <View style={{ borderRadius: 20 }}>
            <Button buttonColor="black" textColor="#FFFFFF" onPress={endTurn}>
              Pass
            </Button>
          </View>
        </View>
      )}

      {/* <Text style={{ color: "#FFFFFF", fontSize: 36 }}>You</Text> */}

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
