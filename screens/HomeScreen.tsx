import { useState, useEffect } from "react";
import { View, Dimensions, Platform } from "react-native";
import { Portal, Provider, Button } from "react-native-paper";
import { delay } from "../Config";
import { getDeck } from "../assets/cards/Deck";
import Ai from "../components/Ai";
import CurrentPlay from "../components/CurrentPlay";
import User from "../components/User";
import {
  checkForLoser,
  checkHandForMatches,
  checkIfCardIsLegal,
  checkIfValidDefense,
  getTrump,
  getTurn,
  removeCardsFromDeck,
  sortHand,
} from "../functions/playFunctions";
import ModalDisplay from "../modals/ModalDisplay";
import CurrentPlayInfo from "../components/CurrentPlayInfo";
import Deck from "../components/Deck";
import Toast from "react-native-toast-message";
import Discard from "../components/Discard";
import Sound from "react-native-sound";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

// let deck = getDeck(36);
let aiHand: any[] = [];
let userHand: any[] = [];
let trump = "";
let turn = "";
let playHandObj = {
  ai: [] as any,
  user: [] as any,
};

export default function HomeScreen(props: any) {
  const [gameCount, setGameCount] = useState(0);
  const [gameStatus, setGameStatus] = useState(props.route.params.status); //useState(false); // useState(props.route.params.status); //
  const [isUserActive, setIsUserActive] = useState(false);
  const [cardsInPlay, setCardsInPlay] = useState<any>({
    ai: [] as any,
    user: [] as any,
  });
  const [isLoser, setIsLoser] = useState("");
  const [showLoser, setShowLoser] = useState(false);
  const [options, setOptions] = useState(true);
  const [deckSize, setDeckSize] = useState(props.route.params.deckSize);
  //
  const [deck, setDeck] = useState(getDeck(deckSize));
  //
  useEffect(() => {
    startGame();
  }, []);
  //

  function resetGame() {
    console.log("Resetting the game...");

    updateCardsInPlay([], []);

    aiHand = [];
    userHand = [];
    trump = "";
    turn = "";
    playHandObj = {
      ai: [] as any,
      user: [] as any,
    };
    //deck = getDeck(deckSize); ???????????????  TESTING!!!!!!   ?????????????????????????

    setOptions(true);
    setShowLoser(false);
    setGameStatus(false);
    setIsUserActive(false);

    props.navigation.navigate("Start", {
      resetGame: true,
    });
  }

  function startGame() {
    console.log("STARTING GAME.............");
    let count = gameCount;
    count++;
    setGameCount(count);
    setGameStatus(true);

    trump = getTrump(deck, deckSize);
    dealCards();

    console.log("Starting game... Turn - ", turn);
    if (turn == "user") setIsUserActive(true);
    if (turn == "ai") beginAiTurn("");
  }

  function dealCards() {
    console.log("DEALING CARDS.............");
    let user = [];
    let ai = [];
    // deal card one at a time to each player
    for (let i = 0; i < 6; i++) {
      // remove one card for air and one for player
      ai.push(deck.pop());

      // add caards to their respective hands
      user.push(deck.pop());
    }

    turn = getTurn(turn, trump, ai, user);

    let sortedAiHand = sortHand(ai, trump, "ai"); //sortAiHand(ai, trump); //sortHand(ai, trump);
    let sortedUserHand = sortHand(user, trump, "user"); //sortAiHand(user, trump);

    aiHand = sortedAiHand.slice();
    userHand = sortedUserHand.slice();
  }

  function drawCards(flag: any) {
    console.log("Drawing cards...");
    // check if there are cards in deck
    if (deck.length == 0) console.log("No more cards left in deck!!");
    // check hands for missing cards --> if 6 ore more - skip
    if (flag == "userAttack" && userHand.length < 6) {
      userHand =
        removeCardsFromDeck(deck, userHand, trump, "user") || ([] as any);

      if (aiHand.length < 6) {
        aiHand = removeCardsFromDeck(deck, aiHand, trump, "ai") || ([] as any);
      }
    }

    if (flag == "aiAttack" && aiHand.length < 6) {
      aiHand = removeCardsFromDeck(deck, aiHand, trump, "ai") || ([] as any);

      if (userHand.length < 6) {
        userHand =
          removeCardsFromDeck(deck, userHand, trump, "user") || ([] as any);
      }
    }
  }

  async function beginAiTurn(flag: any) {
    await delay(1000);
    console.log("AI makes a move... flag : ", flag);

    if (flag == "userSkip") {
      completeAiTurn("userSkip");
      await delay(1000);
    }

    let cardMatch = null;
    // check if cards in cardsInPlay --> if there are cards - check what cards are played and look for matching value in aiHand
    let aiPlay = playHandObj.ai.slice() || ([] as any); //cardsInPlay.ai.slice() || ([] as any);
    let userPlay = playHandObj.user.slice() || ([] as any); //cardsInPlay.user.slice() || ([] as any);

    let aiHandArr = aiHand.slice() || ([] as any);
    let userHandArr = userHand.slice() || ([] as any);

    let numAiCards = aiPlay.length;
    let numUserCards = userPlay.length;

    if (numAiCards > userHand.length + numUserCards) {
      console.log("CAN'T ADD ANY MORE CARDS!!");
      getUserResponse();
    }

    console.log(
      `Turn: ${turn}, AI cards num: ${numAiCards}, AI play: ${aiPlay}`
    );
    // If aiPlay is empty, find a low card and play it
    if (numAiCards == 0 || flag == "userSkip" || flag == "userDone") {
      if (flag == "userSkip" || "userDone") {
        aiPlay = [];
        userPlay = [];
        drawCards("userAttack");
      }

      let cardToPlay = aiHandArr[0];
      aiHandArr.splice(0, 1);
      aiPlay.push(cardToPlay);

      updateCardsInPlay(aiPlay, userPlay);

      aiHand = aiHandArr.slice();

      getUserResponse();
    } else if (
      // What the HECK IS THIS???????!!!!!!!
      numAiCards == numUserCards &&
      aiHandArr.length > 0 &&
      userHandArr.length == 0
    ) {
      //
      completeAiTurn("");
      turn = "user";
      //
    } else {
      cardMatch = checkHandForMatches(
        [...aiPlay, ...userPlay],
        aiHandArr,
        trump
      );
      console.log("MATCHED CARD: ", cardMatch); //
      // if found matching cards - add one to the cardsInPlay and let user respond (un-hide user cards)
      if (cardMatch != "" && cardMatch != null) {
        // ADDED CHECKING FOR NULL!!!!!!!
        aiHandArr.splice(aiHandArr.indexOf(cardMatch), 1);

        aiHand = aiHandArr.slice();
        aiPlay.push(cardMatch);

        updateCardsInPlay(aiPlay, userPlay);

        getUserResponse();
      } else {
        completeAiTurn("");
      }
    }
  }

  //
  const showToast = () => {
    Toast.show({
      // type: "success",
      // text1: "Hello",
      // text2: "This is some something 👋",
      visibilityTime: 1000,
      topOffset:
        Platform.OS == "web"
          ? windowDimensions.height / 3
          : screenDimensions.height / 3,
      type: "error",
      text1: "!!!!",
      text2: "You cannot play this card!",
    });
  };
  //

  async function handleUserTurn(el: any, flag: any) {
    console.log("User: ", el, flag); //

    //
    let loser = checkForLoser(deck, userHand, aiHand);
    if (loser != "na") {
      endGame(loser);
      return;
    }
    //

    let aiPlay = playHandObj.ai.slice() || ([] as any); //cardsInPlay.ai.slice() || ([] as any);
    let userPlay = playHandObj.user.slice() || ([] as any); //cardsInPlay.user.slice() || ([] as any);

    let aiHandArr = aiHand.slice() || ([] as any);
    let userHandArr = userHand.slice() || ([] as any);

    let numAiCards = aiPlay.length;
    let numUserCards = userPlay.length;

    if (flag == "userAttack" && numUserCards > aiHand.length + numAiCards) {
      console.log("CAN'T ADD ANY MORE CARDS!!"); //
      completeUserTurn();
    }

    if (flag == "userAttack") {
      let isLegal = checkIfCardIsLegal(el, [...aiPlay, ...userPlay]);
      console.log("Can this card be played? ", isLegal); //

      if (isLegal) {
        userPlay.push(el);
        userHandArr.splice(userHandArr.indexOf(el), 1);

        updateCardsInPlay(aiPlay, userPlay);

        aiHand = aiHandArr.slice();
        userHand = userHandArr.slice();

        await delay(1000);
        console.log("User hand: ", userHand); //

        loser = checkForLoser(deck, userHand, aiHand);
        if (loser != "na") {
          endGame(loser);
          return;
        }

        handleAiDefence(userPlay, aiPlay, trump);
      } else {
        showToast();
        console.log("You cannot play this card!!  Please select another card!");
      }
    }

    if (flag == "userDefense") {
      let isValidDefense = checkIfValidDefense(el, aiPlay, userPlay, trump);
      console.log("Can I defend with this card? ", isValidDefense);

      if (isValidDefense) {
        let counterCardIndex = userHand.indexOf(el);
        userHand.splice(counterCardIndex, 1);
        userPlay[aiPlay.length - 1] = el;

        updateCardsInPlay(aiPlay, userPlay);
      } else {
        console.log(
          "You cannot defend with this this card!!  Please select another card!"
        );
        showToast();
        return;
      }

      beginAiTurn("");
    }
  }

  async function handleAiDefence(userPlay: any, aiPlay: any, trump: any) {
    console.log("AI Defending...");

    let loser = checkForLoser(deck, userHand, aiHand);

    if (loser != "na") {
      endGame(loser);
      return;
    }

    if (userPlay.length > aiPlay.length) {
      let index = userPlay.length - 1;
      let cardToBeat = userPlay[index];
      let cardToBeatValue = parseInt(cardToBeat.substring(0, 2));
      let cardToBeatSuit = cardToBeat[2];

      let counterCard = "";

      counterCard = aiHand.find(
        (c: any) =>
          parseInt(c.substring(0, 2)) > cardToBeatValue &&
          c[2] == cardToBeatSuit
      );

      if (!counterCard && cardToBeatSuit != trump)
        counterCard = aiHand.find((c: any) => c[2] == trump);

      console.log("Counter card: ", counterCard);

      if (!counterCard) {
        console.log("Can't find card to counter!!  Picking up cards...");
        aiHand = await pickUpCards(aiHand);
        drawCards("userAttack");

        // ADDED FOR TESTING!!!!!!!!!
        updateCardsInPlay([], []);

        loser = checkForLoser(deck, userHand, aiHand);

        if (loser != "na") {
          endGame(loser);
          return;
        }
      }

      if (counterCard) {
        let counterCardIndex = aiHand.indexOf(counterCard);
        aiHand.splice(counterCardIndex, 1);
        aiPlay[index] = counterCard;

        updateCardsInPlay(aiPlay, userPlay);
      }
    }
  }

  function completeAiTurn(flag: any) {
    let loser = checkForLoser(deck, userHand, aiHand);

    if (loser == "na" && flag == "userSkip") {
      drawCards("aiAttack");
      drawCards("userAttack");
      turn = "ai";
      updateCardsInPlay([], []);
    } else if (loser == "na" && flag == "") {
      drawCards("aiAttack");
      drawCards("userAttack");
      turn = "user";
      updateCardsInPlay([], []);
    } else endGame(loser);
  }

  async function completeUserTurn() {
    let loser = checkForLoser(deck, userHand, aiHand);

    if (loser != "na") {
      console.log("And the loser is..... : ", loser);
      endGame(loser);
      return;
    }

    //if (cardsInPlay.user.length > cardsInPlay.ai.length) {
    if (playHandObj.user.length > playHandObj.ai.length) {
      // ai pick up cardsInPlay
      aiHand = await pickUpCards(aiHand); // || [] as any
      console.log("aiHand after pickup: ", aiHand);
      drawCards("userAttack");
      updateCardsInPlay([], []);

      // turn still user's
    } //else if (cardsInPlay.ai.length == cardsInPlay.user.length) {
    else if (playHandObj.ai.length == playHandObj.user.length) {
      updateCardsInPlay([], []);
      drawCards("userAttack");
      drawCards("aiAttack");
      setIsUserActive(false);

      turn = "ai";

      console.log("Changed turn to: ", turn);
      beginAiTurn("userDone");
    }
  }

  async function pickUpCardsUser() {
    userHand = await pickUpCards(userHand);
    setIsUserActive(false);
    turn = "ai";

    console.log("Cards in play after update: ", playHandObj); //cardsInPlay);

    beginAiTurn("userSkip");
  }

  async function pickUpCards(hand: any) {
    console.log("Picking up cards...");
    // take cardsInPlay and add to aiHand
    let newHand: any[] = [];
    let combinedHand = [...playHandObj.ai, ...playHandObj.user];

    newHand = sortHand([...hand, ...combinedHand], trump, "ai");
    console.log("Cards in play before update: ", playHandObj); //cardsInPlay);

    await updateCardsInPlay([], []);

    return newHand;
  }

  function getUserResponse() {
    console.log("Awaiting user response...");

    // allows user to defend or pick cards up - set a flag
    setIsUserActive(true);
  }

  async function updateCardsInPlay(aiPlay: any, userPlay: any) {
    setCardsInPlay({
      ai: aiPlay.length == 0 ? [] : aiPlay.slice(),
      user: userPlay.length == 0 ? [] : userPlay.slice(),
    });

    playHandObj.ai = aiPlay.length == 0 ? [] : aiPlay.slice();
    playHandObj.user = userPlay.length == 0 ? [] : userPlay.slice();

    //if (turn == "ai") beginAiTurn("");
  }

  function endGame(loser: any) {
    console.log("ENDING THE GAME...");

    setGameStatus(false);
    setIsLoser(loser);
    setShowLoser(true);

    // give an option to play again
    // if ai picks cards (look for flag) - its user's turn again
    // otherwise set turn to ai and prepare for defence
    // ask if user wants to play another game
    // set turn based on loser --> winner gets 1st turn
  }

  console.log("GAME STATUS: ", gameStatus);

  //
  // const setSelectedDeckSize = (size: any) => {
  //   setDeckSize(size);
  //   //setDeck(deckSize);
  // };

  //
  const hideModal = (flag: any) => {
    if (flag == "options") setOptions(false);
    else setShowLoser(false);
  };
  //

  //
  //console.log("SELECTED OPTION on Home Screen: ", deckSize);
  //

  return (
    <Provider>
      <Portal>
        <View
          style={{
            flex: 1,
            backgroundColor: "#8DE8C2",
          }}
        >
          {!gameStatus ? (
            <View
              style={{
                marginTop: 20,
                marginBottom: 20,
                alignSelf: "center",
              }}
            >
              <Button buttonColor="red" textColor="#FFFFFF" onPress={startGame}>
                Start Game
              </Button>
            </View>
          ) : null}

          <View style={{ display: "flex", flex: 1 }}>
            <CurrentPlayInfo
              turn={turn}
              deck={deck.length}
              trump={trump}
              gameStatus={gameStatus}
              numCardsUser={!userHand ? null : userHand.length}
              numCardsAi={!aiHand ? null : aiHand.length}
            />
            <Ai
              turn={turn}
              gameStatus={gameStatus}
              aiHand={!aiHand ? null : aiHand}
              navigation={props.navigation}
            />
          </View>

          <View
            style={{
              position: "absolute",
              display: "flex",
              marginTop: windowDimensions.height / 2.5,
              alignSelf: "center",
            }}
          >
            <CurrentPlay
              deck={deck.length}
              gameHand={cardsInPlay}
              turn={turn}
              trump={trump}
              numCardsUser={!userHand ? null : userHand.length}
              numCardsAi={!aiHand ? null : aiHand.length}
            />
          </View>

          <View
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            {!gameStatus || deck.length == 0 ? null : (
              <>
                <View
                  style={{
                    position: "absolute",
                    alignSelf: "flex-start",
                  }}
                >
                  <Discard deck={deck} />
                </View>

                <View
                  style={{
                    position: "absolute",
                    alignSelf: "flex-end",
                  }}
                >
                  <Deck deck={deck} />
                </View>
              </>
            )}
            <User
              userHand={!userHand ? null : userHand}
              turn={turn}
              deck={deck}
              trump={trump}
              isUserActive={isUserActive}
              pickUpCards={pickUpCardsUser}
              completeTurn={completeUserTurn}
              handleTurn={handleUserTurn}
            />
          </View>
          <ModalDisplay
            //flag={options ? "options" : "loser"}
            flag="loser"
            deckSize={deckSize}
            //selectDeckSize={setSelectedDeckSize}
            //visible={options || showLoser}
            visible={showLoser}
            hideModal={hideModal} //
            loser={isLoser}
            resetGame={resetGame}
            startGame={() => startGame()}
            //setGameStatus={() => setGameStatus(true)}
          />
        </View>
      </Portal>
    </Provider>
  );
}
