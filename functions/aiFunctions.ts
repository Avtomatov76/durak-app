export function sortAiHand(aiHand: any, trump: any) {
  let sortedHand: any[] = [];
  let trumpCards: any[] = [];
  let otherCards: any[] = [];

  aiHand.sort(
    (a: any, b: any) =>
      parseInt(a.substring(0, 2)) - parseInt(b.substring(0, 2))
  );

  aiHand.forEach((card: any) => {
    if (card[2] == trump) {
      trumpCards.push(card);
    } else otherCards.push(card);
  });

  if (trumpCards.length > 0) sortedHand = [...otherCards, ...trumpCards];
  else sortedHand = aiHand.slice();

  return sortedHand;
}
