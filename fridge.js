class Fridge {
  itemCount = 0;
  items = [];

  signalDoorOpened() {
    return true;
  }

  scanAddedItem(item) {
    this.itemCount++;
    item.scannedTime = this.setCurrentDate();
    this.items.push(item);
  }

  isItemInFridge(item) {
    return this.items.includes(item);
  }

  getItemCount() {
    return this.itemCount;
  }

  setCurrentDate() {
    const currentTime = new Date().toLocaleTimeString();
    console.log(currentTime);
    return currentTime;
  }

  removeItemFromFridge(item) {
    if (this.isItemInFridge(item)) {
      this.itemCount--;
    }
    return "item not in fridge";
  }
}
module.exports = Fridge;
