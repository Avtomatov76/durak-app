// Russian Durak deck is 36 cards - should possibly implement that as an option
export function getDeck(deckSize = 52) {
  let fullDeck = [
    "02c",
    "02d",
    "02h",
    "02s",
    "03c",
    "03d",
    "03h",
    "03s",
    "04c",
    "04d",
    "04h",
    "04s",
    "05c",
    "05d",
    "05h",
    "05s",
    "06c",
    "06d",
    "06h",
    "06s",
    "07c",
    "07d",
    "07h",
    "07s",
    "08c",
    "08d",
    "08h",
    "08s",
    "09c",
    "09d",
    "09h",
    "09s",
    "10c",
    "10d",
    "10h",
    "10s",
    "11c",
    "11d",
    "11h",
    "11s",
    "12c",
    "12d",
    "12h",
    "12s",
    "13c",
    "13d",
    "13h",
    "13s",
    "14c",
    "14d",
    "14h",
    "14s",
  ];

  // Reduce deck to 36 cards, implement later
  let deck = deckSize == 36 ? fullDeck.slice(16) : fullDeck.slice();

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  return deck;
}
