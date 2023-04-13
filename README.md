# Laboratorios Remotos - Telecomunicaciones

## Facultad de Ciencias Exactas y Tecnología
## Universidad Nacional de Tucumán

-------

Integrantes:

- Berarducci, Gianluca
- Quevedo, Franco

-------

Entorno para las aplicaciones de los Laboratorios Remotos de Telecomunicaciones



```bash
# Levantar los servicios parandose en teleco/
$ docker compose up

$ sudo chmod 777 teleco/scripts/create-db.sh
$ ./teleco/scripts/create-db.sh
```

Para levantar un entorno dev para el server en el 3005

```bash
$ sudo chmod 777 scripts/dev-server.sh
$ ./scripts/dev-server.sh
```

```bash
$ docker run -ti --name dev-teleco -v $(pwd)/server:/usr/src/server -p 3033:3000 --network labrem-net dev-teleco:latest
```
