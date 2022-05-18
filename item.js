const Fridge = require("./fridge.js");


class Item {
	constructor(name, expiryString, condition) {
		this.name = name;
		this.expiry = this.setExpiryDate(expiryString);
		this.condition = condition;
		this.scannedTime = null;
		this.daysLeftToEat = null;
	}

	setExpiryDate(expiryString) {
		let expiryArray = expiryString.split("/");
		const day = expiryArray[0];
		const month = expiryArray[1] - 1;
		//validate year format
		let year = expiryArray[2];
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

	daysToExpiry(fridgeDate) {
		let currentTime = fridgeDate.getTime();
		let expiryTime = this.expiry.getTime();

		let differenceInTime = Math.abs(expiryTime - currentTime);
		let differenceInDays = differenceInTime / (1000 * 3600 * 24);

		//assign calculate days to expiry to item's daysLeftToEat variable
		this.daysLeftToEat = Math.ceil(differenceInDays);

		//return Math.ceil(differenceInDays);
		return this.daysLeftToEat;
	}
}

module.exports = Item;
