import { View, Text, Image, StyleSheet } from "react-native";

export default function Discard(props: any) {
  return (
    <View style={styles.cardView}>
      {/* <Image style={styles.logo} source={getImagePaths(props.deck[0])} /> */}
      <Text style={{ alignSelf: "center", color: "grey" }}>Discard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardView: {
    justifyContent: "center",
    marginLeft: 50,
    marginBottom: 200,
    width: 60,
    height: 90,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
  },
  logo: {
    alignSelf: "center",
    width: 55,
    height: 80,
  },
  cardBack: {
    width: 60,
    height: 90,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
});
