const { GeoSearchControl,OpenStreetMapProvider } = require("leaflet-geosearch");
require('leaflet-routing-machine');
require('./MovingMarker');

var home=document.getElementById('footer-search');

home.onclick=()=>{

    window.location.href='./index.html'
}

var locationSearch={

    start:[0,0],
    stop:[0,0]
}

var start=document.getElementById('startingPoint');

var stop=document.getElementById('destination');

const provider = new OpenStreetMapProvider({
    params: {
        countrycodes: 'ng',
        viewbox:[5.159025192260743,7.314114433544155,5.110745429992677,7.288488878494806],
        bounded:1,
        limit:3
    }
});

var startResults = document.getElementById('start-results');


start.oninput = async (event) => {

    event.preventDefault();

    var results = await provider.search({ query: event.target.value });


    results.map((result,num)=>{

        stop.style.zIndex= -1;
        let resultNode=document.createElement('p');
        resultNode.classList.add('result-items');
        var textNode=document.createTextNode(result.label);
        resultNode.appendChild(textNode);
        startResults.appendChild(resultNode);
        startResults.style.display='inline-block';
        stop.style.display='none';
    });
     
 
    startResults.onclick=(e)=>{

        startResults.style.display='none';

        stop.style.display='inline-block';

        start.value = e.target.innerHTML;

        startResults.innerHTML='';
        
        results.map((result,num)=>{

            if( result.label===e.target.innerHTML){
                
                locationSearch.start[0]=results[num].x
                locationSearch.start[1]=results[num].y
            }
        })

    }


    if (start.value.length === 0 ){
        startResults.style.display='none';
        startResults.innerHTML='';
        stop.style.display='inline-block';
    }   
   
};


var stopResults = document.getElementById('stop-results');

//DESTINATION BLOCK

stop.oninput = async (event) => {

    event.preventDefault();

    
    const results = await provider.search({ query: event.target.value });

    results.map((result,num)=>{

        let resultNode=document.createElement('p');
        resultNode.classList.add('result-items');
        var textNode=document.createTextNode(result.label);
        resultNode.appendChild(textNode);
        stopResults.appendChild(resultNode);
        stopResults.style.display='inline-block';
    });
 
 
    stopResults.addEventListener('click',(e)=>{
        
        stopResults.style.display='none';
        stop.value = e.target.innerHTML;
        stopResults.innerHTML='';

        results.map((result,num)=>{

            if( result.label===e.target.innerHTML){
                
                locationSearch.stop[0]=results[num].x
                locationSearch.stop[1]=results[num].y
            }
        })

       
    });

    if (stop.value.length === 0){
        stopResults.style.display='none';
        stopResults.innerHTML='';
    }
    
    

};
    

var mapContainer = document.getElementById('map');

//Basemaps support
var mapboxAttribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>'

let accessToken='pk.eyJ1IjoiamVhZnJlZXp5IiwiYSI6ImNrYmpicjczYjBucjIyeGxzNGRjNHMxejEifQ.bY_8hqCiG-LBMG1xXreqdA';

var map = L.map('map',{
    zoomControl:false,
    minZoom:14,
    zoom:17,
    maxZoom:22,
    center:[7.302952885790951,5.138908926692239] 
});

L.tileLayer(`https://api.mapbox.com/styles/v1/jeafreezy/ckgc141jb4ras19nwni4kvfct/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`,

{ 
   tileSize: 512,
   zoomOffset: -1,
   maxZoom:22,
   zoom:17,
   minZoom:14,
   attribution: mapboxAttribution

}).addTo(map);


//UTILITIES

var startIcon = L.icon({
    iconUrl: './assets/icons/icon1.png',
    iconSize: [30, 30],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
    shadowUrl: './assets/icons/icon-shadow1.png',
    shadowSize: [30, 30],
    shadowAnchor: [10, 10]
});

var destinationIcon = L.icon({
    iconUrl: './assets/icons/icon.png',
    iconSize: [30, 30],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
    shadowUrl: './assets/icons/icon-shadow.png',
    shadowSize: [30, 30],
    shadowAnchor: [10, 10]
});


var clearSearch=document.getElementById('change');
 

clearSearch.onclick=()=>{

    if(start.value.length > 1 && stop.value.length > 1){

        var wayPoint1= L.latLng(locationSearch.start[1], locationSearch.start[0])
        var wayPoint2= L.latLng(locationSearch.stop[1],locationSearch.stop[0])
        mapContainer.style.display='block';
        map.invalidateSize();
       var route = L.Routing.control({
            waypoints: [
                wayPoint1,wayPoint2
            ],
            lineOptions: {
                        styles: [{color: 'purple', opacity: 0.7, weight: 3}]
                },
            routeWhileDragging: true,
            collapsible:true,
            // fitSelectedRoutes: false,
            autoRoute:true,
            show:true,
            showAlternatives: true,
            altLineOptions: {
                styles: [
                    {color: 'black', opacity: 0.15, weight: 9},
                    {color: 'white', opacity: 0.8, weight: 6},
                    {color: 'blue', opacity: 0.5, weight: 2}
                    ]
                 },
            createMarker:(i,wp,nwps)=>{
    
                if (i===0){ 
                    
                    return L.marker(wp.latLng,{
            
                        icon:startIcon
            
                    }).bindPopup(start.value).openPopup();
            
                }else{
            
                    return L.marker(wp.latLng,{
                        icon:destinationIcon
                    }).bindPopup(stop.value).openPopup()
                }
            }
            });

            route.on('routesfound',(e)=>{

                var MovingMarker = L.Marker.movingMarker([wayPoint1,wayPoint2],
                    [20000]).addTo(map);
                    
                MovingMarker.start();
                
            }).addTo(map);
           
    }
}



var backHome=document.getElementById('back-home');

backHome.onclick=()=>{
    window.location.href='./index.html';
}

start.onblur=()=>{

    setTimeout(()=>{
        startResults.style.display='none';
        stop.style.display='inline-block';
        startResults.innerHTML='';
    },200)
   
}


stop.onblur=()=>{

    setTimeout(()=>{
        stopResults.style.display='none';
        stopResults.innerHTML='';
    },200)
  
}

