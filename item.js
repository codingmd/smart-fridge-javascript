class Item {
  constructor(name, expiry, condition) {
    this.name = name;
    this.expiry = setExpiryDate(expiry);
    this.condition = condition;
    this.scannedTime = null;
  }

  setExpiryDate(expiry) {
    //expiry = "day/month/year"
    const expiryDate = new Date(expiry);
    console.log(expiryDate);
    return expiryDate;
  }
}

module.exports = Item;
