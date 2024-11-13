Map.centerObject(table);
Map.addLayer(table,{},('Italy Boundary '));
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//Contaninental scale
var imageCollection = ee.ImageCollection("projects/sat-io/open-datasets/NINA/ELC10");
var ELC = imageCollection.mosaic().clip(table);
// Reclassify the dataset using the remap function
// Remap values
var reclassELC = ELC.remap([7,3,5,8,2,4,1,6,9],
       [1,2,3,4,5,6,7,8,9]);
// Display the result.
Map.addLayer(ELC, {},'ELC 10 m');
Map.addLayer(reclassELC, {min: 1, max :9}, 'reclass ELC 10m');
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//ESA
var ESA = ee.ImageCollection('ESA/WorldCover/v100').first().clip(table);
// Reclassify the dataset using the remap function
// Remap values
var reclassESA = ESA.remap([80,10,100,30,90,95,40,20,50,60,70],
       [1,2,3,3,4,4,5,6,7,8,9]);
// Display the result.
Map.addLayer(ESA, {},'ESA 10m');
Map.addLayer(reclassESA, {min: 1, max :9}, 'reclass ESA 10m');
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//ESRI 
var esri_lulc10 = ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m");
var ESRI = esri_lulc10.mosaic().clip(table);
// Reclassify the dataset using the remap function
// Remap values
var reclassESRI = ESRI.remap([1,2,3,4,5,6,7,8,9],
       [1,2,3,4,5,6,7,8,9]);
// Display the result.
Map.addLayer(ESRI, {},'ESRI 10m');
Map.addLayer(reclassESRI, {min: 1, max :9}, 'reclass ESRI 10m');


// Combine the five images into a single image using the most common value of each pixel
var modeImage = ee.ImageCollection([reclassELC, reclassESA, reclassESRI])
                  .reduce(ee.Reducer.mode())
                  .rename('mode_value');


// Define a dictionary which will be used to make legend and visualize image on map
var dict = {
  "names": [
    "Water",
    "Trees",
    "Grass Land",
    "Wet Land",
    "Crops",
    "Shrub Land",
    "Artificial Land",
    "Bare Land",
    "Snow/Ice"
  ],
  "colors": [
    "#1A5BAB",
    "#358221",
    "#A7D282",
    "#87D19E",
    "#FFDB5C",
    "#EECFA8",
    "#ED022A",
    "#EDE9E4",
    "#F2FAFF"
  ]};
// Create a panel to hold the legend widget
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Function to generate the legend
function addCategoricalLegend(panel, dict, title) {
  // Create and add the legend title.
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  panel.add(legendTitle);
  
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 4px 0'
      }
    });
  
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
    });
  
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  
  // Get the list of palette colors and class names from the image.
  var palette = dict['colors'];
  var names = dict['names'];
  loading.style().set('shown', false);
  
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  
  Map.add(panel);
  
}


/*
  // Display map and legend ///////////////////////////////////////////////////////////////////////////////
*/

// Add the legend to the map
addCategoricalLegend(legend, dict, 'Milad Land Cover Map');

// Add image to the map
Map.addLayer(modeImage, {min:1, max:9, palette:dict['colors']}, 'Milad Land Cover Map 10m')

Export.image.toDrive({
  image: modeImage,
  description: 'Milad Land Cover Map',
  //folder: 'my_folder',
  region: table,
  scale: 10,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
  });
  
  
  
  
  
  


