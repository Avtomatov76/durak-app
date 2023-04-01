import { View, Text } from "react-native";

export default function LoserDisplay(props: any) {
  // after the winner/loser modal shows
  // give user option to play more or to end
  // if play/finish - end the game and reset everything expet the game count
  return (
    <View
      style={{
        alignSelf: "center",
        position: "absolute",
        marginTop: 300,
      }}
    >
      <Text style={{ fontSize: 36, color: "red", textTransform: "uppercase" }}>
        And the loser is..... {props.loser}
      </Text>
    </View>
  );
}
