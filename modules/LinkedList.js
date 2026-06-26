import Node from "./Node.js";

export default class LinkedList {
	constructor() {
		this.size = 0;
		this.head = null;
		this.tail = null;
	}

	// Property functions
	getSize() {
		return this.size;
	}

	getHead() {
		if (!this.size) return null;
		return this.head.value;
	}

	getTail() {
		if (!this.size) return null;
		return this.tail.value;
	}

	// CRUD functions
	toString(node = this.head) {
		if (node === null) {
			console.log("null");
			return;
		}
		process.stdout.write(`(${node.value}) -> `);
		this.toString(node.next);
	}

	prepend(value) {
		const node = new Node(value);
		if (this.size === 0) {
			this.head = node;
			this.tail = node;
			this.size++;
		} else {
			const temp = this.head;
			this.head = node;
			this.head.next = temp;
			this.size++;
		}
	}

	append(value) {
		const node = new Node(value);
		if (this.size === 0) {
			this.head = node;
			this.tail = node;
			this.size++;
		} else {
			this.tail.next = node;
			this.tail = node;
			this.size++;
		}
	}

	pop() {
		if (this.size === 0) return null;
		const first = this.head;
		this.head = this.head.next;
		this.size--;
		return first.value;
	}

	insertAt(index, ...values) {
		if (index > this.size || !values) return;

		if (index === 0) {
			const temp = this.head;
			this.head = this.insertAtHelper(null, values);
			this.tail.next = temp;
			this.size += values.length;
			this.tail = this.at(this.size - 1);
			return;
		}
		if (index === this.size - 1) {
			const temp = this.at(index);
			this.tail.next = this.insertAtHelper(null, values);
			this.size += values.length;
			return;
		}
		const temp = this.at(index);
		this.at(index - 1).next = this.insertAtHelper(null, values);
		this.tail.next = temp;
		this.size += values.length;
		this.tail = this.at(this.size - 1);
	}

	insertAtHelper(node, values) {
		if (values.length === 0) {
			this.tail = node;
			return null;
		}
		const newNode = new Node(values[0]);
		newNode.next = this.insertAtHelper(newNode, values.slice(1));
		return newNode;
	}

	removeAt(index) {
		// Must clear deleted .next if implementing doubly linked list
		if (index === 0) {
			const temp = this.head;
			this.head = this.head.next;
			this.size--;
			return;
		}
		if (index === this.size - 1) {
			this.tail = this.at(this.size - 2);
			this.tail.next = null;
			this.size--;
			return;
		}
		this.at(index - 1).next = this.at(index).next;
		this.size--;
	}

	// Utility functions
	at(index) {
		if (index >= this.size || index < 0) return undefined;
		if (index === 0) return this.head;

		return this.atHelper(this.head, index);
	}

	atHelper(node, index) {
		if (index === 0) return node;
		return this.atHelper(node.next, index - 1);
	}

	findIndex(value) {
		if (value === this.head.value) return 0;
		if (value === this.tail.value) return this.size - 1;

		return this.findIndexHelper(this.head, value, 0);
	}

	findIndexHelper(node, value, index) {
		if (node === null) return -1;
		if (node.value === value) return index;
		return this.findIndexHelper(node.next, value, index + 1);
	}

	contains(value) {
		if (value === null) return false;
		if (this.size === 0) return false;
		return this.containsHelper(this.head, value);
	}

	containsHelper(node, value) {
		if (node === null) return false;
		if (node.value === value) return true;
		return this.containsHelper(node.next, value);
	}
}
