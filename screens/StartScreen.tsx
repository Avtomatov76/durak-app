import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import ModalDisplay from "../modals/ModalDisplay";

export default function StartScreen(props: any) {
  const [options, setOptions] = useState(true);

  //   console.log(
  //     "What is coming from the the HOME SCREEN -------------------------- : ",
  //     props.route
  //   );

  useEffect(() => {
    if (props.route.params && props.route.params.resetGame == true)
      setOptions(true);
  }, []);

  const setSelectedDeckSize = (size: any) => {
    props.navigation.navigate("Home", {
      deckSize: size,
      status: true,
    });
  };

  const hideModal = (flag: any) => {
    if (flag == "options") setOptions(false);
  };

  return (
    <View style={{ height: "100%" }}>
      <ModalDisplay
        flag="options"
        selectDeckSize={setSelectedDeckSize}
        visible={true}
        hideModal={hideModal}
      />
    </View>
  );
}
