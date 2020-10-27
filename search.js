

const { GeoSearchControl,OpenStreetMapProvider } = require("leaflet-geosearch");

var home=document.getElementById('footer-search');

home.onclick=()=>{

    window.location.href='./index.html'
}


var start=document.getElementById('startingPoint');

var stop=document.getElementById('destination');

const provider = new OpenStreetMapProvider({
    params: {
        countrycodes: 'ng',
        viewbox:[5.159025192260743,7.314114433544155,5.110745429992677,7.288488878494806],
        email:'jolaiyaemmanuel@gmail.com',
        bounded:1,
        limit:5
    }
});

var startResults = document.getElementById('start-results');


start.onchange = async (event) => {

    event.preventDefault();

    
    const results = await provider.search({ query: event.target.value });

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
    }
    if (start.value.length === 0){
        startResults.style.display='none';
        startResults.innerHTML='';
        stop.style.display='inline-block';
    }   
   
};


var stopResults = document.getElementById('stop-results');

//DESTINATION BLOCK

stop.onchange = async (event) => {

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
    });

    if (stop.value.length === 0){
        stopResults.style.display='none';
        stopResults.innerHTML='';
    }
    
    

};
    



// var router=L.Routing.control({
//     waypoints: [],
//     lineOptions: {
//         styles: [{color: 'purple', opacity: 0.7, weight: 3}]
//     },
//     routeWhileDragging: true,
//     geocoder: L.Control.Geocoder.nominatim(),
//     geocoderPlaceholder:(index,waypoint)=>{

//         return ['From']

//     },
//     collapsible:true,
//     autoRoute:true,
//     show:true,
//     showAlternatives: true,
//     altLineOptions: {
//         styles: [
//             {color: 'black', opacity: 0.15, weight: 9},
//             {color: 'white', opacity: 0.8, weight: 6},
//             {color: 'blue', opacity: 0.5, weight: 2}
//         ]
//         },
//     createMarker:(i,wp,nwps)=>{
    
    
//     if (i===0){ 
        
//         return L.marker(wp.latLng,{

//             icon:startIcon

//         }).bindPopup(message[0]).openPopup();

//     }else{

//         return L.marker(wp.latLng,{
//             icon:destinationIcon
//         }).bindPopup(message[1]).openPopup()
//     }
// }
// }).addTo(map);

        // // var myMovingMarker = L.Marker.movingMarker([startMarker,stopMarker],

// 				// [20000]).addTo(map);
//                 // myMovingMarker.start();
//                 console.log(startMarker)
//                 console.log(stopMarker)
// router.on('routesfound',()=>{
//     console.log(router.getWaypoints())
// });


//UTILITIES

var clearSearch=document.getElementById('change');

clearSearch.onclick=()=>{
    start.value='';
    stop.value='';

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
    },100)
   
}


stop.onblur=()=>{

    setTimeout(()=>{
        stopResults.style.display='none';
        startResults.innerHTML='';
    },100)
  
}