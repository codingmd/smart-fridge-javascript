class Fridge {
	itemCount = 0;

	scanAddedItem(item) {
		this.itemCount++;
	}

	getItemCount() {
		return this.itemCount;
	}

	setCurrentDate() {
		return "18/10/2021";
	}
}

module.exports = Fridge;
