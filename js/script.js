const result = document.getElementById("result");
const filter = document.getElementById("filter");
const listItems = [];

async function getData() {
  const res = await fetch(
    "https://randomuser.me/api?results=50&nat=us,dk,fr,gb,br,ca,au,ch,de,fi,ie,nl,nz,us",
  );
  const { results } = await res.json();
  result.innerHTML = "";
  results.forEach((user) => {
    const li = document.createElement("li");
    listItems.push(li);
    li.innerHTML = `
      <img src="${user.picture.large}" alt="${user.name.first}">
      <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
      </div>
    `;
    result.appendChild(li);
  });
}

function filterData(searchTerm) {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

function handleSearchInput(event) {
  filterData(event.target.value);
}

getData();
filter.addEventListener("input", handleSearchInput);
