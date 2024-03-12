import { View } from "react-native";
import HandRenderer from "./HandRenderer";

export default function CurrentPlay(props: any) {
  const showPlayHand = () => {
    if (props.turn == "ai")
      return (
        <View>
          <View
            style={{
              alignSelf: "center",
              marginBottom: props.turn == "ai" ? 0 : -70,
              zIndex: props.turn == "ai" ? 0 : 1000,
            }}
          >
            <HandRenderer
              type="currPlay"
              flag="ai"
              status="game"
              turn={props.turn}
              hand={props.gameHand.ai}
            />
          </View>

          <View
            style={{
              marginTop: props.turn == "user" ? 0 : -82, //-70,
              zIndex: props.turn == "user" ? 0 : 1000,
            }}
          >
            <HandRenderer
              type="currPlay"
              flag="user"
              status="game"
              turn={props.turn}
              hand={props.gameHand.user}
            />
          </View>
        </View>
      );

    if (props.turn == "user")
      return (
        <View>
          <View
            style={{
              alignSelf: "center",
              marginBottom: props.turn == "user" ? -10 : -70,
              zIndex: props.turn == "user" ? 0 : 1000,
            }}
          >
            <HandRenderer
              type="currPlay"
              flag="user"
              status="game"
              turn={props.turn}
              hand={props.gameHand.user}
            />
          </View>

          <View
            style={{
              marginTop: props.turn == "ai" ? 0 : -123,
              zIndex: props.turn == "ai" ? 0 : 1000,
            }}
          >
            <HandRenderer
              type="currPlay"
              flag="ai"
              status="game"
              turn={props.turn}
              hand={props.gameHand.ai}
            />
          </View>
        </View>
      );
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
      }}
    >
      <View style={{ alignSelf: "center" }}>{showPlayHand()}</View>
    </View>
  );
}
