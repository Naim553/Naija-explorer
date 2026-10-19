
const places = [
  {
    id: 1,
    name: "Zuma Rock",
    state: "Niger",
    region: "North Central",
    type: "Rock",
    description: "A huge natural rock near Abuja, often called the Gateway to Abuja.",
    tip: "You can see it clearly from the Abuja to Kaduna road."
  },
  {
    id: 2,
    name: "Olumo Rock",
    state: "Ogun",
    region: "South West",
    type: "Rock",
    description: "A historic rock in Abeokuta that gave shelter to the Egba people during wars.",
    tip: "Wear good shoes for the climb."
  },
  {
    id: 3,
    name: "Yankari Game Reserve",
    state: "Bauchi",
    region: "North East",
    type: "Wildlife",
    description: "A large wildlife park with elephants, baboons and the warm Wikki Spring.",
    tip: "Go early in the morning to see more animals."
  },
  {
    id: 4,
    name: "Obudu Mountain Resort",
    state: "Cross River",
    region: "South South",
    type: "Mountain",
    description: "A cool resort on a high plateau, famous for its cable car.",
    tip: "Bring a jacket. It gets cold at the top."
  },
  {
    id: 5,
    name: "Lekki Conservation Centre",
    state: "Lagos",
    region: "South West",
    type: "Nature",
    description: "A nature park with a long canopy walkway high above the trees.",
    tip: "Avoid going right after heavy rain."
  },
  {
    id: 6,
    name: "Idanre Hills",
    state: "Ondo",
    region: "South West",
    type: "Mountain",
    description: "Ancient hills with hundreds of steps leading to an old town on top.",
    tip: "Carry water. There are many steps."
  },
  {
    id: 7,
    name: "Erin Ijesha Waterfalls",
    state: "Osun",
    region: "South West",
    type: "Waterfall",
    description: "A waterfall with several levels that visitors can climb.",
    tip: "Bring extra clothes. You will get wet."
  },
  {
    id: 8,
    name: "Kurmi Market",
    state: "Kano",
    region: "North West",
    type: "Market",
    description: "One of the oldest markets in West Africa, known for crafts and fabrics.",
    tip: "Go with a guide so you do not get lost."
  },
  {
    id: 9,
    name: "Ogbunike Caves",
    state: "Anambra",
    region: "South East",
    type: "Cave",
    description: "A group of caves with streams and tunnels, reached by many steps.",
    tip: "Visitors remove their shoes before entering."
  },
  {
    id: 10,
    name: "Gurara Falls",
    state: "Niger",
    region: "North Central",
    type: "Waterfall",
    description: "A wide waterfall that is at its strongest in the rainy season.",
    tip: "Visit during the rainy season for the best view."
  }
];

const placesGrid = document.getElementById("placesGrid");
const favouritesGrid = document.getElementById("favouritesGrid");
const searchInput = document.getElementById("searchInput");
const regionSelect = document.getElementById("regionSelect");
const resultCount = document.getElementById("resultCount");
const emptyFavourites = document.getElementById("emptyFavourites");
const favouriteCount = document.getElementById("favouriteCount");
const detailsDialog = document.getElementById("detailsDialog");


let favourites = [];


function createPlaceCard(place) {
  let saveText = "Save to Favourites";

  if (favourites.includes(place.id)) {
    saveText = "Remove Favourite";
  }

  return `
    <article class="place-card">
      <div class="place-banner">${place.type}</div>
      <div class="place-info">
        <h3>${place.name}</h3>
        <p class="place-location">${place.state} State</p>
        <span class="region-label">${place.region}</span>
        <p class="place-type">Type: ${place.type}</p>
        <p>${place.description}</p>
        <div class="card-buttons">
          <button class="details-button" data-id="${place.id}">View Details</button>
          <button class="save-button" data-id="${place.id}">${saveText}</button>
        </div>
      </div>
    </article>
  `;
}


function displayPlaces() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedRegion = regionSelect.value;
  const matchingPlaces = places.filter(function (place) {
    const matchesName = place.name.toLowerCase().includes(searchText);
    const matchesState = place.state.toLowerCase().includes(searchText);
    const matchesRegion = selectedRegion === "All regions" || place.region === selectedRegion;

    return (matchesName || matchesState) && matchesRegion;
  });

  resultCount.textContent = `Showing ${matchingPlaces.length} of ${places.length} places`;
  placesGrid.innerHTML = "";

  if (matchingPlaces.length === 0) {
    placesGrid.innerHTML = '<p class="empty-message">No places found. Try another search.</p>';
  } else {
    matchingPlaces.forEach(function (place) {
      placesGrid.innerHTML += createPlaceCard(place);
    });
  }

  addCardButtonEvents(placesGrid);
}

function displayFavourites() {
  const savedPlaces = places.filter(function (place) {
    return favourites.includes(place.id);
  });

  favouritesGrid.innerHTML = "";
  favouriteCount.textContent = favourites.length;
  emptyFavourites.style.display = savedPlaces.length === 0 ? "block" : "none";

  savedPlaces.forEach(function (place) {
    favouritesGrid.innerHTML += createPlaceCard(place);
  });

  addCardButtonEvents(favouritesGrid);
}

function addCardButtonEvents(cardList) {
  const detailsButtons = cardList.querySelectorAll(".details-button");
  const saveButtons = cardList.querySelectorAll(".save-button");

  detailsButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      showPlaceDetails(Number(button.dataset.id));
    });
  });

  saveButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      changeFavourite(Number(button.dataset.id));
    });
  });
}

function changeFavourite(placeId) {
  if (favourites.includes(placeId)) {
    favourites = favourites.filter(function (id) {
      return id !== placeId;
    });
  } else {
    favourites.push(placeId);
  }

  displayPlaces();
  displayFavourites();
}


function showPlaceDetails(placeId) {
  const place = places.find(function (item) {
    return item.id === placeId;
  });

  document.getElementById("detailsTitle").textContent = place.name;
  document.getElementById("detailsLocation").textContent = `${place.state} State | ${place.region}`;
  document.getElementById("detailsType").textContent = `Type: ${place.type}`;
  document.getElementById("detailsDescription").textContent = place.description;
  document.getElementById("detailsTip").textContent = place.tip;
  detailsDialog.showModal();
}


function fillTripDropdown() {
  const tripPlace = document.getElementById("tripPlace");

  places.forEach(function (place) {
    tripPlace.innerHTML += `<option value="${place.id}">${place.name}</option>`;
  });
}


function setMinimumTravelDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  document.getElementById("travelDate").min = `${year}-${month}-${day}`;
}


function showError(errorId, message) {
  document.getElementById(errorId).textContent = message;
}


function submitTripRequest(event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const tripPlace = document.getElementById("tripPlace");
  const travelDate = document.getElementById("travelDate").value;
  const people = Number(document.getElementById("people").value);
  const today = new Date();
  const todayText = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  let hasError = false;

  document.querySelectorAll(".error-message").forEach(function (error) {
    error.textContent = "";
  });
  document.getElementById("successMessage").textContent = "";

  if (fullName.length < 2) {
    showError("nameError", "Please enter at least 2 characters.");
    hasError = true;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError("emailError", "Please enter a valid email address.");
    hasError = true;
  }

  if (tripPlace.value === "") {
    showError("placeError", "Please choose a place to visit.");
    hasError = true;
  }

  if (travelDate === "" || travelDate < todayText) {
    showError("dateError", "Please choose today or a future date.");
    hasError = true;
  }

  if (!Number.isInteger(people) || people < 1 || people > 20) {
    showError("peopleError", "Number of people must be from 1 to 20.");
    hasError = true;
  }

  if (hasError) {
    return;
  }

  const chosenPlace = places.find(function (place) {
    return place.id === Number(tripPlace.value);
  });
  const dateForMessage = new Date(`${travelDate}T00:00:00`).toLocaleDateString();

  document.getElementById("successMessage").textContent =
    `Thank you, ${fullName}! Your request for ${chosenPlace.name} on ${dateForMessage} for ${people} people has been received.`;

  document.getElementById("tripForm").reset();
  setMinimumTravelDate();
}




searchInput.addEventListener("input", displayPlaces);
regionSelect.addEventListener("change", displayPlaces);
document.getElementById("tripForm").addEventListener("submit", submitTripRequest);
document.getElementById("menuButton").addEventListener("click", toggleMenu);
document.getElementById("themeButton").addEventListener("click", toggleTheme);
document.getElementById("closeDialog").addEventListener("click", function () {
  detailsDialog.close();
});

detailsDialog.addEventListener("click", function (event) {
  if (event.target === detailsDialog) {
    detailsDialog.close();
  }
});

// Close the mobile menu after a navigation link is selected.
document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    document.getElementById("navLinks").classList.remove("show-menu");
    document.getElementById("menuButton").setAttribute("aria-expanded", "false");
  });
});

// Set up the page when it first loads.
fillTripDropdown();
setMinimumTravelDate();
showCurrentYear();
displayPlaces();
displayFavourites();
