class Fridge {
  itemCount = 0;
  items = [];

  scanAddedItem(item) {
    this.itemCount++;
    item.scannedTime = this.setCurrentDate();
    this.items.push(item);
  }

  getItemCount() {
    return this.itemCount;
  }

  setCurrentDate() {
    const currentTime = new Date().toLocaleTimeString();
    console.log(currentTime);
    return currentTime;
  }

  removeItem(item) {
    this.itemCount--;
  }
}

module.exports = Fridge;
