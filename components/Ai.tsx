import { View, Text, StyleSheet } from "react-native";
import HandRenderer from "./HandRenderer";

export default function Ai(props: any) {
  console.log(
    "------------------------------- GAME STATUS ------------------------------ : ",
    props.gameStatus
  );
  return (
    <View
      style={{
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

      {!props.aiHand ? null : (
        <>
          {props.gameStatus == false ? null : (
            <View style={styles.infoView}>
              <Text style={styles.aiAvatar}>AI</Text>
            </View>
          )}
          <View
            style={[
              styles.aiHand,
              {
                borderBottomWidth:
                  props.aiHand.length == 0 ? 0 : props.turn == "ai" ? 2 : 0,
              },
            ]}
          >
            <HandRenderer
              flag="ai"
              hand={props.aiHand}
              handleTurn={props.handleTurn}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  infoView: {
    marginTop: 10,
    marginBottom: 10,
    width: 55,
    height: 55,
    backgroundColor: "#000000",
    borderRadius: 50,
    justifyContent: "center",
  },
  aiAvatar: {
    alignSelf: "center",
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  aiHand: {
    borderColor: "red",
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 2,
    //borderRadius: 8,
    transform: [{ rotate: "180deg" }],
  },
});
