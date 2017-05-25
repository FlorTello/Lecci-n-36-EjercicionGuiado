function initMap() {
  var lanoratoriaLima = {lat: -25.1191427, lng: -77.0349046};
  // var lanoratoriaLima = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
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
  var latitud, longitud;
  document.getElementById('encuentrame').addEventListener('click',buscar);
  var funcionExito = function(position){
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;

    var miUbication = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      map:map
    });
    map.setZoom(18);
    map.setCenter({lat:latitud, lng:longitud});
  }
  var funcionError = function (error){
    alert("Tenemos un problema al obtener tu ubicación");
  }

}
