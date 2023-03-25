export function getDeck() {
  let deck = [
    "02h",
    "02s",
    "02c",
    "02d",
    "03h",
    "03s",
    "03c",
    "03d",
    "04h",
    "04s",
    "04c",
    "04d",
    "05h",
    "05s",
    "05c",
    "05d",
    "06h",
    "06s",
    "06c",
    "06d",
    "07h",
    "07s",
    "07c",
    "07d",
    "08h",
    "08s",
    "08c",
    "08d",
    "09h",
    "09s",
    "09c",
    "09d",
    "10h",
    "10s",
    "10c",
    "10d",
    "11h",
    "11s",
    "11c",
    "11d",
    "12h",
    "12s",
    "12c",
    "12d",
    "13h",
    "13s",
    "13c",
    "13d",
    "14h",
    "14s",
    "14c",
    "14d",
  ];

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  return deck;
}
