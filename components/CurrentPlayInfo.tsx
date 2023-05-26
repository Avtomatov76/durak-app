import { View, Text, Button, Dimensions } from "react-native";

export default function CurrentPlayInfo(props: any) {
  console.log("TRUMP: ", props.trump);
  console.log("GAME STATUS: ", props.gameStatus);

  //
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
  //

  if (props.gameStatus == false) return null;

  return (
    <>
      <View
        style={{
          width: "50%",
          flexDirection: "column",
          alignSelf: "center",
          borderWidth: 1,
          borderColor: "#FFFFFF",
          borderBottomStartRadius: 40,
          borderBottomEndRadius: 40,
          //marginTop: 10,
          marginBottom: 10,
          backgroundColor: "grey",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              color: "#FFFFFF",
              //marginRight: 30,
            }}
          >
            Trump: {props.trump}
          </Text>

          <Text
            style={{
              flex: 1,
              textAlign: "center",
              color: "#FFFFFF",
            }}
          >
            Turn:{" "}
            <Text
              style={{
                color: props.turn == "ai" ? "red" : "blue", //"#FFFFFF",
              }}
            >
              {props.turn}
            </Text>
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            //width: Dimensions.get("screen").width,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 5,
          }}
        >
          <View style={{ display: "flex", alignItems: "center" }}>
            {/* <Text style={{ color: "red", fontWeight: "400" }}>AI</Text> */}
            <Text style={{ color: "red", fontSize: 24, marginTop: 0 }}>
              {props.numCardsAi}
            </Text>
          </View>
          <View style={{ display: "flex" }}>
            <Text style={{ color: "#FFFFFF", fontSize: 30 }}>{props.deck}</Text>
          </View>
          <View style={{ display: "flex", alignItems: "center" }}>
            {/* <Text style={{ color: "blue", fontWeight: "400" }}>User</Text> */}
            <Text style={{ color: "blue", fontSize: 24, marginTop: 0 }}>
              {props.numCardsUser}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
