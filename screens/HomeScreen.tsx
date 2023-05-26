import { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { Modal, Portal, Provider, Button } from "react-native-paper";
import { delay } from "../Config";
import { getDeck } from "../assets/cards/Deck";
import Ai from "../components/Ai";
import CurrentPlay from "../components/CurrentPlay";
import User from "../components/User";
import { sortAiHand } from "../functions/aiFunctions";
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
import LoserDisplay from "../modals/LoserDisplay";
import CurrentPlayInfo from "../components/CurrentPlayInfo";

let deck = getDeck();
let aiHand: any[] = [];
let userHand: any[] = [];
let trump = "";
let turn = "";
let playHandObj = {
  ai: [] as any,
  user: [] as any,
};

console.log("Initial deck: ", deck);

export default function HomeScreen(props: any) {
  const [gameCount, setGameCount] = useState(0);
  const [gameStatus, setGameStatus] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);
  const [cardsInPlay, setCardsInPlay] = useState<any>({
    ai: [] as any,
    user: [] as any,
  });
  const [isLoser, setIsLoser] = useState("");
  const [showLoser, setShowLoser] = useState(false);

  function resetGame() {
    console.log("Resetting the game...");

    deck = getDeck();
    aiHand = [];
    userHand = [];
    trump = "";
    turn = "";
    playHandObj = {
      ai: [] as any,
      user: [] as any,
    };

    setShowLoser(false);
    startGame();
  }

  function startGame() {
    let count = gameCount;
    count++;
    setGameCount(count);
    setGameStatus(true);

    trump = getTrump(deck);
    dealCards();

    console.log(turn);
    if (turn == "user") setIsUserActive(true);
    if (turn == "ai") beginAiTurn("");
  }

  function dealCards() {
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

    let sortedAiHand = sortHand(ai, trump);
    let sortedUserHand = sortAiHand(user, trump);

    aiHand = sortedAiHand.slice();
    userHand = sortedUserHand.slice();
  }

  function drawCards(flag: any) {
    console.log("Drawing cards...");
    // check if there are cards in deck
    if (deck.length == 0) console.log("No more cards left in deck!!");
    // check hands for missing cards --> if 6 ore more - skip
    if (flag == "userAttack" && userHand.length < 6) {
      userHand = removeCardsFromDeck(deck, userHand, trump) || ([] as any);

      if (aiHand.length < 6) {
        aiHand = removeCardsFromDeck(deck, aiHand, trump) || ([] as any);
      }
    }

    if (flag == "aiAttack" && aiHand.length < 6) {
      aiHand = removeCardsFromDeck(deck, aiHand, trump) || ([] as any);

      if (userHand.length < 6) {
        userHand = removeCardsFromDeck(deck, userHand, trump) || ([] as any);
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

    console.log("Turn: ", turn);
    console.log("Num ai cards: ", numAiCards);
    console.log("AI play: ", aiPlay);
    // If aiPlay is empty, find a low card and play it
    if (numAiCards == 0 || flag == "userSkip" || flag == "userDone") {
      if (flag == "userSkip" || "userDone") {
        aiPlay = [];
        userPlay = [];
      }
      //console.log("Turn: ", turn);
      let cardToPlay = aiHandArr[0];
      aiHandArr.splice(0, 1);
      console.log("--- card to play --- ", cardToPlay);

      aiPlay.push(cardToPlay);

      updateCardsInPlay(aiPlay, userPlay);

      aiHand = aiHandArr.slice();

      getUserResponse();
    } else if (
      numAiCards == numUserCards &&
      aiHandArr.length > 0 &&
      userHandArr.length == 0
    ) {
      completeAiTurn("");
    } else {
      cardMatch = checkHandForMatches(
        [...aiPlay, ...userPlay],
        aiHandArr,
        trump
      );
      console.log("MATCHED CARD: ", cardMatch);
      // if found matching cards - add one to the cardsInPlay and let user respond (un-hide user cards)
      if (cardMatch != "") {
        aiPlay.push(cardMatch);

        updateCardsInPlay(aiPlay, userPlay);

        aiHandArr.splice(aiHandArr.indexOf(cardMatch), 1);

        aiHand = aiHandArr.slice();

        getUserResponse();
      } else {
        completeAiTurn("");
      }
    }
  }

  async function handleUserTurn(el: any, flag: any) {
    console.log("User: ", el, flag);

    let aiPlay = playHandObj.ai.slice() || ([] as any); //cardsInPlay.ai.slice() || ([] as any);
    let userPlay = playHandObj.user.slice() || ([] as any); //cardsInPlay.user.slice() || ([] as any);

    let aiHandArr = aiHand.slice() || ([] as any);
    let userHandArr = userHand.slice() || ([] as any);

    let numAiCards = aiPlay.length;
    let numUserCards = userPlay.length;

    if (flag == "userAttack" && numUserCards > aiHand.length + numAiCards) {
      console.log("CAN'T ADD ANY MORE CARDS!!");
      completeUserTurn();
    }

    if (flag == "userAttack") {
      let isLegal = checkIfCardIsLegal(el, [...aiPlay, ...userPlay]);
      console.log("Can this card be played? ", isLegal);

      if (isLegal) {
        userPlay.push(el);
        userHandArr.splice(userHandArr.indexOf(el), 1);

        updateCardsInPlay(aiPlay, userPlay);

        aiHand = aiHandArr.slice();
        userHand = userHandArr.slice();

        await delay(1000);
        console.log("User hand: ", userHand);
        handleAiDefence(userPlay, aiPlay, trump);
      } else {
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
        return;
      }

      beginAiTurn("");
    }
  }

  async function handleAiDefence(userPlay: any, aiPlay: any, trump: any) {
    console.log("AI Defending...");
    console.log("AI hand: ", aiHand);

    console.log("User Play: ", userPlay);
    console.log("AI Play: ", aiPlay);

    if (userPlay.length > aiPlay.length) {
      let index = userPlay.length - 1;
      let cardToBeat = userPlay[index];
      let cardToBeatValue = parseInt(cardToBeat.substring(0, 2));
      let cardToBeatSuit = cardToBeat[2];

      console.log("Card to beat: ", cardToBeat);
      console.log("Card to beat value: ", cardToBeatValue);
      console.log("Card to beat suit : ", cardToBeatSuit);

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

    if (loser == "na") {
      // discard cardsInPlay
      updateCardsInPlay([], []);
      drawCards("aiAttack");
      // set turn to "user"
      flag == "userSkip" ? (turn = "ai") : (turn = "user");
    } else endGame(loser);
  }

  async function completeUserTurn() {
    console.log(turn);
    console.log("User cards in play size: ", playHandObj.user.length); //cardsInPlay.user.length);
    console.log("AI cards in play size: ", playHandObj.ai.length); //cardsInPlay.ai.length);
    let loser = checkForLoser(deck, userHand, aiHand);
    if (loser != "na") {
      console.log("And the loser is..... : ", loser);
      endGame(loser);
    }

    //if (cardsInPlay.user.length > cardsInPlay.ai.length) {
    if (playHandObj.user.length > playHandObj.ai.length) {
      // air pick up cardsInPlay
      aiHand = await pickUpCards(aiHand); // || [] as any
      console.log("aiHand after pickup: ", aiHand);
      drawCards("userAttack");
      updateCardsInPlay([], []);

      // turn still user's
    } //else if (cardsInPlay.ai.length == cardsInPlay.user.length) {
    else if (playHandObj.ai.length == playHandObj.user.length) {
      updateCardsInPlay([], []);
      drawCards("userAttack");
      setIsUserActive(false);

      turn = "ai";

      console.log("Changed turn to: ", turn);
      beginAiTurn("userDone");
    }
  }

  async function pickUpCardsUser() {
    userHand = await pickUpCards(userHand);
    turn = "ai";

    console.log("Cards in play after update: ", playHandObj); //cardsInPlay);
    setIsUserActive(false);
    beginAiTurn("userSkip");
  }

  async function pickUpCards(hand: any) {
    console.log("Picking up cards...");
    // take cardsInPlay and add to aiHand
    let newHand: any[] = [];
    // let combinedHand = [...cardsInPlay.ai, ...cardsInPlay.user];
    let combinedHand = [...playHandObj.ai, ...playHandObj.user];

    newHand = sortAiHand([...hand, ...combinedHand], trump);
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
  }

  function endGame(loser: any) {
    console.log("ENDING THE GAME...");

    setIsLoser(loser);
    setShowLoser(true);
    setGameStatus(false);
    // give an option to play again
    // if ai picks cards (look for flag) - its user's turn again
    // otherwise set turn to ai and prepare for defence

    // set cardsInPlay to 0
    // set both hands to 0
    // ask if user wants to play another game
    // set turn based on loser --> winner gets 1st turn
  }

  return (
    <Provider>
      <Portal>
        <View
          style={{
            flex: 1,
            backgroundColor: "green",
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

          <View style={{ flex: 1, justifyContent: "space-evenly" }}>
            <CurrentPlayInfo
              turn={turn}
              deck={deck.length}
              trump={trump}
              gameStatus={gameStatus}
              //numCards={props.gameHand.length + props.gameHand.length || 0}
              numCardsUser={userHand.length}
              numCardsAi={aiHand.length}
            />
            <Ai
              gameStatus={gameStatus}
              aiHand={aiHand}
              navigation={props.navigation}
            />
            <CurrentPlay
              deck={deck.length}
              gameHand={cardsInPlay}
              turn={turn}
              trump={trump}
              numCardsUser={userHand.length}
              numCardsAi={aiHand.length}
            />
            <User
              userHand={userHand}
              turn={turn}
              deck={deck}
              isUserActive={isUserActive}
              pickUpCards={pickUpCardsUser}
              completeTurn={completeUserTurn}
              handleTurn={handleUserTurn}
            />
          </View>
          <LoserDisplay
            showLoser={showLoser}
            hideLoser={() => setShowLoser(false)}
            loser={isLoser}
            resetGame={resetGame}
          />
          {/* {isLoser == "" ? null : (
            <LoserDisplay
              showLoser={showLoser}
              hideLoser={() => setShowLoser(false)}
              loser={isLoser}
            />
          )} */}
        </View>
      </Portal>
    </Provider>
  );
}
