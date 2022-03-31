class Item {
	constructor(name, expiryString, condition) {
		this.name = name;
		this.expiry = this.setExpiryDate(expiryString);
		this.condition = condition;
		this.scannedTime = null;
		this.daysLeftToEat = this.daysToExpiry();
	}

	setExpiryDate(expiryString) {
		const day = expiryString.slice(0, 2);
		const month = expiryString.slice(3, 5) - 1;
		//validate year format
		let year = expiryString.slice(6);
		if (year.length < 4) {
			year = "20" + year;
		}

		return new Date(year, month, day);
	}

	getExpiry() {
		return this.expiry.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "2-digit",
		});
	}

	daysToExpiry() {
		let currentDate = new Date();
		let differenceInTime = this.expiry.getTime() - currentDate.getTime();
		console.log(this.expiry.getTime(), currentDate.getTime());
		let differenceInDays = differenceInTime / (1000 * 3600 * 24);
		return differenceInDays;
	}
}

module.exports = Item;
