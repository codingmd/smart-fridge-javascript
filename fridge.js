class Fridge {
	itemCount = 0;
	items = [];
	fridgeDoorOpened = false;
	expiredItemsArray = [];
	inDateItemsArray = [];
	formattedDisplayArray = [];
	currentDate = new Date();

	signalDoorOpened() {
		this.fridgeDoorOpened = true;
		this.reduceItemExpiry();
		return this.fridgeDoorOpened;
	}

	signalDoorClosed() {
		this.fridgeDoorOpened = false;
    	this.expiredOrNot();
		return this.fridgeDoorOpened;
	}

	scanAddedItem(item) {
		this.itemCount++;
		item.scannedTime = this.currentDate;
		this.items.push(item);
	}

	isItemInFridge(item) {
		return this.items.includes(item);
	}

	getItemCount() {
		return this.itemCount;
	}

	// setCurrentDate() {
	// 	const currentTime = new Date().toLocaleDateString("en-GB");
	// 	return currentTime;
	// }

	setCurrentDate(currentDateString) {
		if (currentDateString) {
			let currentDateArray = currentDateString.split("/");
			const day = currentDateArray[0];
			const month = currentDateArray[1] - 1;
			//validate year format
			let year = currentDateArray[2];
			if (year.length < 4) {
				year = "20" + year;
			}

			this.currentDate = new Date(year, month, day);
		} 

		return this.currentDate;
	}

	removeItemFromFridge(item) {
		if (this.isItemInFridge(item)) {
			this.itemCount--;
		}
		return "item not in fridge";
	}

	reduceItemExpiry() {
		for (let i = 0; i < this.items.length; i++) {
			switch (this.items[i].condition) {
				case "sealed":
					this.items[i].expiry.setHours(this.items[i].expiry.getHours() - 1);
					break;
				case "opened":
					this.items[i].expiry.setHours(this.items[i].expiry.getHours() - 5);
					break;
			}
		}
	}

	expiredOrNot() {
		for (let i = 0; i < this.items.length; i++) {
			this.items[i].daysToExpiry(this.currentDate);
			if (this.items[i].expiry < this.currentDate) {
				this.expiredItemsArray.push(this.items[i].name);
			} else {
				this.inDateItemsArray.push(this.items[i]);
			}
		}

		this.inDateItemsArray.sort((a, b) => (a.expiry > b.expiry ? 1 : -1));

		for (let i = 0; i < this.inDateItemsArray.length; i++) {
			let daysremaining = "";
			if (this.inDateItemsArray[i].daysLeftToEat < 2) {
				daysremaining = " day remaining";
			} else {
				daysremaining = " days remaining";
			}
			this.formattedDisplayArray.push(
				this.inDateItemsArray[i].name +
					": " +
					this.inDateItemsArray[i].daysLeftToEat +
					daysremaining
			);
		}
	}

	displayItems() {
		return (
			"EXPIRED: " +
			this.expiredItemsArray.join("\r\nEXPIRED: ") +
			"\r\n" +
			this.formattedDisplayArray.join("\r\n")
		);
	}

	simulateDayOver() {
		// for (let i = 0; i < this.items.length; i++) {
		// 	this.items[i].expiry.setHours(this.items[i].expiry.getHours() - 24);
		// }
		this.currentDate = this.currentDate.setDate(this.currentDate.getDate() + 1);
	}
}

module.exports = Fridge;
