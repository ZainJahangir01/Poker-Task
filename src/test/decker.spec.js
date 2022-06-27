import {expect} from 'chai';
import {addNewDeck , drawCard , openDeck} from "../controllers/decker";


describe('Add new Deck check on /add', () => {
    it('new Deck should be Created', async () => {
      const actualResult = await addNewDeck();
      expect(actualResult).to.equal('OK');
    });
  });

  describe('Open Deck/open', () => {
    it('Deck should be opened', async () => {
      const actualResult = await openDeck();
      expect(actualResult).to.equal('OK');
    });
  });

  describe('Draw cards /draw', () => {
    it('cards should be drawm', async () => {
      const actualResult = await drawCard();
      expect(actualResult).to.equal('OK');
    });
  });




