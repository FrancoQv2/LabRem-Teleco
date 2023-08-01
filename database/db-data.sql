-- -----------------------------------------------------
-- Insercion de Datos
-- -----------------------------------------------------

USE LabRem_Teleco;

-- -----------------------------------------------------
-- Laboratorios
-- -----------------------------------------------------

-- INSERT INTO Laboratorios (area, nombre, descripcion) 
-- VALUES 
-- (DEFAULT,'Enlace de WiFi punto a punto','La experiencia tiene como objetivo Implementar un enlace de datos WiFi 2.4GHz punto a punto. Se espera que el estudiante adquiera competencias en apuntamiento de antenas e interpretación de indicadores de calidad de señal. Para la experiencia se disponen de dos antenas parabólicas separadas una distancia de 10m. Cada una de ellas conectadas directamente a un atenuador seguido de un punto de acceso. Una antena es fija mientras que la otra se encuentra articulada de tal manera de poder graduar su ángulo de elevación y azimut. Inicialmente el estudiante fijará una inclinación y moverá la otra hasta lograr un enlace óptimo. La calidad de este enlace se mide a través de una interfaz web propia de los puntos de acceso que permiten medir la intensidad de la señal recibida. El experimento finaliza cuando se logra un valor óptimo de potencia. Se espera medir la intensidad de cantidad de señal recibida medida en decibelios (RSCI), el ángulo de elevación (grados) y el ángulo de azimut (grados). Estos valores se visualizarán mediante una tabla de valores Para desarrollar esta experiencia actualmente se dispone de dos antenas con reflector parabólico frecuencia 2,4GHz ganancia 24dBi, 2 atenuadores y dos puntos de acceso Ubiquity Bullet M2.'),
-- (DEFAULT,'Enlace punto a punto con radio definida por software','La experiencia tiene como objetivo experimentar el efecto de distintos esquemas de modulación y codificación sobre el desempeño de un sistema de comunicación digital. Se espera que el estudiante adquiera competencias en analizar sistemas de comunicaciones digitales en capas físicas y de enlace. Se emplea una computadora conectada a dos periféricos separados una distancia de 6m. Los periféricos son capaces de conectarse entre sí por radiofrecuencia. Cada uno se conecta a un conector usb que ingresa directamente a dos puertos usb de una PC. Ante una dada modulación y codificación y un rango de nivel de intensidad determinado, el estudiante a través de un entorno Gnuradio será capaz de evaluar la intensidad de la señal del enlace logrado en ese rango de niveles y estimar la configuración óptima. El estudiante también deberá ensayar el enlace transmitiendo tramas conocidas y comparando las tramas recibidas estimando la tasa de errores de bit (BER) y la tasa de errores de trama (FER). Los datos y/o parámetros de entrada necesarios para la experiencia son: 1. Rango de nivel de potencia de transmisor: Mínimo y máximo; 2. Esquema de modulación 3. Tipo de codificación Se esperan poder medir: 1. Intensidad de señal recibida (Dbm) para cada valor de potencia especificado en el rango de entrada 2. Tasa de errores de bit (cantidad de bits con error / bits transmitidos) (BER). Para visualización se grafica el nivel de intensidad de la señal en función de la tasa de error. Para desarrollar esta experiencia actualmente se dispone de computadoras y periféricos de radio definida por software Hack-RF (transmisor/receptor half-duplex banda corrida 10 MHz a 6 GHz, ancho de banda 20 MHz, 8 bits) Como herramienta de software se emplea el lenguaje Python y el marco de aplicación o framework Gnuradio (software libre bajo licencia GPL).');

INSERT INTO Laboratorios (area, nombre, descripcion) 
VALUES 
(DEFAULT,'Enlace de WiFi punto a punto','<p>La experiencia tiene como objetivo Implementar un enlace de datos WiFi 2.4GHz punto a punto.<br/>Se espera que el estudiante adquiera competencias en apuntamiento de antenas e interpretación de indicadores de calidad de señal. Para la experiencia se disponen de dos antenas parabólicas separadas una distancia de 10m. Cada una de ellas conectadas directamente a un atenuador seguido de un punto de acceso. Una antena es fija mientras que la otra se encuentra articulada de tal manera de poder graduar su ángulo de elevación y azimut. Inicialmente el estudiante fijará una inclinación y moverá la otra hasta lograr un enlace óptimo. <br/>La calidad de este enlace se mide a través de una interfaz web propia de los puntos de acceso que permiten medir la intensidad de la señal recibida.<br/>El experimento finaliza cuando se logra un valor óptimo de potencia. Se espera medir la intensidad de cantidad de señal recibida medida en decibelios (RSCI), el ángulo de elevación (grados) y el ángulo de azimut (grados). <br/>Estos valores se visualizarán mediante una tabla de valores. <br/>Para desarrollar esta experiencia actualmente se dispone de dos antenas con reflector parabólico frecuencia 2,4GHz ganancia 24dBi, 2 atenuadores y dos puntos de acceso Ubiquity Bullet M2.</p>'),
(DEFAULT,'Enlace punto a punto con radio definida por software','<p>La experiencia tiene como objetivo experimentar el efecto de distintos esquemas de modulación y codificación sobre el desempeño de un sistema de comunicación digital. <br/>Se espera que el estudiante adquiera competencias en analizar sistemas de comunicaciones digitales en capas físicas y de enlace. <br/>Se emplea una computadora conectada a dos periféricos separados una distancia de 6m. Los periféricos son capaces de conectarse entre sí por radiofrecuencia. Cada uno se conecta a un conector usb que ingresa directamente a dos puertos usb de una PC. Ante una dada modulación y codificación y un rango de nivel de intensidad determinado, el estudiante a través de un entorno Gnuradio será capaz de evaluar la intensidad de la señal del enlace logrado en ese rango de niveles y estimar la configuración óptima. El estudiante también deberá ensayar el enlace transmitiendo tramas conocidas y comparando las tramas recibidas estimando la tasa de errores de bit (BER) y la tasa de errores de trama (FER). Los datos y/o parámetros de entrada necesarios para la experiencia son: <br/>1. Rango de nivel de potencia de transmisor: Mínimo y máximo; <br/>2. Esquema de modulación <br/>3. Tipo de codificación Se esperan poder medir: 1. Intensidad de señal recibida (Dbm) para cada valor de potencia especificado en el rango de entrada 2. Tasa de errores de bit (cantidad de bits con error / bits transmitidos) (BER). <br/>Para visualización se grafica el nivel de intensidad de la señal en función de la tasa de error. <br/>Para desarrollar esta experiencia actualmente se dispone de computadoras y periféricos de radio definida por software Hack-RF (transmisor/receptor half-duplex banda corrida 10 MHz a 6 GHz, ancho de banda 20 MHz, 8 bits). <br/>Como herramienta de software se emplea el lenguaje Python y el marco de aplicación o framework Gnuradio (software libre bajo licencia GPL).</p>');



-- -----------------------------------------------------
-- Ensayos
-- -----------------------------------------------------

-- INSERT INTO Ensayos (idUsuario, datosEntrada, datosSalida, idLaboratorio) 
-- VALUES  (3, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (4, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (2, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (5, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (2, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (4, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (5, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (1, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (1, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (4, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (2, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (4, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (2, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (3, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (5, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (5, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (5, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (1, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (5, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1),
--         (5, '{"rangoAzimut": 40, "rangoElevacion": 25}', '{"signalStrength": -85}',1);


-- INSERT INTO Ensayos (idEnsayo, idUsuario, fechaHora, datosEntrada, datosSalida, idLaboratorio) 
-- VALUES  (DEFAULT, 3, DEFAULT, '{"tipoModulacion": "4-QAM", "tipoCodificacion": 1, "intensidadMin": 10, "intensidadMax": 50 }', '{"intensidad": 40, "tasaError": 0.4}',2),
--         (DEFAULT, 4, DEFAULT, '{"tipoModulacion": "4-QAM", "tipoCodificacion": 1, "intensidadMin": 15, "intensidadMax": 80 }', '{"intensidad": 40, "tasaError": 0.4}',2),
--         (DEFAULT, 2, DEFAULT, '{"tipoModulacion": "4-QAM", "tipoCodificacion": 1, "intensidadMin": 20, "intensidadMax": 100}', '{"intensidad": 50, "tasaError": 0.4}',2),
--         (DEFAULT, 5, DEFAULT, '{"tipoModulacion": "4-QAM", "tipoCodificacion": 1, "intensidadMin": 25, "intensidadMax": 120}', '{"intensidad": 50, "tasaError": 0.4}',2),
--         (DEFAULT, 2, DEFAULT, '{"tipoModulacion": "8-QAM", "tipoCodificacion": 1, "intensidadMin": 10, "intensidadMax": 50 }', '{"intensidad": 50, "tasaError": 0.4}',2),
--         (DEFAULT, 4, DEFAULT, '{"tipoModulacion": "8-QAM", "tipoCodificacion": 1, "intensidadMin": 15, "intensidadMax": 80 }', '{"intensidad": 50, "tasaError": 0.4}',2),
--         (DEFAULT, 5, DEFAULT, '{"tipoModulacion": "8-QAM", "tipoCodificacion": 2, "intensidadMin": 20, "intensidadMax": 100}', '{"intensidad": 40, "tasaError": 0.4}',2),
--         (DEFAULT, 1, DEFAULT, '{"tipoModulacion": "8-QAM", "tipoCodificacion": 2, "intensidadMin": 25, "intensidadMax": 120}', '{"intensidad": 40, "tasaError": 0.4}',2),
--         (DEFAULT, 1, DEFAULT, '{"tipoModulacion": "16-QAM", "tipoCodificacion": 2, "intensidadMin": 10, "intensidadMax": 50 }', '{"intensidad": 80, "tasaError": 0.2}',2),
--         (DEFAULT, 4, DEFAULT, '{"tipoModulacion": "16-QAM", "tipoCodificacion": 2, "intensidadMin": 15, "intensidadMax": 80 }', '{"intensidad": 80, "tasaError": 0.2}',2),
--         (DEFAULT, 2, DEFAULT, '{"tipoModulacion": "16-QAM", "tipoCodificacion": 2, "intensidadMin": 20, "intensidadMax": 100}', '{"intensidad": 80, "tasaError": 0.2}',2),
--         (DEFAULT, 4, DEFAULT, '{"tipoModulacion": "16-QAM", "tipoCodificacion": 2, "intensidadMin": 25, "intensidadMax": 120}', '{"intensidad": 80, "tasaError": 0.2}',2),
--         (DEFAULT, 2, DEFAULT, '{"tipoModulacion": "PSK", "tipoCodificacion": 2, "intensidadMin": 10, "intensidadMax": 50 }', '{"intensidad": 40, "tasaError": 0.4}',2),
--         (DEFAULT, 3, DEFAULT, '{"tipoModulacion": "PSK", "tipoCodificacion": 2, "intensidadMin": 15, "intensidadMax": 80 }', '{"intensidad": 40, "tasaError": 0.4}',2),
--         (DEFAULT, 5, DEFAULT, '{"tipoModulacion": "PSK", "tipoCodificacion": 3, "intensidadMin": 20, "intensidadMax": 100}', '{"intensidad": 60, "tasaError": 0.3}',2),
--         (DEFAULT, 5, DEFAULT, '{"tipoModulacion": "PSK", "tipoCodificacion": 3, "intensidadMin": 25, "intensidadMax": 120}', '{"intensidad": 60, "tasaError": 0.3}',2),
--         (DEFAULT, 5, DEFAULT, '{"tipoModulacion": "FSK", "tipoCodificacion": 3, "intensidadMin": 10, "intensidadMax": 50 }', '{"intensidad": 60, "tasaError": 0.3}',2),
--         (DEFAULT, 1, DEFAULT, '{"tipoModulacion": "FSK", "tipoCodificacion": 3, "intensidadMin": 15, "intensidadMax": 80 }', '{"intensidad": 60, "tasaError": 0.3}',2),
--         (DEFAULT, 5, DEFAULT, '{"tipoModulacion": "FSK", "tipoCodificacion": 3, "intensidadMin": 20, "intensidadMax": 100}', '{"intensidad": 40, "tasaError": 0.4}',2),
--         (DEFAULT, 5, DEFAULT, '{"tipoModulacion": "FSK", "tipoCodificacion": 3, "intensidadMin": 25, "intensidadMax": 120}', '{"intensidad": 40, "tasaError": 0.4}',2);
