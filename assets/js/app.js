function initMap() {
  var lanoratoriaLima = {lat: -13.1191427, lng: -77.0349046};
  // var lanoratoriaLima = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18 ,
    center: lanoratoriaLima
  });
  var marker = new google.maps.Marker({
    position: lanoratoriaLima,
    map: map
  });
  function buscar(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionExito,funcionError);
    }
  }
  var latitud, longitud, miUbication;
  
  var funcionExito = function(position){
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;

    miUbication = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      map:map
    });
    map.setZoom(18);
    map.setCenter({lat:latitud, lng:longitud});
  }
  var funcionError = function (error){
    alert("Tenemos un problema al obtener tu ubicación");
  }
  var inputPartida = document.getElementById('input-partida');
  var inputDestino = document.getElementById('input-destino');

  document.getElementById('encuentrame').addEventListener('click',buscar);

  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);
  var tarifa = document.getElementById('tarifa');

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var calculateAndDisplayRoute = function (directionsService,directionsDisplay){
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      console.log(response);
      if(status === 'OK'){
        var distancia = Number((response.routes[0].legs[0].distance.text.replace("km","")).replace(",","."));
        tarifa.classList.remove('none');
        var costo = distancia * 1.75;
        if(costo < 4){
          tarifa.innerHTML = "S/. 4";
        }
        tarifa.innerHTML = "S/. " + parseInt(costo);
        console.log(response.routes[0].legs[0].distance.text);
        directionsDisplay.setDirections(response);
        miUbication.setMap(null);
      }else{
        window.alert('No encontramos la ruta');
      }
    });
  }
  directionsDisplay.setMap(map);

  var trazarRuta = function(){
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('trazar-ruta').addEventListener('click',trazarRuta);
}
