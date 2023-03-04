// ✅ Add items to list via form
// ✅ Remove items from list by clicking the "X" button
// ✅ Clear all items with "clear" button
// Filter the items by typing in the filter field
// Add localStorage to persist items
// Click on an item to put into "edit mode" and add to form
// Update Item
// Deploy To Netlify

const itemForm = document.getElementById("item-form"); //<form>
const itemInput = document.getElementById("item-input"); //<input>
const itemList = document.getElementById("item-list"); //<ul> - whole list
const clearBtn = document.getElementById("clear"); //<button> Clear All
const itemFilter = document.getElementById("filter"); // Filter div

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
  CheckUI();
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

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
  CheckUI();
};

const clearAll = () => {
  //itemList.querySelectorAll("li").forEach((e) => e.remove());
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  CheckUI();
};

//if there are no li items - remove filter & Clear All button
const CheckUI = () => {
  const items = itemList.querySelectorAll("li"); // All list items
  if (items.length === 0) {
    //here could also set a class that has display none
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
};

//Event Listeners (at the bottom)
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearAll);

CheckUI();
