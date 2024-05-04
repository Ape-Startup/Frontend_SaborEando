var map;
var redIcon;
var userMarker; // Variável global para armazenar o marcador do usuário
var userLatitude; // Variável global para armazenar a latitude do usuário
var userLongitude; // Variável global para armazenar a longitude do usuário

// icone do usuario
redIcon = L.icon({
    iconUrl: '../../Assets/img/iconUserPin.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [45, 81],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [71, 58]
});

// Geolocalização
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
        <h4>Sua Localização atual</h4>
    </div>`;

    // Adiciona ou atualiza o marcador do usuário
    if (userMarker) {
        userMarker.setLatLng([userLatitude, userLongitude]);
    } else {
        userMarker = L.marker([userLatitude, userLongitude], {
            icon: redIcon
        }).addTo(map);
    }
    userMarker.bindPopup(markerPopupContent).openPopup();

    // Adiciona os marcadores dos restaurantes
    fetch('./mapa.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(function (restaurante) {
                const restauranteIcon = L.icon({
                    iconUrl: '../../Assets/img/iconPlacePin.svg',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                    iconSize: [45, 81],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [71, 58]
                });

                L.marker([restaurante.latitude, restaurante.longitude], {
                    icon: restauranteIcon
                }).addTo(map)
                    .bindPopup(`<div class="cardMap">
                    <div class=imgDiv> 
                    <img  class=imgMap src="${restaurante.img}" alt="${restaurante.nome}">
                    </div>
                                <h3 class="nomeRestaurante">${restaurante.nome}</h3>
                                <p>${restaurante.endereco} </p> 
                                <h4> Telefone: ${restaurante.telefone}<h4>
                             </div>`);
            });
        })
        .catch(error => console.error('Erro ao carregar as localizações:', error));
}

function error(error) {
    console.log(error);
}

// entrega a localização do usuario
var watchID = navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});

// Adicione um evento de input ao campo de busca
document.getElementById("searchInput").addEventListener("input", function() {
    search(); // Chama a função search() a cada vez que o conteúdo do campo de busca é alterado
});

// Função para lidar com a pesquisa
function search() {
    // Obtém o valor digitado pelo usuário
    var searchTerm = document.getElementById("searchInput").value.toLowerCase();

    // Verifica se o termo de pesquisa está vazio
    if (searchTerm === "") {
        // Recarrega todos os marcadores do mapa
        initializeMap();
        return; // Encerra a função aqui para evitar que o restante do código seja executado
    }

    // Remove todos os marcadores dos restaurantes do mapa
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker && layer !== userMarker) {
            map.removeLayer(layer);
        }
    });

    // Adiciona novamente apenas os marcadores dos restaurantes que correspondem à pesquisa
    fetch('./mapa.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(function (restaurante) {
                // Verifica se o nome do restaurante contém o termo de pesquisa
                if (restaurante.nome.toLowerCase().includes(searchTerm)) {
                    const restauranteIcon = L.icon({
                        iconUrl: '../../Assets/img/iconPlacePin.svg',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                        iconSize: [45, 81],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [71, 58]
                    });

                    // Adiciona marcador apenas se corresponder à pesquisa
                    L.marker([restaurante.latitude, restaurante.longitude], {
                        icon: restauranteIcon
                    }).addTo(map)
                        .bindPopup(`<div class="cardMap">
                        <div class=imgDiv> 
                        <img  class=imgMap src="${restaurante.img}" alt="${restaurante.nome}">
                        </div>
                                    <h3 class="nomeRestaurante">${restaurante.nome}</h3>
                                    <p>${restaurante.endereco} </p> 
                                    <h4> Telefone: ${restaurante.telefone}<h4>
                                 </div>`);
                }
            });
        })
        .catch(error => console.error('Erro ao carregar as localizações:', error));
}

// Função para inicializar o mapa
function initializeMap() {
    // Remove todos os marcadores dos restaurantes do mapa
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker && layer !== userMarker) {
            map.removeLayer(layer);
        }
    });

    // Adiciona novamente os marcadores de restaurante ao mapa
    fetch('./mapa.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(function (restaurante) {
                const restauranteIcon = L.icon({
                    iconUrl: '../../Assets/img/iconPlacePin.svg',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                    iconSize: [45, 81],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [71, 58]
                });

                L.marker([restaurante.latitude, restaurante.longitude], {
                    icon: restauranteIcon
                }).addTo(map)
                    .bindPopup(`<div class="cardMap">
                                <div class=imgDiv> 
                                <img  class=imgMap src="${restaurante.img}" alt="${restaurante.nome}">
                                </div>
                                <h3 class="nomeRestaurante">${restaurante.nome}</h3>
                                <p>${restaurante.endereco} </p> 
                                <h4> Telefone: ${restaurante.telefone}<h4>
                             </div>`);
            });
        })
        .catch(error => console.error('Erro ao carregar as localizações:', error));
}
