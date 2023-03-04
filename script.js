// ✅ Add items to list via form
// Remove items from list by clicking the "X" button
// Clear all items with "clear" button
// Filter the items by typing in the filter field
// Add localStorage to persist items
// Click on an item to put into "edit mode" and add to form
// Update Item
// Deploy To Netlify

const itemForm = document.getElementById("item-form"); //<form>
const itemInput = document.getElementById("item-input"); //<input>
const itemList = document.getElementById("item-list"); //<ul> - whole list

const addItem = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;

  //Validate input
  if (newItem === "") {
    alert("Add an item");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
  itemInput.value = "";
};

const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  icon = createIcon("fa-solid fa-xmark");

  button.appendChild(icon);
  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
};

//Event Listeners (at the bottom)
itemForm.addEventListener("submit", addItem);

itemList.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.tagName === "button") {
    //e.target.remove();
    console.log("button");
  }
});
