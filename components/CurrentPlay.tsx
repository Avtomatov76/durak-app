import { useState } from "react";
import { View, Text, Button, Dimensions } from "react-native";
import CurrentPlayInfo from "./CurrentPlayInfo";
import HandRenderer from "./HandRenderer";

export default function CurrentPlay(props: any) {
  let suit = getTrumpSuit(props.trump);

  function getTrumpSuit(trump: any) {
    let suit = "";
    switch (trump) {
      case "h":
        suit = "Hearts";
        break;
      case "s":
        suit = "Spades";
        break;
      case "c":
        suit = "Clubs";
        break;
      case "d":
        suit = "Diamonds";
        break;
      default:
        suit = "";
    }

    return suit;
  }

  return (
    <View
      style={{
        flex: 2,
        flexDirection: "column",
        marginTop: 100,
        //backgroundColor: "blue",
        alignItems: "center",
      }}
    >
      <CurrentPlayInfo
        suit={suit}
        turn={props.turn}
        deck={props.deck}
        //numCards={props.gameHand.length + props.gameHand.length || 0}
        numCardsAi={props.numCardsAi}
        numCardsUser={props.numCardsUser}
      />

      <Text style={{ color: "#FFFFFF" }}>AI</Text>
      <HandRenderer flag="game" hand={props.gameHand.ai} />
      <Text style={{ color: "#FFFFFF" }}>User</Text>
      <HandRenderer flag="game" hand={props.gameHand.user} />
    </View>
  );
}
