// ------------------------------
// Biodiversity observations
// ------------------------------
//
// Add your real observations here.
//
// location format:
// [latitude, longitude]
//
// IMPORTANT:
// Use approximate locations when publishing
// the website. Do not publish your exact
// home or school location.
// ------------------------------


const observations = [
    {
        id: "eurema-hecabe",
        name: "Common Grass Yellow",
        scientificName: "Eurema hecabe",
        category: "Insects",
        type: "Butterfly",
        location: "Chiang Mai",
        date: "September 2026",
        coordinates: []
    },

    {
        id: "evarcha-bulbosa",
        name: "Evarcha bulbosa",
        scientificName: "Evarcha bulbosa",
        category: "Arachnids",
        type: "Spider",
        location: "Chiang Mai",
        date: "September 2026",
        coordinates: []
    },

    {
        id: "sphenomorphus-maculatus",
        name: "Spotted Forest Skink",
        scientificName: "Sphenomorphus maculatus",
        category: "Reptiles",
        type: "Lizard",
        location: "Chiang Mai",
        date: "September 2026",
        coordinates: [18.7602512, 98.9048303]
    },

    {
        id: "dacrymyces-spathularia",
        name: "Fan-shaped Jelly Fungus",
        scientificName: "Dacrymyces spathularia",
        category: "Other",
        type: "Jelly Fungus",
        location: "Chiang Mai",
        date: "September 2026",
        coordinates: [18.7603642, 98.9050503]
    },

    {
        id: "papilio-demoleus",
        name: "Lime Swallowtail",
        scientificName: "Papilio demoleus Linnaeus",
        category: "Insects",
        type: "Butterfly",
        location: "Chiang Mai",
        date: "September 2026",
        coordinates: [18.7600877, 98.9051264]
    },

    {
        id: "gea-spinipes",
        name: "Spiny Shoulder-horn Spider",
        scientificName: "Gea spinipes",
        category: "Arachnids",
        type: "Spider",
        location: "Chiang Mai",
        date: "September 2026",
        coordinates: [18.7603994, 98.9050174]
    },

    {
        id: "catapicephala-sp.",
        name: "Blue-green Bottle Fly / Catapicephala sp.",
        scientificName: "Catapicephala sp.",
        category: "Insects",
        type: "Fly",
        location: "Chiang Mai",
        date: "September 2026",
        coordinates: [18.7603747, 98.9049544]
    },

    {
        id: "orthetrum-glaucum",
        name: "Blue Marsh Hawk",
        scientificName: "Orthetrum glaucum",
        category: "Insects",
        type: "Dragonfly",
        location: "Chiang Mai",
        date: "September 2026",
        coordinates: [18.7600826, 98.9049815]
    },

    {
        id: "catopsilia-pomona",
        name: "Lemon Emigrant",
        scientificName: "Catopsilia pomona",
        category: "Insects",
        type: "Butterfly",
        location: "Chiang Mai",
        date: "September 2026",
        coordinates: [18.7600470, 98.9050818]
    },

    {
        id: "anastomus-oscitans",
        name: "Asian Openbill",
        scientificName: "Anastomus oscitans",
        category: "Birds",
        type: "Stork",
        location: "Chiang Mai",
        date: "September 2026",
        coordinates: [18.7509902, 99.0358442]
    },

    {
        id: "delias-pasithoe",
        name: "Red-based Jezebel",
        scientificName: "Delias pasithoe",
        category: "Insects",
        type: "Butterfly",
        location: "Chiang Dao",
        date: "September 2026",
        coordinates: [19.3667320, 98.9270494]
    },

    {
        id: "trichonephila-pilipes",
        name: "Giant Golden Orbweaver",
        scientificName: "Trichonephila pilipes",
        category: "Arachnids",
        type: "Spider",
        location: "Chiang Dao",
        date: "September 2026",
        coordinates: [19.3665182, 98.9271829]
    },

    {
        id: "copera-marginipes",
        name: "Yellow Featherlegs",
        scientificName: "Copera marginipes",
        category: "Insects",
        type: "Damselfly",
        location: "Chiang Dao",
        date: "September 2026",
        coordinates: [19.3671103, 98.9275879]
    }
];


// ------------------------------
// Map
// ------------------------------

const map =
    L.map("biodiversityMap");


// Center on Chiang Mai

map.setView(
    [18.7883, 98.9853],
    10
);


// OpenStreetMap tiles

// Esri World Street Map

L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
        maxZoom: 19,

        attribution:
            "Sources: Esri, HERE, Garmin, USGS, Intermap, INCREMENT P, NRCan, Esri Japan, METI, TomTom"
    }
).addTo(map);


// ------------------------------
// Marker layer
// ------------------------------

let markerLayer =
    L.layerGroup().addTo(map);


// ------------------------------
// Category colors
// ------------------------------
//
// These are only marker colors.
// You can change them later.
//

const categoryColors = {

    Birds: "#5d7fa3",

    Mammals: "#8b6f5c",

    Reptiles: "#708f6a",

    Amphibians: "#5f9183",

    Insects: "#c49a52",

    Arachnids: "#806b87",

    Plants: "#6d9a6b",

    Other: "#888888"

};


// ------------------------------
// Get marker color
// ------------------------------

function getCategoryColor(category) {

    return (
        categoryColors[category]
        || categoryColors.Other
    );

}


// ------------------------------
// Other category logic
// ------------------------------

const mainCategories = [

    "Birds",
    "Mammals",
    "Reptiles",
    "Amphibians",
    "Insects",
    "Arachnids",
    "Plants"

];


function matchesCategory(
    observation,
    selectedCategory
) {

    if (
        selectedCategory === "All"
    ) {
        return true;
    }


    if (
        selectedCategory === "Other"
    ) {

        return !mainCategories.includes(
            observation.category
        );

    }


    return (
        observation.category ===
        selectedCategory
    );

}


// ------------------------------
// Display observations
// ------------------------------

function displayObservations(
    selectedCategory = "All"
) {

    markerLayer.clearLayers();


    const filtered =
        observations.filter(
            observation =>
                matchesCategory(
                    observation,
                    selectedCategory
                )
        );


    filtered.forEach(
        observation => {

            if (
    !Array.isArray(observation.coordinates) ||
    observation.coordinates.length !== 2
) {
    return;
}

            const color =
                getCategoryColor(
                    observation.category
                );


            const marker =
                L.circleMarker(
                    observation.coordinates,
                    {

                        radius: 7,
                        fillColor: color,
                        color: "#ffffff",
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.85

                    }
                );


            // ----------------------
            // Popup
            // ----------------------

            marker.bindPopup(`
    <div class="map-popup">
        <p class="popup-category">${observation.category}</p >

        <h3>${observation.name}</h3>

        <p class="popup-scientific">
            ${observation.scientificName}
        </p >

        <p>${observation.location}</p >
        <p>${observation.date}</p >

        <a
            href="./species-detail.html?id=${observation.id}"
            class="popup-link"
        >
            View Species →
        </a >
    </div>
`);


            markerLayer.addLayer(
                marker
            );

        }
    );


    // ----------------------
    // Observation count
    // ----------------------

    const count =
        document.getElementById(
            "observationCount"
        );

    if (count) {

        count.textContent =
            `${filtered.length} observation${
                filtered.length === 1
                    ? ""
                    : "s"
            }`;

    }

}


// ------------------------------
// Filter buttons
// ------------------------------

const filterButtons =
    document.querySelectorAll(
        "#mapFilters button"
    );


filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    btn =>
                        btn.classList.remove(
                            "active"
                        )
                );


                this.classList.add(
                    "active"
                );


                displayObservations(
                    this.dataset.category
                );

            }
        );

    }
);


// ------------------------------
// Initial map
// ------------------------------

displayObservations("All");