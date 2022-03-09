class Fridge {
  itemCount = 0;
  items = [];
  fridgeDoorOpened = false;

  signalDoorOpened() {
    this.fridgeDoorOpened = true;
    return this.fridgeDoorOpened;
  }

  signalDoorClosed() {
    this.fridgeDoorOpened = false;
    return this.fridgeDoorOpened;
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
    const currentTime = new Date().toLocaleDateString('en-GB');
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
