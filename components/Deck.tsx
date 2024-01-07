import { View, Text, StyleSheet } from "react-native";
import { getImagePaths } from "../constants/imagePaths";
import Card from "./Card";

export default function Deck(props: any) {
  if (props.deck.length == 1)
    return <Card flag="trump" source={getImagePaths(props.deck[0])} />;

  return (
    <View>
      <Card flag="trump" source={getImagePaths(props.deck[0])} />

      <View style={styles.deckView}>
        <Card
          flag="back"
          source={getImagePaths(props.deck[props.deck.length - 1])}
        />
        <Text style={styles.deckSize}>{props.deck.length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deckSize: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  deckView: {
    position: "absolute",
    marginLeft: 20,
    width: 60,
    height: 90,
    justifyContent: "center",
    backgroundColor: "purple",
    borderRadius: 5,
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
  },
});
