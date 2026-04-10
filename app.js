// 22 ESA Member States and their space agency / relevant office HQ
const agencies = [
    { name: "FFG (Austrian Space Agency)", country: "Austria", city: "Vienna", address: "Sensengasse 1, 1090 Vienna", lat: 48.2201, lng: 16.3533 },
    { name: "BELSPO", country: "Belgium", city: "Brussels", address: "WTC III, Simon Bolivarlaan 30, 1000 Brussels", lat: 50.8596, lng: 4.3541 },
    { name: "Ministry of Transport", country: "Czech Republic", city: "Prague", address: "nábř. L. Svobody 1222/12, 110 15 Nové Město", lat: 50.0911, lng: 14.4323 },
    { name: "Min. of Higher Ed. and Science", country: "Denmark", city: "Copenhagen", address: "Børsgade 4, 1215 København K", lat: 55.6766, lng: 12.5855 },
    { name: "Estonian Space Office", country: "Estonia", city: "Tallinn", address: "Sepise 7, 11415 Tallinn", lat: 59.4215, lng: 24.7951 },
    { name: "Finnish Space Office", country: "Finland", city: "Helsinki", address: "Porkkalankatu 1, 00180 Helsinki", lat: 60.1636, lng: 24.9149 },
    { name: "CNES", country: "France", city: "Paris", address: "2 Place Maurice Quentin, 75039 Paris", lat: 48.8614, lng: 2.3456 },
    { name: "DLR", country: "Germany", city: "Cologne", address: "Linder Höhe, 51147 Köln", lat: 50.8540, lng: 7.1232 },
    { name: "Hellenic Space Center", country: "Greece", city: "Athens", address: "Kymis Ave, 153 41 Ag. Paraskevi", lat: 38.0163, lng: 23.8242 },
    { name: "Hungarian Space Office", country: "Hungary", city: "Budapest", address: "Fő u. 44-50, 1011 Budapest", lat: 47.5029, lng: 19.0381 },
    { name: "Enterprise Ireland", country: "Ireland", city: "Dublin", address: "The Plaza, East Point Business Park", lat: 53.3601, lng: -6.2166 },
    { name: "ASI", country: "Italy", city: "Rome", address: "Via del Politecnico, 00133 Rome", lat: 41.8624, lng: 12.6347 },
    { name: "Luxembourg Space Agency", country: "Luxembourg", city: "Luxembourg City", address: "19-21, blvd Royal, L-2449", lat: 49.6117, lng: 6.1264 },
    { name: "NSO", country: "Netherlands", city: "The Hague", address: "Prinses Beatrixlaan 2, 2595 AL The Hague", lat: 52.0811, lng: 4.3270 },
    { name: "NOSA", country: "Norway", city: "Oslo", address: "Drammensveien 165, 0277 Oslo", lat: 59.9205, lng: 10.6865 },
    { name: "POLSA", country: "Poland", city: "Gdansk", address: "Trzy Lipy 3, 80-172 Gdańsk", lat: 54.3644, lng: 18.5779 },
    { name: "PT Space", country: "Portugal", city: "Lisbon", address: "Av. da República 16, 1050-191 Lisboa", lat: 38.7348, lng: -9.1450 },
    { name: "ROSA", country: "Romania", city: "Bucharest", address: "Str. Mendeleev nr. 21-25, Sector 1", lat: 44.4426, lng: 26.0955 },
    { name: "Agencia Espacial Española", country: "Spain", city: "Seville", address: "Edificio CREA, 41015 Sevilla", lat: 37.4095, lng: -5.9922 },
    { name: "SNSA", country: "Sweden", city: "Solna", address: "Hemvärnsgatan 15, 171 54 Solna", lat: 59.3524, lng: 17.9712 },
    { name: "Swiss Space Office", country: "Switzerland", city: "Bern", address: "Einsteinstrasse 2, 3003 Bern", lat: 46.9416, lng: 7.4521 },
    { name: "UK Space Agency", country: "United Kingdom", city: "Swindon", address: "Polaris House, Swindon SN2 1SZ", lat: 51.5683, lng: -1.7876 }
];

// Initialize Map
const map = L.map('map', {
    center: [50.0, 10.0],
    zoom: 4,
    zoomControl: false // custom position
});
L.control.zoom({ position: 'bottomright' }).addTo(map);

// Add stunning dark carto map tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

const tableBody = document.getElementById('agency-table-body');
const markers = [];

// Custom space marker icon
const spaceIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

agencies.forEach((agency, index) => {
    // Add Marker
    const marker = L.marker([agency.lat, agency.lng], { icon: spaceIcon }).addTo(map);
    
    const popupContent = `
        <div class="text-sm bg-gray-900 text-white p-1 rounded">
            <strong class="text-blue-400 block">${agency.name}</strong>
            <span class="text-xs text-gray-400">${agency.city}, ${agency.country}</span><br>
            <span class="text-xs text-gray-500">${agency.address}</span>
        </div>
    `;
    marker.bindPopup(popupContent, {
        className: 'custom-popup'
    });
    markers.push(marker);

    // Add Table Row
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-800/50 cursor-pointer transition-colors duration-200';
    row.innerHTML = `
        <td class="px-4 py-3 font-semibold text-blue-400">${agency.name}</td>
        <td class="px-4 py-3">${agency.country}</td>
        <td class="px-4 py-3">${agency.city}</td>
        <td class="px-4 py-3 text-right text-gray-400">${agency.lat.toFixed(4)}, ${agency.lng.toFixed(4)}</td>
    `;

    // On click, pan map to marker and open popup
    row.addEventListener('click', () => {
        map.flyTo([agency.lat, agency.lng], 8, { duration: 1.5 });
        marker.openPopup();
    });

    tableBody.appendChild(row);
});

// Real-time UTC clock
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toISOString().substring(11, 19) + ' UTC';
}
setInterval(updateClock, 1000);
updateClock();

// Fit map bounds to show all markers
const group = new L.featureGroup(markers);
map.fitBounds(group.getBounds().pad(0.1));
