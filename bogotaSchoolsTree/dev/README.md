# bogotaSchoolTree
Visual Analytics for tree data of a sample of schools in Bogota.

Propuesta Bono  - Visualización de arboles
Por Edison Suarez Ducon - 201627395

what: (datos)
-------------------------

dataset1: datos de una muestra de 200 colegios de bogota

Atributos del dataset-tipo tabla :
codigodane (ordenado ordinal),
nombre sede (categorico),
sector (categorico),
s11ApC (ordenado cuantitativo),
s11Y2016 (ordenado cuantitativo),
eval_puntaje (ordenado cuantitativo),
sb11Punt(ordenado cuantitativo),
clusterAC (ordenado cuantitativo),
fex (ordenado cuantitativo),
idPSU (ordenado cuantitativo),
tipo de educacion (categorico),
direccion (categorico),
coordenadas (ordenadas cuantitavivo)

Why: tareas
------------------------
Tarea1. Browse path. Buscar colegios de tipo de educacion "Adultos o Jovenes de extraedad"
Tarea2. Compare path. Comparar cantidad de colegios por localidad.

- Hipotesis: La cantidad de colegios debe ser proporcional a la cantidad de población a la localidad.

How:
------------------------
Tarea1: Collapsive Tree
Marcas: Lineas
Canales:
Puntos categoricos de los atributos de cada nodo con el nombre como texto.
El nodo padre es CIUDAD. El atributo que se muestra es el nombre como texto.
El nodo hijo de ciudad es Localidad. El atributo que se muestra es el nombre como texto.
El nodo hijo de localidad es tipo. El atributo que se muestra es el nombre como texto.
El nodo hijo de tipo es sector. El atributo que se muestra es el nombre como texto.
El nodo hijo de sector es colegio. El atrobuto que se muestra es el nombre como texto.

Se ordenan las localidades de manera descendente por la cantidad de colegios que tiene cada uno de ellas

Tarea2: Cluster Dendogram
Marcas: Lineas
Canales:
Puntos categoricos de los atributos de cada nodo con el nombre como texto.
El nodo padre es CIUDAD. El atributo que se muestra es el nombre como texto.
El nodo hijo de ciudad es Localidad. El atributo que se muestra es el nombre como texto.
El nodo hijo de localidad es tipo. El atributo que se muestra es el nombre como texto.
El nodo hijo de tipo es sector. El atributo que se muestra es el nombre como texto.
El nodo hijo de sector es colegio. El atrobuto que se muestra es el nombre como texto.

Se ordenan las localidades de manera descendente por la cantidad de colegios que tiene cada uno de ellas
