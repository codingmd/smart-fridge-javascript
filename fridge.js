class Fridge {
	itemCount = 0;

	scanAddedItem(item) {
		this.itemCount++;
	}

	getItemCount() {
		return this.itemCount;
	}
}

module.exports = Fridge;
