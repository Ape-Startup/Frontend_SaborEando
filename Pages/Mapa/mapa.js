var map;
var redIcon;
var userMarker;
var userLatitude;
var userLongitude;

redIcon = L.icon({
    iconUrl: '../../Assets/img/iconUserPin.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [45, 81],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [71, 58]
});

var specialIcon = L.icon({
    iconUrl: '../../Assets/img/iconSeaPlacePin.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [45, 81],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [71, 58]
});

var cotidianoIcon = L.icon({
    iconUrl: '../../Assets/img/iconCotidianoPin.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [45, 81],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [71, 58]
});

function success(position) {
    console.log(position.coords.latitude, position.coords.longitude);
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;

    if (map === undefined) {
        map = L.map('map').setView([userLatitude, userLongitude], 14);
    } else {
        map.remove();
        map = L.map('map').setView([userLatitude, userLongitude], 14);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markerPopupContent = `
    <div class="popup-content">
        <h4>Você está aqui</h4>
    </div>`;

    if (userMarker) {
        userMarker.setLatLng([userLatitude, userLongitude]);
    } else {
        userMarker = L.marker([userLatitude, userLongitude], {
            icon: redIcon
        }).addTo(map);
    }
    userMarker.bindPopup(markerPopupContent).openPopup();

    fetch('./mapa.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(function (restaurante) {
                addMarker(restaurante);
            });
        })
        .catch(error => console.error('Erro ao carregar as localizações:', error));
}

function error(error) {
    console.log(error);
}

var watchID = navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});

document.getElementById("searchInput").addEventListener("input", function() {
    search();
});

document.getElementById("filtroDoces").addEventListener("click", function() {
    filterMarkers();
});

document.getElementById("filtroFrutosDoMar").addEventListener("click", function() {
    filterMarkers();
});

document.getElementById("filtroCotidiano").addEventListener("click", function() {
    filterMarkers();
});

function search() {
    var searchTerm = document.getElementById("searchInput").value.toLowerCase();

    if (searchTerm === "") {
        initializeMap();
        return;
    }

    var visibleMarkers = [];
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker && layer !== userMarker && map.getBounds().contains(layer.getLatLng())) {
            visibleMarkers.push(layer);
        }
    });

    var matchingMarkers = visibleMarkers.filter(function(marker) {
        var popupContent = marker.getPopup().getContent().toLowerCase();
        return popupContent.includes(searchTerm);
    });

    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker && layer !== userMarker && !matchingMarkers.includes(layer)) {
            map.removeLayer(layer);
        }
    });

    if (matchingMarkers.length === 0) {
        // Se não houver correspondências, mostre uma mensagem ao usuário ou tome outra ação apropriada.
    }
}

function filterMarkers() {
    var filtroDoces = document.getElementById("filtroDoces").checked;
    var filtroFrutosDoMar = document.getElementById("filtroFrutosDoMar").checked;
    var filtroCotidiano = document.getElementById("filtroCotidiano").checked;

    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker && layer !== userMarker) {
            map.removeLayer(layer);
        }
    });

    fetch('./mapa.json')
        .then(response => response.json())
        .then(data => {
            if (!filtroDoces && !filtroFrutosDoMar && !filtroCotidiano) {
                data.forEach(function (restaurante) {
                    addMarker(restaurante);
                });
            } else {
                data.forEach(function (restaurante) {
                    if (filtroDoces && restaurante.id < 100) {
                        addMarker(restaurante);
                    } else if (filtroFrutosDoMar && restaurante.id >= 100 && restaurante.id < 199) {
                        addMarker(restaurante);
                    } else if (filtroCotidiano && restaurante.id >= 200 && restaurante.id < 300) {
                        addMarker(restaurante);
                    }
                });
            }
        })
        .catch(error => console.error('Erro ao carregar as localizações:', error));
}

function addMarker(restaurante) {
    let restauranteIcon;

    if (restaurante.id >= 100 && restaurante.id < 199) {
        restauranteIcon = specialIcon;
    } else if (restaurante.id >= 200 && restaurante.id < 300) {
        restauranteIcon = cotidianoIcon;
    } else {
        restauranteIcon = L.icon({
            iconUrl: '../../Assets/img/iconSweetPlacePin.svg',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [45, 81],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [71, 58]
        });
    }

    L.marker([restaurante.latitude, restaurante.longitude], {
        icon: restauranteIcon
    }).addTo(map)
        .bindPopup(`<div class="cardMap">
                    <div class=imgDiv> 
                    <img class=imgMap src="${restaurante.img}" alt="${restaurante.nome}">
                    </div>
                    <h3 class="nomeRestaurante">${restaurante.nome}</h3>
                    <p>${restaurante.endereco} </p> 
                    <h4> Telefone: ${restaurante.telefone}<h4>
                </div>`);
}

function initializeMap() {
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker && layer !== userMarker) {
            map.removeLayer(layer);
        }
    });

    fetch('./mapa.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(function (restaurante) {
                addMarker(restaurante);
            });
        })
        .catch(error => console.error('Erro ao carregar as localizações:', error));
}

// Função para alternar a visibilidade do contêiner de filtro
function toggleFilter() {
    var filterContainer = document.getElementById('filterContainer');
    if (filterContainer.style.display === "none" || filterContainer.style.display === "") {
        filterContainer.style.display = "block";
    } else {
        filterContainer.style.display = "none";
    }
}

// Inicialize o filtro como oculto
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('filterContainer').style.display = 'none';
});
