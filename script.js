// ==========================================
// URBANNEST REAL ESTATE WEBSITE
// COMPLETE WORKING SCRIPT.JS
// ==========================================


// ==========================================
// PROPERTY DATA
// ==========================================

const properties = [

    {
        id: 1,
        title: "Modern Luxury Apartment",
        location: "DHA Phase 6, Karachi",
        city: "Karachi",
        type: "Apartment",
        purpose: "buy",
        price: 18500000,
        beds: 3,
        baths: 3,
        area: 1800,
        tag: "Featured",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
    },

    {
        id: 2,
        title: "Beautiful Family House",
        location: "Gulshan-e-Iqbal, Karachi",
        city: "Karachi",
        type: "House",
        purpose: "buy",
        price: 32000000,
        beds: 5,
        baths: 4,
        area: 3000,
        tag: "Popular",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
    },

    {
        id: 3,
        title: "Premium Office Space",
        location: "Shahrah-e-Faisal, Karachi",
        city: "Karachi",
        type: "Office",
        purpose: "commercial",
        price: 12500000,
        beds: 0,
        baths: 2,
        area: 2200,
        tag: "Commercial",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
    },

    {
        id: 4,
        title: "Elegant 2 Bedroom Apartment",
        location: "Clifton Block 4, Karachi",
        city: "Karachi",
        type: "Apartment",
        purpose: "rent",
        price: 210000,
        beds: 2,
        baths: 2,
        area: 1400,
        tag: "For Rent",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
    },

    {
        id: 5,
        title: "Spacious Family Villa",
        location: "DHA Phase 5, Lahore",
        city: "Lahore",
        type: "House",
        purpose: "buy",
        price: 45000000,
        beds: 6,
        baths: 5,
        area: 4200,
        tag: "New",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"
    },

    {
        id: 6,
        title: "Green View Development Plot",
        location: "Bahria Town, Islamabad",
        city: "Islamabad",
        type: "Plot",
        purpose: "buy",
        price: 36000000,
        beds: 0,
        baths: 0,
        area: 10,
        tag: "Plot",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85"
    }

];


// ==========================================
// DOM ELEMENTS
// ==========================================

const propertyGrid = document.getElementById("propertyGrid");

const searchButton = document.getElementById("searchBtn");

const locationFilter = document.getElementById("locationFilter");

const typeFilter = document.getElementById("typeFilter");

const priceFilter = document.getElementById("priceFilter");

const resultCount = document.getElementById("resultCount");

const clearFilters = document.getElementById("clearFilters");

const emptyState = document.getElementById("emptyState");


// ==========================================
// SEARCH STATE
// ==========================================

let currentMode = "buy";


// ==========================================
// FORMAT PRICE
// ==========================================

function formatPrice(price, purpose) {

    // Rent prices
    if (purpose === "rent") {

        if (price >= 100000) {
            return "PKR " + (price / 100000).toFixed(2) + " Lakh / month";
        }

        return "PKR " + price.toLocaleString() + " / month";
    }


    // Crore
    if (price >= 10000000) {

        return "PKR " + (price / 10000000).toFixed(2) + " Crore";

    }


    // Lakh
    if (price >= 100000) {

        return "PKR " + (price / 100000).toFixed(2) + " Lakh";

    }


    return "PKR " + price.toLocaleString();

}


// ==========================================
// GET PRICE FILTER
// ==========================================

function matchesPrice(property) {

    const selectedPrice = priceFilter?.value || "all";

    if (selectedPrice === "all") {
        return true;
    }


    // Budget filter is mainly for purchase properties
    if (property.purpose === "rent") {
        return selectedPrice === "all";
    }


    const priceInCrore = property.price / 10000000;


    if (selectedPrice === "0-5") {

        return priceInCrore < 5;

    }


    if (selectedPrice === "5-10") {

        return priceInCrore >= 5 && priceInCrore <= 10;

    }


    if (selectedPrice === "10+") {

        return priceInCrore > 10;

    }


    return true;

}


// ==========================================
// CREATE PROPERTY CARD
// ==========================================

function createPropertyCard(property) {

    let details = "";


    if (property.beds > 0) {

        details += `
            <span>🛏 ${property.beds} Beds</span>
        `;

    }


    if (property.baths > 0) {

        details += `
            <span>🚿 ${property.baths} Baths</span>
        `;

    }


    details += `
        <span>📐 ${property.area} ${property.type === "Plot" ? "Marla" : "Sq Ft"}</span>
    `;


    return `

        <article class="property-card" data-id="${property.id}">

            <div class="property-image">

                <img
                    src="${property.image}"
                    alt="${property.title}"
                    loading="lazy"
                    onerror="this.style.display='none'"
                >

                <span class="property-tag">
                    ${property.tag}
                </span>

                <button
                    class="favorite-btn"
                    data-id="${property.id}"
                    aria-label="Add to favorites"
                >
                    ♡
                </button>

            </div>


            <div class="property-body property-content">

                <h3 class="property-title">
                    ${property.title}
                </h3>


                <p class="property-location">
                    📍 ${property.location}
                </p>


                <div class="property-price">
                    ${formatPrice(property.price, property.purpose)}
                </div>


                <div class="property-specs property-details">

                    ${details}

                </div>


                <div class="property-footer">

                    <span class="muted-note">
                        ${property.type}
                    </span>

                    <button
                        class="view-property-btn"
                        data-action="view"
                        data-id="${property.id}"
                    >
                        View Property →
                    </button>

                </div>

            </div>

        </article>

    `;

}


// ==========================================
// FILTER PROPERTIES
// ==========================================

function getFilteredProperties() {

    const selectedLocation =
        locationFilter?.value || "all";

    const selectedType =
        typeFilter?.value || "all";


    return properties.filter(property => {


        // Buy / Rent / Commercial
        const modeMatch =
            property.purpose === currentMode;


        // Location
        const locationMatch =
            selectedLocation === "all" ||
            property.city === selectedLocation;


        // Property type
        const typeMatch =
            selectedType === "all" ||
            property.type === selectedType;


        // Price
        const priceMatch =
            matchesPrice(property);


        return (
            modeMatch &&
            locationMatch &&
            typeMatch &&
            priceMatch
        );

    });

}


// ==========================================
// DISPLAY PROPERTIES
// ==========================================

function displayProperties(list = getFilteredProperties()) {

    if (!propertyGrid) {
        return;
    }


    // Update result count
    if (resultCount) {
        resultCount.textContent = list.length;
    }


    // No results
    if (list.length === 0) {

        propertyGrid.innerHTML = "";

        propertyGrid.classList.add("hidden");

        if (emptyState) {
            emptyState.classList.remove("hidden");
        }

        return;
    }


    // Results found
    propertyGrid.classList.remove("hidden");

    if (emptyState) {
        emptyState.classList.add("hidden");
    }


    propertyGrid.innerHTML =
        list.map(property => createPropertyCard(property)).join("");


    updateFavoriteButtons();

}


// ==========================================
// BUY / RENT / COMMERCIAL TABS
// ==========================================

const searchTabs =
    document.querySelectorAll(".search-tab");


searchTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        currentMode =
            tab.dataset.mode;


        // Active tab
        searchTabs.forEach(item => {

            item.classList.remove("active");

            item.setAttribute(
                "aria-selected",
                "false"
            );

        });


        tab.classList.add("active");

        tab.setAttribute(
            "aria-selected",
            "true"
        );


        displayProperties();

    });

});


// ==========================================
// SEARCH BUTTON
// ==========================================

if (searchButton) {

    searchButton.addEventListener("click", () => {

        const results =
            getFilteredProperties();


        displayProperties(results);


        const propertiesSection =
            document.getElementById("properties");


        if (propertiesSection) {

            propertiesSection.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

}


// ==========================================
// LOCATION FILTER
// ==========================================

if (locationFilter) {

    locationFilter.addEventListener("change", () => {

        displayProperties();

    });

}


// ==========================================
// PROPERTY TYPE FILTER
// ==========================================

if (typeFilter) {

    typeFilter.addEventListener("change", () => {

        displayProperties();

    });

}


// ==========================================
// PRICE FILTER
// ==========================================

if (priceFilter) {

    priceFilter.addEventListener("change", () => {

        displayProperties();

    });

}


// ==========================================
// RESET FILTERS
// ==========================================

function resetFilters() {

    currentMode = "buy";


    if (locationFilter) {
        locationFilter.value = "all";
    }


    if (typeFilter) {
        typeFilter.value = "all";
    }


    if (priceFilter) {
        priceFilter.value = "all";
    }


    searchTabs.forEach(tab => {

        const active =
            tab.dataset.mode === "buy";


        tab.classList.toggle(
            "active",
            active
        );


        tab.setAttribute(
            "aria-selected",
            active
        );

    });


    displayProperties();

}


// Reset button
if (clearFilters) {

    clearFilters.addEventListener(
        "click",
        resetFilters
    );

}


// Empty state reset button
const emptyReset =
    document.getElementById("emptyReset");


if (emptyReset) {

    emptyReset.addEventListener(
        "click",
        resetFilters
    );

}


// View all listings
const viewAllButton =
    document.getElementById("viewAllBtn");


if (viewAllButton) {

    viewAllButton.addEventListener("click", () => {

        resetFilters();


        const propertiesSection =
            document.getElementById("properties");


        if (propertiesSection) {

            propertiesSection.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

}


// ==========================================
// FAVORITES
// ==========================================

function getFavorites() {

    try {

        return JSON.parse(
            localStorage.getItem("urbannestFavorites")
        ) || [];

    } catch {

        return [];

    }

}


function saveFavorites(favorites) {

    localStorage.setItem(
        "urbannestFavorites",
        JSON.stringify(favorites)
    );

}


function toggleFavorite(id) {

    let favorites =
        getFavorites();


    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                favoriteId => favoriteId !== id
            );

    } else {

        favorites.push(id);

    }


    saveFavorites(favorites);

    updateFavoriteButtons();

}


function updateFavoriteButtons() {

    const favorites =
        getFavorites();


    document
        .querySelectorAll(".favorite-btn")
        .forEach(button => {

            const id =
                Number(button.dataset.id);


            if (favorites.includes(id)) {

                button.textContent = "♥";

                button.classList.add("active");

            } else {

                button.textContent = "♡";

                button.classList.remove("active");

            }

        });

}


// ==========================================
// PROPERTY GRID CLICK
// ==========================================

if (propertyGrid) {

    propertyGrid.addEventListener("click", event => {


        // Favorite button
        const favoriteButton =
            event.target.closest(".favorite-btn");


        if (favoriteButton) {

            const id =
                Number(favoriteButton.dataset.id);


            toggleFavorite(id);

            return;

        }


        // View property button
        const viewButton =
            event.target.closest(
                '[data-action="view"]'
            );


        if (viewButton) {

            const id =
                Number(viewButton.dataset.id);


            viewProperty(id);

        }

    });

}


// ==========================================
// VIEW PROPERTY
// ==========================================

function viewProperty(id) {

    const property =
        properties.find(
            item => item.id === id
        );


    if (!property) {
        return;
    }


    let modal =
        document.getElementById("propertyModal");


    // Support old ID too
    if (!modal) {

        modal =
            document.getElementById("property-modal");

    }


    if (!modal) {

        alert(

            property.title +
            "\n\n" +

            "Location: " +
            property.location +
            "\n" +

            "Price: " +
            formatPrice(
                property.price,
                property.purpose
            ) +
            "\n" +

            "Area: " +
            property.area +
            " Sq Ft"

        );

        return;

    }


    modal.innerHTML = `

        <div class="modal-overlay" data-close-modal>

            <div
                class="property-modal-content"
                onclick="event.stopPropagation()"
            >

                <button
                    class="close-modal"
                    id="dynamicCloseModal"
                    aria-label="Close"
                >
                    ×
                </button>


                <img
                    src="${property.image}"
                    alt="${property.title}"
                >


                <div class="modal-info">

                    <span class="property-type">
                        ${property.tag}
                    </span>


                    <h2>
                        ${property.title}
                    </h2>


                    <p>
                        📍 ${property.location}
                    </p>


                    <h3>
                        ${formatPrice(
                            property.price,
                            property.purpose
                        )}
                    </h3>


                    <div class="modal-details">

                        ${
                            property.beds > 0
                            ? `<span>🛏 ${property.beds} Bedrooms</span>`
                            : ""
                        }

                        ${
                            property.baths > 0
                            ? `<span>🚿 ${property.baths} Bathrooms</span>`
                            : ""
                        }

                        <span>
                            📐 ${property.area}
                            ${property.type === "Plot" ? "Marla" : "Sq Ft"}
                        </span>

                    </div>


                    <button
                        class="contact-agent-btn"
                        id="contactAgentBtn"
                    >
                        Contact Agent
                    </button>

                </div>

            </div>

        </div>

    `;


    modal.classList.remove("hidden");

    modal.classList.add("active");


    // Close button
    const closeButton =
        document.getElementById(
            "dynamicCloseModal"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closePropertyModal
        );

    }


    // Contact agent
    const contactButton =
        document.getElementById(
            "contactAgentBtn"
        );


    if (contactButton) {

        contactButton.addEventListener(
            "click",
            () => contactAgent(property.title)
        );

    }


    // Click outside
    const overlay =
        modal.querySelector(".modal-overlay");


    if (overlay) {

        overlay.addEventListener(
            "click",
            event => {

                if (
                    event.target === overlay
                ) {

                    closePropertyModal();

                }

            }
        );

    }

}


// ==========================================
// CLOSE PROPERTY MODAL
// ==========================================

function closePropertyModal() {

    const modal =
        document.getElementById("propertyModal") ||
        document.getElementById("property-modal");


    if (!modal) {
        return;
    }


    modal.classList.remove("active");

    modal.classList.add("hidden");

    modal.innerHTML = "";

}


// ==========================================
// ESC KEY FOR MODAL
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closePropertyModal();

        }

    }
);


// ==========================================
// CONTACT AGENT / WHATSAPP
// ==========================================

function contactAgent(propertyName) {

    const phone =
        "923001234567";


    const message =
        `Hi, I am interested in ${propertyName}. Please provide more details.`;


    const whatsappURL =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


// ==========================================
// MOBILE MENU
// ==========================================

const menuButton =
    document.getElementById("menuBtn") ||
    document.querySelector(".menu-btn");


const mobileMenu =
    document.getElementById("mobileMenu") ||
    document.querySelector(".nav-menu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle("open");

            mobileMenu.classList.toggle("active");

        }
    );

}


// ==========================================
// MOBILE MENU LINKS
// ==========================================

if (mobileMenu) {

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove("open");

                    mobileMenu.classList.remove("active");

                }
            );

        });

}


// ==========================================
// AREA CARDS
// ==========================================

document
    .querySelectorAll(".area-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const area =
                    card.dataset.area;


                if (locationFilter) {

                    locationFilter.value =
                        area;

                }


                displayProperties();


                const propertiesSection =
                    document.getElementById(
                        "properties"
                    );


                if (propertiesSection) {

                    propertiesSection.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }
        );

    });


// ==========================================
// INITIAL LOAD
// ==========================================

displayProperties();

updateFavoriteButtons();

console.log(
    "UrbanNest loaded successfully."
);