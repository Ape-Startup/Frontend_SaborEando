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

    // Remove todos os marcadores do mapa
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
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
                        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    });

                    // Adiciona marcador apenas se corresponder à pesquisa
                    L.marker([restaurante.latitude, restaurante.longitude], {
                        icon: restauranteIcon
                    }).addTo(map)
                        .bindPopup(`<div class="cardMap">
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
    // Remove todos os marcadores do mapa
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Adiciona novamente os marcadores de restaurante ao mapa
    fetch('./mapa.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(function (restaurante) {
                const restauranteIcon = L.icon({
                    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });

                L.marker([restaurante.latitude, restaurante.longitude], {
                    icon: restauranteIcon
                }).addTo(map)
                    .bindPopup(`<div class="cardMap">
                                <h3 class="nomeRestaurante">${restaurante.nome}</h3>
                                <p>${restaurante.endereco} </p> 
                                <h4> Telefone: ${restaurante.telefone}<h4>
                             </div>`);
            });
        })
        .catch(error => console.error('Erro ao carregar as localizações:', error));
}
