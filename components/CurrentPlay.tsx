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
        height: 400,
        flexDirection: "column",
        backgroundColor: "blue",
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

      <Text>AI</Text>
      <HandRenderer flag="game" hand={props.gameHand.ai} />
      <Text>User</Text>
      <HandRenderer flag="game" hand={props.gameHand.user} />
    </View>
  );
}
