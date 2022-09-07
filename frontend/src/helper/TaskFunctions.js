const updateListToDoCards = (listToDoCards, setListToDoCards, cardId, newDescription, newStatus) => {
  let current = listToDoCards;
  current.map((card) => {
    if (card.id === cardId) {
      card.description = newDescription;
      card.status = newStatus;
    }
  });
  setListToDoCards(current);
};

const removeCardFromListToDoCards = (listToDoCards, setListToDoCards, cardId) => {
  let current = listToDoCards;
  const result = current.filter((card) => card.id !== cardId);
  setListToDoCards(result);
};

module.exports = {
  updateListToDoCards: updateListToDoCards,
  removeCardFromListToDoCards: removeCardFromListToDoCards,
};
