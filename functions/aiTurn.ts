// one can attack with same value and different suit, including trump
// check deck for trump cards and any possible pairs
// possibly teach ai to skip a turn if cards are good --> sort cards in sequence and determine =what the hand looks like
// select a card to attack with (primarily non-trump) and make a move
// if there are several same value cards, attack using one at a time
// after the other party beats card, make sure that's legal (right card to beat with or a trump - check for higher value of card or trump - otherwise display warning that the move is illegal)
// check the cards in hand and add see if more opportunities exist to attack with more options
// if no other cards available to attack with, end the turn --> turn swithes to the other party
// if other options available, continue attacking untill options are exhausted or AI decides it's done
// if the turn is over --> check how many cards are missing to make up for 6, and draw
// if cards are gone from the deck, dont draw, and check if there are cards still present in ai or playe's decks.  if deck is empty and either ai or user hands are empty, declare 'Fool" and conclude the game

export function aiDefend(
  playHand: any,
  aiHand: any,
  userHand: any,
  deck: any,
  trump: any
) {
  let sortedAirHand: any[] = [];

  // check aiHand for cards -->  sort by trump and then by other cards ascending

  // sortedAirHand = aiHand.sort( // possibly move this into its own function!!!
  //     (a: any, b: any) =>
  //       parseInt(a.substring(0, 2)) - parseInt(b.substring(0, 2))
  //   );

  console.log("AI PLAY play hand: ", playHand);
  console.log("AI PLAY ai hand: ", aiHand);
  console.log("AI PLAY user hand: ", userHand);
  console.log("AI PLAY deck: ", deck);
  console.log("AI PLAY trump: ", trump);
}
