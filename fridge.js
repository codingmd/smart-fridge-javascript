class Fridge {
  itemCount = 0;
  items = [];

  scanAddedItem(item) {
    this.itemCount++;
    this.items.push(item);
  }

  getItemCount() {
    return this.itemCount;
  }

  setCurrentDate() {
    const currentTime = new Date(
      new Date().getTime() + 0 * 60 * 60 * 1000
    ).toLocaleTimeString();
    console.log(currentTime);
    return currentTime;
  }
}

module.exports = Fridge;
