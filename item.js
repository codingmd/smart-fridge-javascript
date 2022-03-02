class Item {
	constructor(name, expiry, condition) {
		this.name = name;
		this.expiry = this.setExpiryDate(expiry);
		this.condition = condition;
		this.scannedTime = null;
	}

	setExpiryDate(expiry) {
		const day = expiry.slice(0, 2);
		const month = expiry.slice(3, 5) - 1;
		const year = "20" + expiry.slice(6, 8);

		this.expiryDate = new Date(year, month, day);
	}

	getExpiry() {
		return this.expiryDate.toLocaleDateString("en-GB", {day: '2-digit', month: '2-digit', year: '2-digit'});
	}
}

module.exports = Item;
