$(document).ready(function () {
    let map = L.map("map").setView([51.1876767, 4.4072676], 10);
    let stopsLayer = L.layerGroup().addTo(map);
    let busLayer = L.layerGroup().addTo(map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var stopIcon = new L.Icon({
        iconUrl: "/static/bus-stop.png",
        iconSize: [32, 32]
    });

    var busIcon = new L.Icon({
        iconUrl: "/static/bus.png",
        iconSize: [40, 40]
    });

    // L.marker([51.1876767, 4.4072676]).addTo(map)
    //     .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    //     .openPopup();

    // map.on("moveend", function () {
    //     // console.log(map.getBounds());
    // });

    // @http://www.liedman.net/leaflet-routing-machine/
    // L.Routing.control({
    //     waypoints: [
    //         L.latLng(57.74, 11.94),
    //         L.latLng(57.6792, 11.949)
    //     ]
    // }).addTo(map);

    $("select").on("change", function () {
        stopsLayer.clearLayers();
        busLayer.clearLayers();
        let num = $("option:selected", this).attr("num");
        let entity = $("option:selected", this).attr("entity");
        let direction = $("option:selected", this).attr("direction");
        $.ajax({
            url: `/api/real-time/${entity}/${num}/${direction}`,
            success: function (response) {
                response["haltes"].forEach(halte => {
                    L.marker([halte.geoCoordinaat.latitude, halte.geoCoordinaat.longitude], {icon: stopIcon}).addTo(stopsLayer)
                        .bindPopup(`Halte: ${halte.omschrijving}\nWeer: ${halte.weather.weather[0].main}`);
                });
                response["busses"].forEach(bus => {
                    L.marker([bus.geoCoordinaat.latitude, bus.geoCoordinaat.longitude], {icon: busIcon}).addTo(busLayer)
                        .bindPopup(`Bus: ${bus.ritnummer}`);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $("select").on("loaded.bs.select", function() {
        stopsLayer.clearLayers();
        busLayer.clearLayers();
        let num = $("option:selected", this).attr("num");
        let entity = $("option:selected", this).attr("entity");
        let direction = $("option:selected", this).attr("direction");
        $.ajax({
            url: `/api/real-time/${entity}/${num}/${direction}`,
            success: function (response) {
                response["haltes"].forEach(halte => {
                    L.marker([halte.geoCoordinaat.latitude, halte.geoCoordinaat.longitude], {icon: stopIcon}).addTo(stopsLayer)
                        .bindPopup(`Halte: ${halte.omschrijving}\nWeer: ${halte.weather.weather[0].main}`);
                });
                response["busses"].forEach(bus => {
                    L.marker([bus.geoCoordinaat.latitude, bus.geoCoordinaat.longitude], {icon: busIcon}).addTo(busLayer)
                        .bindPopup(`Bus: ${bus.ritnummer}`);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $("#bus-reload").on("click", function() {
        busLayer.clearLayers();
        let num = $("#select-line :selected").attr("num");
        let entity = $("#select-line :selected").attr("entity");
        let direction = $("#select-line :selected").attr("direction");
        $.ajax({
            url: `/api/update/${entity}/${num}/${direction}`,
            success: function (response) {
                response["busses"].forEach(bus => {
                    L.marker([bus.geoCoordinaat.latitude, bus.geoCoordinaat.longitude], {icon: busIcon}).addTo(busLayer)
                        .bindPopup(`Bus: ${bus.ritnummer}`);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});
