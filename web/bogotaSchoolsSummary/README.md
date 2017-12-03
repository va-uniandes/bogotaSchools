# productiveChainData
Visual Analytics for temporal data of exportation of productive chain of coffee.

Propuesta Tarea 2 - Visualización de datos
Por Edison Suarez Ducon - 201627395

what: (datos)
-------------------------

dataset1: tablas de exportaciones 2016 de cacao:
https://www.datos.gov.co/Agricultura-y-Desarrollo-Rural/Cadena-Productiva-Cacao-Exportaciones/chbq-w5mx

dataset2- tablas de exportaciones 2016 de cafe :
https://www.datos.gov.co/Agricultura-y-Desarrollo-Rural/Cadena-Productiva-Caf-Exportaciones/gzwq-vje7

Dataset3- tablas de exportaciones 2016 de Algodon : https://www.datos.gov.co/Agricultura-y-Desarrollo-Rural/Cadena-Productiva-Algod-n-Exportaciones/ttwt-pzeg

Dataset4- tablas de exportaciones 2006 de Flores:
https://www.datos.gov.co/Agricultura-y-Desarrollo-Rural/Cadena-Productiva-Flores-Exportaciones/hieb-cqrb

Atributos del dataset-type tabla : anio,mes,CodigoPais, PaisDestino, CodigoDepartamento, DepartamentoOrigen, Partida, Cadena, Producto, CodigoUnidad, CantidadUnidad, ValorMilesCIFDol, ValorMilesPesos, ValorMilesFOBDol, VolúmenToneladas.
Items de todos los datasets: Filtro items donde anio = 2016.

Adecuaciones: Se crea un nuevo dataset con los atributos anio, PaisDestino, Cacao, Algodon, Flores, Cafe. Donde:
anio:= 2016
PaisDestino:= Lista de paises a donde se exporto en 2016
Cacao:= suma de ValorMilesPesos del PaisDestino corespondiente en el año 2016 para la cadena  "Cacao y su Industria". En excel fue asi: =SUMAR.SI.CONJUNTO(exp!$M$2:$M$620373;exp!$A$2:$A$620373;$A4;exp!$D$2:$D$620373;$C4;exp!$H$2:$H$620373;"Cacao y su Industria").
Algodon:= suma de ValorMilesPesos del PaisDestino corespondiente en el año 2016 para la cadena  "Algodon - Textiles - Confecciones.". En excel fue asi: =SUMAR.SI.CONJUNTO(exp!$M$2:$M$620373;exp!$A$2:$A$620373;$A4;exp!$D$2:$D$620373;$C4;exp!$H$2:$H$620373;"Algodon - Textiles - Confecciones.")
Flores:= suma de ValorMilesPesos del PaisDestino corespondiente en el año 2016 para la cadena  "Flores y Follajes". En excel fue asi: =SUMAR.SI.CONJUNTO(exp!$M$2:$M$620373;exp!$A$2:$A$620373;$A4;exp!$D$2:$D$620373;$C4;exp!$H$2:$H$620373;"Flores y Follajes")
Cafe:= suma de ValorMilesPesos del PaisDestino corespondiente en el año 2016 para la cadena  "Cafe". En excel fue asi: =SUMAR.SI.CONJUNTO(exp!$M$2:$M$620373;exp!$A$2:$A$620373;$A4;exp!$D$2:$D$620373;$C4;exp!$H$2:$H$620373;"Cafe")


Why: tareas
------------------------
Tarea1. Compare similarities. Comparar exportaciones totales entre los paises a los que mas se exporta.
Tarea2. Compare similarities. Comparar exportaciones de cada cadena de produccion para cada continente.

How:
------------------------
Tarea1: Pipe Chart
Marcas: areas para cada PaisDestino
Canales:
Posicion: Ordenanda de manera descendente con las manecillas del reloj.
Color : Para cada pais de continente. Azul de manera degradada: America (azul más oscuro oscuro),..., Europa (azul las claro)
Size: Area. Porción de los milesPesos exportados a este pasis en comparación a los demas paises.

Tarea2. Stacked barchart
Marcas: Longitud para cada cadena de produccion.
Canales:
Posicion: Ordenados en el eje horizontal para cada pais. y en cada pais, puestos en pila uno sobre otro.
Color: Para cada cadena.  Azul de manera degradada: Cacao (azul más oscuro oscuro),..., Cafe (azul las claro)
Size: Longitud numerica de cada exportacion en dolares.
