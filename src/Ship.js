const Ship = (length) => {
  let hits = 0;

  function hit() {
    hits += 1;
  }

  function getHits() {
    return hits;
  }

  function isSunk() {
    if (length === hits) {
      return true;
    }
    return false;
  }

  return { hit, isSunk, getHits };
};
export default Ship;
