import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import HandRenderer from "./HandRenderer";
import { sortHand } from "../functions/playFunctions";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export default function User(props: any) {
  let hand = props.userHand; //sortHand(props.trump, props.userHand) || []; <-- fix hand not being sorted as it comes into USER
  //let sortedHand = sortHand(props.trump, hand) || []

  function endTurn() {
    props.completeTurn("userAttack");
  }

  return (
    <>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!props.isUserActive ? null : (
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginBottom: 20,
            }}
          >
            <View style={{ borderRadius: 20 }}>
              <Button
                buttonColor="red"
                textColor="#FFFFFF"
                onPress={props.pickUpCards}
              >
                Pick Up
              </Button>
            </View>

            {props.turn == "ai" ? null : (
              <View style={{ marginLeft: 20, borderRadius: 20 }}>
                <Button
                  buttonColor="black"
                  textColor="#FFFFFF"
                  onPress={endTurn}
                >
                  Done
                </Button>
              </View>
            )}
          </View>
        )}

        {/* <Text style={{ color: "#FFFFFF", fontSize: 36 }}>You</Text> */}

        {!hand ? null : (
          <View
            style={[
              styles.useHand,
              {
                borderBottomWidth:
                  hand.length == 0 ? 0 : props.turn == "user" ? 2 : 0,
              },
            ]}
          >
            <HandRenderer
              isUserActive={props.isUserActive}
              turn={props.turn}
              hand={hand}
              handleTurn={props.handleTurn}
            />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  useHand: {
    borderBottomColor: "blue", //"#FFFFFF",
    marginBottom: 20,
    paddingLeft: 2,

    //borderRadius: 8,
  },
});
