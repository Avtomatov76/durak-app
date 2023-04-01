export function checkForLoser(deck: any, userHand: any, aiHand: any) {
  // checks if deck has cards
  if (deck.length > 0) {
    console.log("N/A");
    return "na";
  }

  // Check ai and user hands
  if (aiHand.length == 0) {
    console.log("User is a loser!!");
    return "user";
  }
  if (userHand.length == 0) {
    console.log("AI is a loser!!");
    return "ai";
  }

  return "na";
}

export function getTurn(turn: any, trump: any, aiArray: any, userArray: any) {
  let candidates: any[] = [];
  let lowestCard = "";
  let combinedArray = aiArray.concat(userArray);

  if (turn == "") {
    aiArray.forEach((el: any) => {
      if (el.charAt(2) == trump) candidates.push(el + "a");
    });

    userArray.forEach((el: any) => {
      if (el.charAt(2) == trump) candidates.push(el + "p");
    });

    //console.log("Candidates : ", candidates);

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

    if (candidates.length > 0 && lowestCard[3] == "a") turn = "ai";
    else if (candidates.length > 0 && lowestCard[3] == "p") turn = "user";
    else {
      if (aiArray.includes(lowestCard)) turn = "ai";
      if (userArray.includes(lowestCard)) turn = "user";
    }
  }

  return turn;
}

export function checkIfCardIsLegal(el: any, currentPlay: any) {
  console.log(el, currentPlay);

  if (currentPlay.length == 0) return true;

  let found = currentPlay.find(
    (c: any) => parseInt(c.substring(0, 2)) == parseInt(el.substring(0, 2))
  );

  if (!found) return false;

  return true;
}

export function sortHand(hand: any, trump: any) {
  let sortedHand: any[] = [];
  let trumpCards: any[] = [];
  let otherCards: any[] = [];

  //console.log("Hand to sort: ", hand);

  hand.sort(
    (a: any, b: any) =>
      parseInt(a.substring(0, 2)) - parseInt(b.substring(0, 2))
  );

  hand.forEach((card: any) => {
    if (card[2] == trump) {
      trumpCards.push(card);
    } else otherCards.push(card);
  });

  if (trumpCards.length > 0) sortedHand = [...otherCards, ...trumpCards];
  else sortedHand = hand.slice();

  return sortedHand;
}

export function checkHandForMatches(playHand: any, aiHand: any, trump: any) {
  let match = "";
  console.log("CHECK FOR CARDS DATA: ", playHand, aiHand, trump);

  playHand.forEach((card: any) => {
    let cardValue = parseInt(card.substring(0, 2));
    console.log("value: ", cardValue);

    let matched = aiHand.filter(
      (c: any) => parseInt(c.substring(0, 2)) == cardValue && c[2] != trump
    );
    console.log("matched: ", matched);

    if (matched.length > 0) match = matched[0];
  });

  return match;
}

export function removeCardsFromDeck(deck: any, hand: any, trump: any) {
  if (deck.length == 0) return hand;

  let newHand = [];
  let drawnCards: any[] = [];
  let cardsInDeck = deck.length;
  let numCardsToDraw = 6 - hand.length;

  // check if deck has enoght cards
  if (cardsInDeck < numCardsToDraw) numCardsToDraw = cardsInDeck;

  drawnCards = deck.splice(deck.length - numCardsToDraw, numCardsToDraw);

  newHand = sortHand([...hand, ...drawnCards], trump);

  return newHand;
}

export function checkIfValidDefense(
  card: any,
  aiPlay: any,
  userPlay: any,
  trump: any
) {
  console.log("USER Defending...");
  console.log("User Play: ", userPlay);
  console.log("AI Play: ", aiPlay);

  let counterCardValue = parseInt(card.substring(0, 2));
  let counterCardSuit = card[2];

  if (aiPlay.length > userPlay.length) {
    let index = aiPlay.length - 1;
    let cardToBeat = aiPlay[index];
    let cardToBeatValue = parseInt(cardToBeat.substring(0, 2));
    let cardToBeatSuit = cardToBeat[2];

    console.log("Card to beat: ", cardToBeat);
    console.log("Card to beat value: ", cardToBeatValue);
    console.log("Card to beat suit : ", cardToBeatSuit);

    if (counterCardSuit == cardToBeatSuit && counterCardValue > cardToBeatValue)
      return true;

    if (cardToBeatSuit != trump && counterCardSuit == trump) return true;

    return false;
  }
}

export function getTrump(deck: any) {
  // get last card from deck and determien trump suit
  let el = deck[51];
  let trumpSuit = "";
  trumpSuit = el.charAt(2);

  // place the card at beginning of deck
  let trumpCard = deck.pop() || "";
  console.log("Trump suit: ", trumpCard);

  deck.unshift(trumpCard);
  console.log("Card moved to the beginning: ", deck);

  return trumpSuit;
}
