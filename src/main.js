// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type},${item.color}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

// function onButtonClick(event, items) {
//   const dataset = event.target.dataset;
//   const key = dataset.key;
//   const value = dataset.value;

//   if (key == null || value == null) {
//     return;
//   }

//   displayItems(items.filter((item) => item[key] === value));
// }

// Handle button click
function onButtonClick(event) {
  const target = event.target;
  const key = target.dataset.key;
  const value = target.dataset.value;

  const itemList = document.querySelectorAll(".item");
  if (key == null || value == null) {
    return;
  }
  updateItems(itemList, value);
}

// Make the items matching {key: value} invisible.
function updateItems(itemList, value) {
  itemList.forEach((item) => {
    const keys = item.querySelector("img").alt.split(",");
    if (keys[0] === value || keys[1] === value) {
      item.classList.remove("invisible");
    } else {
      item.classList.add("invisible");
    }
  });
}

function setEventListener(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

// main
loadItems()
  .then((items) => {
    // console.log(items);
    displayItems(items);
    setEventListener(items);
  })
  .catch(console.log);
