import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import Card from "./Card";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export default function HandRederer(props: any) {
  // 23 --> index of 11 is the half way of the array
  let degrees = [
    -25, -23, -21, -19, -17, -15, -13, -11, -9, -7, -5, 0, 5, 7, 9, 11, 13, 15,
    17, 19, 21, 23, 25,
  ];

  const calculateAngle = (index: any, type: any) => {
    if (type == "currPlay") {
      let anglesArray = [-6, -4, -2, 0, 2, 4, 6];

      let angleIndex = Math.floor(Math.random() * 7);

      return [{ rotate: "0deg" }];
      //return [{ rotate: `${anglesArray[angleIndex]}deg` }];
    }

    let size = props.hand.length;
    let startPoint = 0;
    let rotation = (size / 2) * -5;
    //

    if (size == 1) return [{ rotate: "0deg" }];

    // if (length > 0 && length % 2 != 0) {
    //   startPoint = length - (1 / 2) * -5;
    // } else {
    // }

    let cardIndex = 11 - Math.floor(size / 2) + index;

    // return [{ rotate: `${degrees[index]}deg` }];
    return [{ rotate: `${degrees[cardIndex]}deg` }];
  };

  const handlePress = (el: any) => {
    if (!props.isUserActive) {
      console.log("Please wait for the other party to make a play!!");
      return;
    }

    if (props.turn == "user") props.handleTurn(el, "userAttack");
    if (props.turn == "ai") props.handleTurn(el, "userDefense");
  };

  if (props.hand.length == 0) return null;

  return (
    <>
      {props.hand.length > 7 ? (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width:
              Platform.OS == "web"
                ? 350 //windowDimensions.width - 80
                : screenDimensions.width - 80,
          }}
        >
          <Text style={[styles.arrow, { marginRight: 10 }]}>&#x3c;</Text>
          <ScrollView
            horizontal
            contentContainerStyle={{
              paddingVertical: 5,
              paddingLeft: 10,
              paddingRight: 10,
            }}
            style={{
              backgroundColor: "purple",
            }}
          >
            {props.hand.map((el: any, index: any) => (
              <Card
                key={index}
                type="currPlay"
                card={el}
                index={index}
                status={props.status}
                size={!props.hand ? 0 : props.hand.length}
                calculateAngle={calculateAngle}
                handlePress={handlePress}
              />
            ))}
          </ScrollView>
          <Text style={[styles.arrow, { marginLeft: 10 }]}>&#x3e;</Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: props.status == "game" ? 0 : 30,
            marginBottom: 10, // Added for testing
          }}
        >
          {props.hand.map((el: any, index: any) => (
            <Card
              key={index}
              card={el}
              index={index}
              status={props.status}
              size={!props.hand ? 0 : props.hand.length}
              type={props.type}
              calculateAngle={calculateAngle}
              handlePress={handlePress}
            />
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  arrow: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
    alignSelf: "center",
  },
});
