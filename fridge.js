class Fridge {
	itemCount = 0;
	items = [];
	fridgeDoorOpened = false;
	expiredItemsArray = [];
	formattedDisplayArray = [];

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
		const currentTime = new Date().toLocaleDateString("en-GB");
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
			if (this.items[i].expiry < new Date()) {
				this.expiredItemsArray.push(this.items[i].name);
			} else {
				this.formattedDisplayArray.push(
					this.items[i].name +
						": " +
						this.items[i].daysLeftToEat +
						" days remaining"
				);
			}
		}

		this.formattedDisplayArray.sort((a, b) => (a.expiry > b.expiry ? 1 : -1));
	}

	displayItems() {
		return (
			"EXPIRED: " +
			this.expiredItemsArray.join("\r\nEXPIRED: ") +
			"\r\n" +
			this.formattedDisplayArray.join("\r\n")
		);
	}
}

module.exports = Fridge;
