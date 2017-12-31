"use strict";mapboxgl.accessToken = "pk.eyJ1Ijoic3RheXB1ZnRtYW4iLCJhIjoiY2ozeXptMzVhMDA3ZTMzbzR5ZXVweDQ5diJ9.uKibf-YeiUvRnrwbNvGrRQ";
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/light-v9",
	center: [-77.0369, 38.9072],
	zoom: 12,
	maxZoom: 16
});
map.on("load", function() {
	map.addSource("Existing Bike Lanes", {
		type: "geojson",
		data: "./data/2017-11-06-existing-bike-lanes-dcopendata.geojson"
	}), map.addLayer({
		id: "Existing Bike Lanes",
		type: "line",
		source: "Existing Bike Lanes",
		layout: {
			visibility: "none"
		},
		paint: {
			"line-color": "#32CD32",
			"line-width": 4
		}
	}), map.addSource("Signed Bike Routes", {
		type: "geojson",
		data: "./data/2017-11-06-signed-bike-routes-dcopendata-epsg4326.geojson"
	}), map.addLayer({
		id: "Signed Bike Routes",
		type: "line",
		source: "Signed Bike Routes",
		layout: {
			visibility: "none"
		},
		paint: {
			"line-color": "#20B2AA",
			"line-width": 4
		}
	}), map.addSource("Off-street Trails", {
		type: "geojson",
		data: "./data/2017-11-06-bike-trails-dcopendata-epsg4326.geojson"
	}), map.addLayer({
		id: "Off-street Trails",
		type: "line",
		source: "Off-street Trails",
		layout: {
			visibility: "none"
		},
		paint: {
			"line-color": "#0271fb",
			"line-width": 4
		}
	}), map.addSource("High Density Bike Crashes", {
		type: "geojson",
		data: "./data/Accidents_Heatmap_high.geojson"
	}), map.addLayer({
		id: "High Density Bike Crashes",
		type: "polygon",
		source: "High Density Bike Crashes",
		layout: {
			visibility: "none"
		},
		style: function(High Density Bike Crashes) {
    		return {
        		fillColor: "#de2d26",
        		weight: 0,
        		opacity: 0.7,
        		color: 'none',  //Outline color
        		fillOpacity: 0
    		};
		}
	}), map.addSource("Medium Density Bike Crashes", {
		type: "geojson",
		data: "./data/Accidents_Heatmap_med.geojson"
	}), map.addLayer({
		id: "Medium Density Bike Crashes",
		type: "polygon",
		source: "Medium Density Bike Crashes",
		layout: {
			visibility: "none"
		},
		style: function(Medium Density Bike Crashes) {
    		return {
        		fillColor: "#feb24c",
        		weight: 0,
        		opacity: 0.7,
        		color: 'none',  //Outline color
        		fillOpacity: 0
    		};
		}
	}), map.addSource("Low Density Bike Crashes", {
		type: "geojson",
		data: "./data/Accidents_Heatmap_low.geojson"
	}), map.addLayer({
		id: "Low Density Bike Crashes",
		type: "polygon",
		source: "Low Density Bike Crashes",
		layout: {
			visibility: "none"
		},
		style: function(Low Density Bike Crashes) {
    		return {
        		fillColor: "##31a354",
        		weight: 0,
        		opacity: 0.7,
        		color: 'none',  //Outline color
        		fillOpacity: 0
    		};
		}
	}), map.addSource("Bike Crash Locations", {
		type: "geojson",
		data: "./data/Bicycle_Crashes_in_DC.geojson"
	}), map.addLayer({
		id: "Bike Crash Locations",
		type: "point",
		source: "Bike Crash Locations",
		layout: {
			visibility: "none"
		},
      	style: function(Bike Crash Locations){
        	return {
			    radius: 4,
			    fillColor: "#8B0000",
			    color: "none",
			    weight: 0,
			    opacity: 0.7,
			    fillOpacity: 0.7
        	};
      }
	})
});
for (var toggleableLayerIds = ["Existing Bike Lanes", "Signed Bike Routes", "Off-street Trails", "Bike Crash Locations", "High Density Bike Crashes", "Medium Density Bike Crashes", "Low Density Bike Crashes", i = 0; i < toggleableLayerIds.length; i++) {
	var id = toggleableLayerIds[i],
		link = document.createElement("a");
	link.href = "#", link.className = "active", link.textContent = id, link.onclick = function(e) {
		var i = this.textContent;
		e.preventDefault(), e.stopPropagation(), "visible" === map.getLayoutProperty(i, "visibility") ? (map.setLayoutProperty(i, "visibility", "none"), this.className = "") : (this.className = "active", map.setLayoutProperty(i, "visibility", "visible"))
	};
	var layers = document.getElementById("menu");
	layers.appendChild(link)
}
var nav = new mapboxgl.NavigationControl;
map.addControl(nav, "bottom-right");
