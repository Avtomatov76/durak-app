import { View, Text, Pressable, StyleSheet } from "react-native";
import { Modal, Portal, Button, Provider } from "react-native-paper";

export default function LoserDisplay(props: any) {
  // after the winner/loser modal shows
  // give user option to play more or to end
  // if play/finish - end the game and reset everything expet the game count
  const resetGame = () => {
    // console.log("Resetting the game...");

    props.resetGame();
  };

  return (
    <Modal
      visible={props.showLoser}
      onDismiss={props.hideLoser}
      contentContainerStyle={styles.modalView}
    >
      <View style={{ flexDirection: "column" }}>
        {props.loser == "wash" ? (
          <Text style={styles.modalText}>No one lost! It's a wash!</Text>
        ) : (
          <>
            <Text style={styles.modalText}>And the loser is.....</Text>
            <Text style={styles.textStyle}>{props.loser}</Text>
          </>
        )}
      </View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={props.hideLoser}
      >
        <Text style={styles.btnText} onPress={resetGame}>
          Ok
        </Text>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    height: "30%",
    backgroundColor: "white",
    padding: 35,
    margin: 20,
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22,
    backgroundColor: "grey",
    //opacity: 0.5,
  },
  modalView: {
    justifyContent: "space-between",
    height: "33%",
    //width: "70%",
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "red",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
