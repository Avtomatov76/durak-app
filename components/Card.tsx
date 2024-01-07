import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { getImagePaths } from "../constants/imagePaths";

export default function Card(props: any) {
  let card = props.card;
  let handSize = props.size;

  const handlePress = () => {
    if (props.flag == "back") return;
    props.handlePress(card);
  };

  if (props.flag == "back")
    return <Image style={styles.cardBack} source={props.source} />;

  if (props.flag == "trump")
    return (
      <View style={styles.cardView}>
        <Image style={styles.logo} source={props.source} />
      </View>
    );

  return (
    <TouchableOpacity
      disabled={props.status == "game" ? true : false}
      style={[
        styles.container,
        {
          marginLeft: handSize > 7 ? 0 : props.status == "game" ? 0 : -30,
          transform:
            props.type == "currPlay"
              ? props.calculateAngle(props.index, "currPlay") // add custom angleSetter just for the curr play
              : props.calculateAngle(props.index, ""), //!props.index
          // ? [{ rotate: "0deg" }] // TESTING!!!!
          // : props.calculateAngle(props.index, ""), // TESTING !!!!!
        },
      ]}
      onPress={handlePress}
    >
      <Image style={styles.logo} source={getImagePaths(card)} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 63, //80,
    height: 93, //  111,
    justifyContent: "center",
    //borderWidth: 1,
    //borderColor: "#797979",
    borderRadius: 5,
    margin: 2,
    backgroundColor: "#FFFFFF",
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
  },
  logo: {
    width: 55, // 65,
    height: 80, // 96,
    alignSelf: "center",
  },
  cardBack: {
    width: 60,
    height: 90,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  cardView: {
    justifyContent: "center",
    marginRight: 40,
    marginBottom: 200,
    width: 60,
    height: 90,
    borderRadius: 5,
    transform: [{ rotate: "90deg" }],
    backgroundColor: "#FFFFFF",
    shadowOpacity: 1,
    elevation: 3,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
  },
});
