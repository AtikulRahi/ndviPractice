var L8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA"),
    Region = /* color: #d63000 */ee.Geometry.Polygon(
        [[[91.81065567840044, 22.484423457410834],
          [91.79417618621294, 22.48616818156129],
          [91.77958496917192, 22.477761581121058],
          [91.77512177337114, 22.46919584066569],
          [91.7782116781563, 22.462374594449358],
          [91.79091462005083, 22.453966549931845],
          [91.79881104339067, 22.463960960745023],
          [91.81494721282426, 22.47141663905659]]]),
    Param = {"opacity":1,"bands":["B5"],"min":-1,"max":1,"palette":["0000ff","ffffff","008000"]};

    var image = L8.filterBounds(Region)
    .filterMetadata("CLOUD_COVER","less_than",1)
    .first()
    
    
    var RED = image.select('B4')
    var NIR = image.select('B5')
    
    /*print(image.bandNames())
    var NDVI = image.expression(
      '(b(4)-b(3))/(b(4)+b(3))'
    ) [it's another approach]*/
    
    /*var NDVI = image.expression(
      '(NIR-RED)/(NIR+RED)',
      {'NIR': NIR,
       'RED': RED}
      ) [it's another approach]*/
      
    var NDVI = image.expression(
      '(b(\'B5\')-b(\'B4\'))/(b(\'B5\')+b(\'B4\'))'
    )
      Map.centerObject(image)
      Map.addLayer(NDVI,Param,'NDVI')