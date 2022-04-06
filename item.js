class Item {
	constructor(name, expiryString, condition) {
		this.name = name;
		this.expiry = this.setExpiryDate(expiryString);
		this.condition = condition;
		this.scannedTime = null;
		this.daysLeftToEat = this.daysToExpiry();
	}

	setExpiryDate(expiryString) {
		let expiryArray = expiryString.split("/");
		const day = expiryArray[0];
		const month = expiryArray[1];
		//validate year format
		let year = expiryArray[2];
		console.log(year);
		if (year.length < 4) {
			year = "20" + year;
		}
		console.log(year);
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
		let currentTime = currentDate.getTime();
		let expiryTime = this.expiry.getTime();
		let differenceInTime = Math.abs(expiryTime - currentTime);
		let differenceInDays = differenceInTime / (1000 * 3600 * 24);
		console.log(currentTime, expiryTime, differenceInTime, differenceInDays);
		return differenceInDays;
	}
}

module.exports = Item;
