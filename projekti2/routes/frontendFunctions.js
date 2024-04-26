// Function to fetch one document from the API
async function getItemById(id) {
    try {
        const response = await fetch(`/api/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("document with " + id + "not found ", error);
    }
}

// Function to render items on the page
async function renderOneItem() {
    const id = document.getElementById("itemId").value; // Example ID
    const itemList = document.getElementById("oneItem");
    document.getElementById("itemId").value = "";
    // Fetch the item by ID
    const item = await getItemById(id);

    // Clear existing content
    itemList.innerHTML = "";

    // Render the item
    const listItem = document.createElement("li");
    listItem.textContent = item.name + item.quantity + item.price; // Assuming each item has a 'name' property
    itemList.appendChild(listItem);
}

// Function to fetch all items from the API
async function getAllItems() {
    try {
        const response = await fetch("/api/getall");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching documents:", error);
    }
}

// Function to render items on the page
async function renderItems() {
    const itemList = document.getElementById("itemList");
    const items = await getAllItems();

    // Clear existing items
    itemList.innerHTML = "";

    // Render each item
    items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item.name + item.quantity + item.price; // Assuming each item has a 'name' property
        itemList.appendChild(listItem);
    });
}

module.exports = {
    getItemById,
    renderItems,
    getAllItems,
    renderOneItem
}