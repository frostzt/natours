/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiZnJvc3R6IiwiYSI6ImNrZmF6eWg2YzExN28ycW1xZzVpYzVtZ2cifQ.CR7wq5rOaOqQlMn7agKDTQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
});
