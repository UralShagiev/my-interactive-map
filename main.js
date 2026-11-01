const map = new maplibregl.Map({
    container: 'map',
    style: "https://raw.githubusercontent.com/gtitov/basemaps/refs/heads/master/positron-nolabels.json",
    center: [51, 0],
    zoom: 4
});

map.on('load', () => {  
     map.addSource('countries', {
        type: 'geojson',
        data: './data/countries.geojson',
        attribution: 'Natural Earth'
  })
  map.addLayer({
      id: 'countries-layer',
      type: 'fill',
      source: 'countries',
      paint: {
        // 'fill-color': 'lightgray'
         'fill-color': ['match', ['get', 'MAPCOLOR7'], 1, 'red', 'lightgray']
      }
  })

    map.addSource('rivers', {
      type: 'geojson',
      data: './data/rivers.geojson'
  })
  map.addLayer({
    id: 'rivers-layer',
    type: 'line',
    source: 'rivers',
    paint: {
        'line-color': '#00BFFF'
    }

})
map.addLayer({
  id: 'lakes-layer',
  type: 'fill',
  source: 'lakes',
  paint: {
      'fill-color': 'lightblue',
      'fill-outline-color': '#00BFFF'
  }
})

map.addSource('cities', {
  type: 'geojson',
  data: './data/cities.geojson'
})


map.addLayer({
  id: 'cities-layer',
  type: 'circle',
  source: 'cities',
  paint: {
      'circle-color': 'rgb(12, 234, 19)',
      'circle-radius': 3
  },
 filter: ['>', ['get', 'POP_MAX'], 1000000]
})

map.on('click', ['cities-layer'], (e) => {
console.log(e.features)
  new maplibregl.Popup()
      .setLngLat(e.features[0].geometry.coordinates)
      .setHTML(e.features[0].properties.NAME)
      .addTo(map);
})
map.on('mouseenter', 'cities-layer', () => {
  map.getCanvas().style.cursor = 'pointer'
})
map.on('mouseleave', 'cities-layer', () => {
  map.getCanvas().style.cursor = ''
})
})