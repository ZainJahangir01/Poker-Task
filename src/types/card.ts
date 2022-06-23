type CardSetType = "Spade" | "Club" | "Diamond" | "Heart";
type CardNameType =
  | "ACE"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "JOKER"
  | "QUEEN"
  | "KING";
type CardType = {
  set: CardSetType;
  name: CardNameType;
};

export { CardType, CardSetType, CardNameType };
