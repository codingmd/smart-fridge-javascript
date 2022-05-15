const Item = require("./item.js");
var modal = document.getElementById("itemsModal");
var addItemsBtn = document.getElementById("addItems");
var span = document.getElementsByClassName("close")[0];

addItemsBtn.onclick = function () {
	modal.style.display = "block";
}

span.onclick = function () {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal and all items selected, close it
window.onclick = function (event) {
	if (event.target == modal && counter > 0) {
		modal.style.display = "none";
		addItemsBtn.display = "none";
	}
}

function checkPosition(id) {
	if (counter < 2) {
		if (!this.items.includes(this.availableItems[id])) {
			this.items.push(this.availableItems[id])
			counter = counter + 1;
			document.getElementById("counter").innerHTML = counter;
		}
	}
}

class Fridge {
	itemCount = 0;
	items = [];
	fridgeDoorOpened = false;
	expiredItemsArray = [];
	inDateItemsArray = [];
	formattedDisplayArray = [];
	currentDate = new Date();
	itemsSelected = [];
	counter = 0;
	availableItems = initializeFridgeItems();

	initializeFridgeItems() {
		return [
			{ 0: new Item("milk", "21/05/22", "opened") },
			{ 1: new Item("butter", "21/06/22", "sealed") },
			{ 2: new Item("yoghurt", "21/04/22", "sealed") },
			{ 3: new Item("cheese", "2/07/22", "sealed") },
			{ 4: new Item("tofu", "2/06/22", "sealed") },
			{ 5: new Item("apple", "2/06/22", "sealed") }
		];
	}

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
		if (!currentDateString === "") {
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
