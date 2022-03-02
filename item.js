class Item {
	constructor(name, expiry, condition) {
		this.name = name;
		this.expiry = this.setExpiryDate(expiry);
		this.condition = condition;
		this.scannedTime = null;
	}

	setExpiryDate(expiry) {
		//expiry = "day/month/year"
		//slice(6, 8), slice(3, 5), slice(0, 2)
		const day = expiry.slice(0, 2);
		const month = expiry.slice(3, 5);
		const year = "20" + expiry.slice(6, 8);
		const expiryDate = new Date(expiry.slice(6, 8));
		console.log(day, month, year);
		return expiryDate;
	}
}

module.exports = Item;
