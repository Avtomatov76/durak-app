import { useState } from "react";
import { View, Text, Button, Dimensions } from "react-native";
import CurrentPlayInfo from "./CurrentPlayInfo";
import HandRenderer from "./HandRenderer";

export default function CurrentPlay(props: any) {
  // let suit = getTrumpSuit(props.trump);

  // function getTrumpSuit(trump: any) {
  //   let suit = "";
  //   switch (trump) {
  //     case "h":
  //       suit = "Hearts";
  //       break;
  //     case "s":
  //       suit = "Spades";
  //       break;
  //     case "c":
  //       suit = "Clubs";
  //       break;
  //     case "d":
  //       suit = "Diamonds";
  //       break;
  //     default:
  //       suit = "";
  //   }
  //   return suit;
  // }

  const showPlayHand = () => {
    if (props.turn == "user") {
      return (
        <View
        //style={{ marginRight: 2 }}
        >
          <View
            style={{
              marginBottom: props.turn == "ai" ? 10 : -50,
              zIndex: 1000,
            }}
          >
            <HandRenderer flag="ai" status="game" hand={props.gameHand.ai} />
          </View>
          <View style={{ zIndex: 50 }}>
            <HandRenderer
              flag="user"
              status="game"
              hand={props.gameHand.user}
            />
          </View>
        </View>
      );
    }

    if (props.turn == "ai") {
      return (
        <View
        //style={{ marginRight: 2 }}
        >
          <View
          //style={{ marginBottom: props.turn == "ai" ? 10 : -50 }}
          >
            <HandRenderer flag="ai" status="game" hand={props.gameHand.ai} />
          </View>
          <View style={{ marginTop: props.turn == "user" ? 10 : -50 }}>
            <HandRenderer
              flag="user"
              status="game"
              hand={props.gameHand.user}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <View
      style={{
        flex: 2,
        flexDirection: "column",
        marginTop: 50,
        //backgroundColor: "blue",
        alignSelf: "center",
      }}
    >
      <View style={{ alignSelf: "center" }}>{showPlayHand()}</View>
    </View>
  );
}
