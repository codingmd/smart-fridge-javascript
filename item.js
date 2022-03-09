class Item {
	constructor(name, expiryString, condition) {
		this.name = name;
		this.expiry = this.setExpiryDate(expiryString);
		this.condition = condition;
		this.scannedTime = null;
	}

	setExpiryDate(expiryString) {
		const day = expiryString.slice(0, 2);
		const month = expiryString.slice(3, 5) - 1;
		const year = "20" + expiryString.slice(6, 8);

		return new Date(year, month, day);
	}

	getExpiry() {
		return this.expiry.toLocaleDateString("en-GB", { day: '2-digit', month: '2-digit', year: '2-digit' });
	}
}

module.exports = Item;
