import express, { Request, Response, NextFunction } from "express";
import { CardNameType, CardSetType, CardType } from "../types";
import { v4 as uuidv4 } from "uuid";
import { json } from "body-parser";

const deckCards: CardNameType[] = [
  "ACE",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JOKER",
  "QUEEN",
  "KING",
];
const sDeckCards: CardNameType[] = [
  "ACE",
  "7",
  "8",
  "9",
  "10",
  "JOKER",
  "QUEEN",
  "KING",
];

class Deck {
  deckId: string;
  cards: CardType[] = [];
  open: boolean = false;
  shuffled: boolean;
  short: boolean;

  constructor(short: boolean, shuffled: boolean = false) {
    this.deckId = uuidv4();
    this.short = short;
    this.shuffled = shuffled;
    const cards = short ? sDeckCards : deckCards;
    const sets: CardSetType[] = ["Spade", "Club", "Diamond", "Heart"];
    cards.forEach((c) =>
      sets.forEach((s) => this.cards.push({ set: s, name: c as any }))
    );
  }
}

const decks: Deck[] = [];

const addNewDeck = async (req: Request, res: Response, next: NextFunction) => {
  const short = req.body.type === "SHORT";
  const shuffled = req.body.shuffled;
  const deck = new Deck(short, shuffled);
  decks.push(deck);
  res
    .status(200)
    .json({
      deckId: deck.deckId,
      type: deck.short ? "SHORT" : "FULL",
      shuffled: deck.shuffled,
      remaining: deck.cards.length,
    })
    .send();
};

const openDeck = async (req: Request, res: Response, next: NextFunction) => {
  const uuid = req.body.uuid;
  const deckIndex = decks.findIndex((d) => d.deckId === uuid);
  if (deckIndex === -1) return res.status(404).send();
  decks[deckIndex].open = true;
  const d = decks[deckIndex];
  res
    .status(200)
    .json({
      deckId: d.deckId,
      type: d.short ? "SHORT" : "FULL",
      shuffled: d.shuffled,
      remaining: d.cards.length,
      cards: d.cards,
    })
    .send();
};

const drawCard = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({});
};

const setupDeckerController = (app: express.Express) => {
  app.get("/add", json(), addNewDeck);
  app.get("/open", json(), openDeck);
  app.get("/draw", json(), drawCard);
};

export { setupDeckerController };
