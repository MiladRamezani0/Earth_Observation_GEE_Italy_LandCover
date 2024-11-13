# Earth_Observation_GEE_Italy_LandCover
# A Spatial Analysis of Land Cover in Italy using Google Earth Engine

This repository contains the spatial analysis of land cover in Italy using Google Earth Engine. The project utilizes data from various sources (ESA, Esri, and European Land Use and Land Cover maps) to create an accurate Land Use and Land Cover (LULC) map for Italy.

## Key Features:
- Preprocessing of satellite imagery and land cover data.
- LULC classification into nine distinct categories: Water, Trees, Grassland, Wetland, Crops, Shrubland, Artificial Land, Bare Land, and Snow/Ice.
- Accuracy assessment of the generated LULC map.

## Installation

No installation is required locally. All scripts are written for Google Earth Engine and can be run in the [Google Earth Engine Code Editor](https://code.earthengine.google.com/).

## Usage

1. Open the script in the [Google Earth Engine Code Editor](https://code.earthengine.google.com/).
2. Load the datasets by using the links provided in the `data_sources.md` file.
3. Run the `LULC_mapping.js` script to create the LULC map.
4. (Optional) Run the `accuracy_assessment.js` script for accuracy analysis.

## Data Sources

- European Land Use and Land Cover Map (ELC)
- ESA Land Use and Land Cover Map
- Esri Land Use and Land Cover Map

For more information on how to access the data, please refer to [data_sources.md](data_sources.md).

## GEE Code

The code for this project is hosted on Google Earth Engine. You can access the scripts via the following link:

[[View GEE Script for LULC Mapping](https://code.earthengine.google.com/your_script_link_here)](https://code.earthengine.google.com/a53aa2b8dc6b4aa901e812c79e973c7d)

Simply open the link in the Google Earth Engine Code Editor to view and run the code.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
