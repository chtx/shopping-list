// ✅ Add items to list via form
// ✅ Remove items from list by clicking the "X" button
// ✅ Clear all items with "clear" button
// ✅ Filter the items by typing in the filter field
// ✅ Add localStorage to persist items
// ✅ Click on an item to put into "edit mode" and add to form
// ✅ Update Item

const itemForm = document.getElementById('item-form'); //<form>
const itemInput = document.getElementById('item-input'); //<input>
const itemList = document.getElementById('item-list'); //<ul> - whole list
const clearBtn = document.getElementById('clear'); //<button> Clear All
const itemFilter = document.getElementById('filter'); // Filter div
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  CheckUI();
};

const onAddItemSumbit = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;

  //Validate input
  if (newItem === '') {
    alert('Add an item');
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('That item already exists!');
      return;
    }
  }

  //Create idem DOM element
  addItemToDOM(newItem);

  //Add item to local storage
  addItemToStorage(newItem);

  CheckUI();
  itemInput.value = '';
};

const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  icon = createIcon('fa-solid fa-xmark');

  button.appendChild(icon);
  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
};

const addItemToDOM = (item) => {
  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
};

const addItemToStorage = (item) => {
  const itemsFromStorage = getItemsFromStorage();

  //Add new item to array
  itemsFromStorage.push(item);

  //Convert to JSON string and set to local storage:
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = () => {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    //Parse from local storage if something is there
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
};

//This function is a handler.
// Depending on what we click, it'll run separete functions.
const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
    // This else handles any click on the li element that isn't on X icon.
  } else {
    setItemToEdit(e.target);
  }
};

const checkIfItemExists = (item) => {
  const itemsFromStorage = getItemsFromStorage();

  // this returns true/false
  return itemsFromStorage.includes(item);
};

const setItemToEdit = (item) => {
  isEditMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item ';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
};

const removeItem = (item) => {
  if (confirm('Are you sure?')) {
    //Remove item from DOM
    item.remove();

    //Remove item from storage
    removeItemFromStorage(item.textContent);

    CheckUI();
  }
};

const removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();

  //Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //Re-set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const clearAll = () => {
  //itemList.querySelectorAll("li").forEach((e) => e.remove());
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  //Clear from local storage
  localStorage.removeItem('items');

  CheckUI();
};

//if there are no li items - remove filter & Clear All button
const CheckUI = () => {
  itemInput.value = '';

  const items = itemList.querySelectorAll('li'); // All list items
  if (items.length === 0) {
    //here could also set a class that has display none
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  formBtn.innerHTML = '<i class="fa—solid fa—plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
};

const filterItems = (e) => {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');
  items.forEach((item) => {
    //.firstChild is a text node
    const itemName = item.firstChild.textContent.toLowerCase();
    //When no match, .indexOf returns -1
    if (itemName.indexOf(text) != -1) {
      //don't delete items, just change display
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

// Initialize app
const init = () => {
  //Event Listeners
  itemForm.addEventListener('submit', onAddItemSumbit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearAll);
  itemFilter.addEventListener('input', filterItems);
  //Pull items from local storage on DOM loaded
  document.addEventListener('DOMContentLoaded', displayItems);

  CheckUI();
};

init();
