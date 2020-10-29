
//Import required library

var {GeoSearchControl,OpenStreetMapProvider } = require( 'leaflet-geosearch');
var _ =require('leaflet.locatecontrol');


//Basemaps support
var mapboxAttribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>'

var accessToken=process.env.ACCESS_TOKEN;

var map = L.map('map',{
    zoomControl:false,
    minZoom:14,
    zoom:18,
    maxZoom:22,
    center:[7.302952885790951,5.138908926692239] 
});

var darkMode = L.tileLayer(`https://api.mapbox.com/styles/v1/jeafreezy/ckgc0vf2234n719oljad1p7rk/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`,

{  tileSize: 512,
   zoomOffset: -1,
   maxZoom:22,
   minZoom:14,
   attribution: mapboxAttribution
});


var lightMode= L.tileLayer(`https://api.mapbox.com/styles/v1/jeafreezy/ckgc141jb4ras19nwni4kvfct/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`,

{ 
   tileSize: 512,
   zoomOffset: -1,
   maxZoom:22,
   minZoom:14,
   attribution: mapboxAttribution

}).addTo(map);

//Add google satellite imagery

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 18,
    subdomains:['mt0','mt1','mt2','mt3']
});


var baseMap={

    'Satellite':googleSat
}

L.control.layers(null,baseMap,{position:'bottomright'}).addTo(map);


//Icon to switch from light to dark mode

var switchIcon = document.getElementById('switcher');

let switchCount = 0;

switchIcon.onclick=()=>{

    switchCount ++;

    if (switchCount % 2 == 0){

        map.removeLayer(darkMode)
        
        map.addLayer(lightMode)
        

    }else{

        map.removeLayer(lightMode)
        
        map.addLayer(darkMode)
        

        
    }
}


//Geolocation control

var geolocation=L.control.locate({

position:'bottomright',

setView:'always',

flyTo:true,

keepCurrentZoomLevel:true,

drawCircle:false,

locateOptions:{

    enableHighAccuracy:true,
    watch:true
}

}).addTo(map);


//Icon

var icon = L.icon({
    iconUrl: '../assets/icons/icon.png',
    iconSize: [30, 30],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
    shadowUrl: '../assets/icons/icon-shadow.png',
    shadowSize: [30, 30],
    shadowAnchor: [10, 10]
});


//Geolocation control

const search = new GeoSearchControl({
    provider: new OpenStreetMapProvider({
            params: {
                countrycodes: 'ng',
                viewbox:[5.159025192260743,7.314114433544155,5.110745429992677,7.288488878494806],
                bounded:1,
                limit:4
            },
    }),
    searchLabel:'Search here...',
    style:'bar', //button   
    position:'topright',
    maxSuggestions:3,
    retainZoomLevel:true,
    showPopup:true,
    showMarker:true,
    notFoundMessage:'Oops! Please try again',
    marker:{
        icon:icon
    },
    keepResult:true,
    autoClose:true
});

map.addControl(search);


map.on('geosearch/showlocation', (e)=>{

    // var result=document.getElementById('location-found');
    var locationName=document.getElementById('location-name');
    var locationAddress=document.getElementById('loc-address');
    var locationCoordinate=document.getElementById('location-coordinate');
    // var footer=document.getElementById('footer-home');
    var map =document.getElementById('map');
    map.style.zIndex= '-1';
    var cleanedLocation=e.location.label.split(',')[0];
    var cleanedAddress=e.location.label.split(',')[1];
    locationName.innerText=cleanedLocation;
    locationAddress.innerText=cleanedAddress;
    locationCoordinate.innerText=`${Number(e.location.y).toFixed(3)},${Number(e.location.x).toFixed(3)}`;
    // footer.style.display='none';
    // result.style.display='flex';

})

// var result=document.getElementById('location-found');


// result.onclick=()=>{

//     window.location.reload()
// }

var footer=document.getElementById('footer-home');

footer.onclick=()=>{

    window.location.href='../pages/search.html'
};

var container=geolocation.getContainer()

container.setAttribute('data-intro','Click on this icon to go to your current location')

var layerControlContainer = document.querySelector(".leaflet-control-layers");

layerControlContainer.setAttribute('data-intro','Click to change to satellite view')

window.onload=()=>{
    introJs().start()
    registerSW();
};

async function registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('../sw.js');
      } catch (e) {
        console.log(`SW registration failed`);
      }
    }
  }