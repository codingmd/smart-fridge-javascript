class Fridge {
  itemCount = 0;
  items = [];
  fridgeDoorOpened = false;

  signalDoorOpened() {
    this.fridgeDoorOpened = true;
    this.reduceItemExpiry();
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

  reduceItemExpiry() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].condition === "sealed") {
        this.items[i].expiry.setHours(this.items[i].expiry.getHours() - 1);
      } else if (this.items[i].condition === "opened") {
        this.items[i].expiry.setHours(this.items[i].expiry.getHours() - 5);
      } 
    }
  }
}

module.exports = Fridge;