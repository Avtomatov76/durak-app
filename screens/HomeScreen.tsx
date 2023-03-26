import { useState } from "react";
import { View, Text, Button, Dimensions } from "react-native";
import { getDeck } from "../assets/cards/Deck";
import Ai from "../components/Ai";
import CurrentPlay from "../components/CurrentPlay";
import User from "../components/User";

let deck = getDeck();
let testTrump = "";
let testTurn = "";

function checkForLoser() {
  // checks if deck is gone, and which player still has cards --> after every turn
  // if Loser -> display winning Banner, setGameStatus(false), remove player's and AI decks
}

export default function HomeScreen(props: any) {
  const [gameCount, setGameCount] = useState(0);
  const [gameStatus, setGameStatus] = useState(false);
  const [userHand, setUserHand] = useState<any>([]);
  const [aiHand, setAiHand] = useState<any>([]);
  const [trump, setTrump] = useState("");
  const [turn, setTurn] = useState("");
  const [cardsInPlay, setCardsInPlay] = useState<any>({
    ai: [] as any,
    user: [] as any,
  });
  const [gameHand, setGameHand] = useState<any>([]);

  const updateGameHand = (el: any, flag: any) => {
    let aiPlay = cardsInPlay.ai.slice() || ([] as any);
    let userPlay = cardsInPlay.user.slice() || ([] as any);

    let aiHandArr = aiHand.slice() || ([] as any);
    let userHandArr = userHand.slice() || ([] as any);

    let numAiCards = aiPlay.length;
    let numUserCards = userPlay.length;

    if (testTurn == "ai" && numAiCards > userHand.length + numUserCards) {
      console.log("CAN'T ADD ANY MORE CARDS!!");
      return;
    }

    if (testTurn == "user" && numUserCards > aiHand.length + numAiCards) {
      console.log("CAN'T ADD ANY MORE CARDS!!");
      return;
    }

    if (flag == "ai") {
      aiPlay.push(el);
      aiHandArr.splice(aiHandArr.indexOf(el), 1);
    }
    if (flag == "user") {
      userPlay.push(el);
      userHandArr.splice(userHandArr.indexOf(el), 1);
    }

    setCardsInPlay({
      ai: aiPlay.slice(),
      user: userPlay.slice(),
    });

    setAiHand(aiHandArr.slice());
    setUserHand(userHandArr.slice());
  };

  console.log(gameHand.length);
  console.log(gameHand);
  console.log("Cards in play array obj: ", cardsInPlay);
  console.log("User Hand: ", userHand);
  console.log("AI hand: ", aiHand);

  // Start Game
  // On start,Shuffle deck, determine trump (display it), deal player and Computer
  // Determine whose turn it is (check player/computer's deck for lowest trump --> whoever has the lowest, starts)
  // if neithe rhave trump, do a random coin toss and display who turn it is

  //
  function getTrump() {
    // get last card from deck and assign to trump (kins)
    let el = deck[51];
    let trump = "";
    trump = el.charAt(2);

    setTrump(trump);
    testTrump = trump;
    // place the card at beginning of deck
    let trumpCard = deck.pop() || "";
    console.log(trumpCard);

    deck.unshift(trumpCard);
    console.log("Card moved to the beginning: ", deck);
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

    getTurn(ai, user);

    setAiHand(ai.slice());
    setUserHand(user.slice());
  }

  function getTurn(aiArray: any, userArray: any) {
    // at game start - check whose turn it is
    let candidates: any[] = [];
    let lowestCard = "";
    let combinedArray = aiArray.concat(userArray);
    console.log(combinedArray);

    console.log("Turn: ", turn);
    console.log("Trump suit: ", testTrump);
    console.log(userArray);
    console.log(aiArray);

    if (turn == "") {
      aiArray.forEach((el: any) => {
        if (el.charAt(2) == testTrump) candidates.push(el + "a");
      });

      userArray.forEach((el: any) => {
        if (el.charAt(2) == testTrump) candidates.push(el + "p");
      });

      console.log("Candidates : ", candidates);

      if (candidates.length > 0) {
        candidates.sort(
          (a: any, b: any) =>
            parseInt(a.substring(0, 2)) - parseInt(b.substring(0, 2))
        );
        lowestCard = candidates[0];
      } else {
        combinedArray.sort(
          (a: any, b: any) =>
            parseInt(a.substring(0, 2)) - parseInt(b.substring(0, 2))
        );
        lowestCard = combinedArray[0];
      }

      if (candidates.length > 0 && lowestCard[3] == "a")
        testTurn = "ai"; //setTurn("ai");
      else if (candidates.length > 0 && lowestCard[3] == "p")
        testTurn = "user"; //setTurn("user");
      else {
        if (aiArray.includes(lowestCard)) testTurn = "ai";
        if (userArray.includes(lowestCard)) testTurn = "user";
      }

      console.log("Sorted candidates: ", candidates);
      console.log("Combined array: ", combinedArray);
      console.log("Lowest card is : ", lowestCard);
      console.log("Whose turn: ", testTurn);
    }

    // 1st game --> lowest trump or coin toss
    // games > 1 --> whoever wins, starts
    // attacks/defense turn logic --> if defends - defender gets a turn, if picks up - the other player gets a turn
    // calls isLoser()
  }

  function startGame() {
    console.log("Start game");

    let count = gameCount;
    count++;
    setGameCount(count);
    setGameStatus(true);

    getTrump();
    dealCards();

    if (testTurn == "ai") {
      console.log("Now it's AI's turn: ", testTurn)

    }

    if (testTurn == "user") {
      console.log("Now it's User's turn: ", testTurn)


    }
  }

  console.log("Deck: ", deck, deck.length);
  console.log("Trump suit: ", trump);
  console.log(gameCount);
  console.log("AI hand: ", aiHand);
  console.log("User hand: ", userHand);

  function attackOpponent(user: any) {
    console.log("Attacking...");
  }

  function pickUpCards(user: any) {
    console.log("Picking up cards...");
  }

  function completeTurn() {
    console.log("Finishing a turn...");
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {!gameStatus ? (
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Button color="red" title="Start Game" onPress={startGame} />
        </View>
      ) : (
        <View style={{ alignSelf: "center" }}>
          <Text
            style={{
              color: "blue",
              fontSize: 24,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Game Started!!
          </Text>
        </View>
      )}
      <Ai
        gameStatus={gameStatus}
        aiHand={aiHand}
        navigation={props.navigation}
        attackOpponent={attackOpponent}
        pickUpCards={pickUpCards}
        completeTurn={completeTurn}
        updateGameHand={updateGameHand}
      />
      <CurrentPlay
        deck={deck.length}
        //numCards={gameHand.length}
        gameHand={cardsInPlay}
        turn={testTurn}
        trump={trump}
        numCardsUser={userHand.length}
        numCardsAi={aiHand.length}
      />
      <User
        userHand={userHand}
        attackOpponent={attackOpponent}
        pickUpCards={pickUpCards}
        completeTurn={completeTurn}
        updateGameHand={updateGameHand}
      />
    </View>
  );
}
