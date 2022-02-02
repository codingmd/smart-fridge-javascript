class Item {
  constructor(name, expiry, condition) {
    this.name = name;
    this.expiry = expiry;
    this.condition = condition;
    this.scannedTime = null;
  }
}

module.exports = Item;
