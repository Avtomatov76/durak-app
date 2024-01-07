import { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Alert,
  Button as Btn,
} from "react-native";

const aboutDurak = "https://en.wikipedia.org/wiki/Durak";
const durakRules = "https://www.coololdgames.com/card-games/shedding/durak/";

//const unsupportedURL = 'slack://open?team=123456';

type OpenURLButtonProps = {
  url: string;
  children: string;
};

const OpenURLButton = ({ url, children }: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <Text style={{ color: "#FFFFFF", fontWeight: "600" }} onPress={handlePress}>
      {children}
    </Text>

    // <Btn title={children} onPress={handlePress} />
  );
};

export default function CurrentPlayInfo(props: any) {
  function getTrumpSuit(trump: any) {
    let suit = "";
    switch (trump) {
      case "h":
        suit = "♥";
        break;
      case "s":
        suit = "♠";
        break;
      case "c":
        suit = "♣";
        break;
      case "d":
        suit = "♦";
        break;
      default:
        suit = "";
    }
    return suit;
  }

  const getColor = (trump: any) => {
    let color = "";
    switch (trump) {
      case "h":
        color = "red";
        break;
      case "s":
        color = "black";
        break;
      case "c":
        color = "black";
        break;
      case "d":
        color = "red";
        break;
      default:
        color = "#FFFFFF";
    }
    return color;
  };

  if (props.gameStatus == false) return null;

  return (
    <View style={styles.infoScreen}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginRight: 5,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            marginLeft: 5,
          }}
        >
          Trump:&nbsp;
        </Text>
        <Text style={{ color: getColor(props.trump) }}>
          {getTrumpSuit(props.trump)}
        </Text>
      </View>

      {/* <Text
        style={{
          flex: 1,
          textAlign: "center",
          color: "purple",
          marginLeft: 5,
        }}
      >
        Cards:&nbsp;
        <Text style={{ color: getColor(props.trump) }}>{props.deck}</Text>
      </Text> */}

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginRight: 5,
        }}
      >
        <Text style={{ color: "#FFFFFF" }}>Turn:&nbsp;</Text>
        <Text
          style={{
            color: props.turn == "ai" ? "red" : "blue", //"#FFFFFF",
            fontWeight: "600",
          }}
        >
          {props.turn.toUpperCase()}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginRight: 5,
          //alignSelf: "center",
        }}
      >
        <OpenURLButton url={durakRules}>Rules</OpenURLButton>
        {/* <Text style={{ color: "#FFFFFF" }}>Rules</Text> */}
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginRight: 5,
        }}
      >
        <OpenURLButton url={aboutDurak}>About</OpenURLButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoScreen: {
    width: "75%",
    flexDirection: "row",
    //justifyContent: "space-around", //"center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "grey", //"#FFFFFF",
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
    backgroundColor: "grey",
  },
});
