﻿
////////// AUTHOR & APPLICATION INFORMATION ////////////////////////////////////////
//
//   Author: Chris Sergent
//   Date:   January 6, 2014
//   Application: GIS Web
//
////////////////////////////////////////////////////////////////////////////////////

var map, geoLocate;

// Comments describing require statements are definition from https://developers.arcgis.com/javascript/jsapi/ and http://dojotoolkit.org/reference-guide/1.9/

// Get references to modules to be used
require(["esri/map",                                // mapSection
         "esri/config",                             // The default values for all JS API configuration options. 
         "esri/dijit/HomeButton",                   // homeButton
         "esri/dijit/LocateButton",                 // locateButton
         "esri/geometry/Extent",                    // The minimum and maximum X- and Y- coordinates of a bounding box. Used to set custom extent
         "esri/layers/ArcGISDynamicMapServiceLayer",
         "esri/layers/ArcGISTiledMapServiceLayer",
         "esri/layers/FeatureLayer",
         "esri/tasks/GeometryService",          // Represents a geometry service resource exposed by the ArcGIS Server REST API. It is used to perform various operations on geometries such as project, simplify, buffer, and relationships. 
         "dojo/dom",                            // This module defines the core Dojo DOM API. It is used for code like - dom.byId("someNode")
         "dojo/on",                             // This module is used based on an even such as on("click"), function() { } or on("ready"),function() { }
         "dojo/parser",                         // The Dojo Parser is an optional module which is used to convert specially decorated nodes in the DOM and convert them into Dijits, Widgets or other Objects.
         "dojo/domReady!"],                     // An AMD loaded plugin that will wait until the DOM has finished loading before returning.


// Set variables to be used with references (write variables and references in the same order and be careful of typos on your references)
         function (Map, esriConfig, HomeButton, LocateButton, Extent, ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer, FeatureLayer, GeometryService, dom, on, parser) {

             parser.parse();

             /* The proxy comes before all references to web services */
             /* Files required for security are proxy.config, web.config and proxy.ashx 
             - set security in Manager to Private, available to selected users and select Allow access to all users who are logged in
             (Roles are not required)
             /*
             Information on the proxy can be found at: https://developers.arcgis.com/javascript/jshelp/ags_proxy.html
             */

             // Proxy Definition Begin 
             //identify proxy page to use if the toJson payload to the geometry service is greater than 2000 characters.
             //If this null or not available the project and lengths operation will not work. 
             // Otherwise it will do a http post to the proxy.
             esriConfig.defaults.io.proxyUrl = "proxy.ashx";
             esriConfig.defaults.io.alwaysUseProxy = false;

             // Proxy Definition End

             //-----------------------------------------------------------
             // Map Services Begin
             //-----------------------------------------------------------

             // declare geometry service
             esriConfig.defaults.geometryService = new GeometryService("http://maps.decaturil.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer");


             // set custom extent
             var initialExtent = new Extent({
                 "xmin": 777229.03,
                 "ymin": 1133467.92,
                 "xmax": 848340.14,
                 "ymax": 1185634.58,
                 "spatialReference": {
                     "wkid": 3435
                 }
             });

             // create map and set slider style to small
             map = new Map("mapSection", {
                 showAttribution: false,
                 sliderStyle: "small",
                 extent: initialExtent,
                 logo: false
             });

             // add imagery
             var tiled = new ArcGISTiledMapServiceLayer("http://maps.decaturil.gov/arcgis/rest/services/Aerial_2014_Tiled/MapServer");
             map.addLayer(tiled);
             // set operational layers
             var operationalLayer = new ArcGISDynamicMapServiceLayer("http://maps.decaturil.gov/arcgis/rest/services/Public/InternetVector/MapServer", { "opacity": 0.5 });
             // add operational layers
             map.addLayer(operationalLayer);

             // add point feature layer
             var pointFeatureLayer = new FeatureLayer("http://maps.decaturil.gov/arcgis/rest/services/Test/FeatureServer/0");
             map.addLayer(pointFeatureLayer);



             //-----------------------------------------------------------
             // Map Services End
             //-----------------------------------------------------------

             // add homeButton begin
             var home = new HomeButton({
                 map: map
             }, "homeButton");
             home.startup();
             // add homeButton end


             // add locateButton begin
             geoLocate = new LocateButton({
                 map: map
             }, "locateButton");
             geoLocate.startup();
             // add locateButton end

         });