# Workout Tracker API

API RESTful construida con Node.js y Express para administrar usuarios, rutinas de entrenamiento, ejercicios y registros de progreso.

## Inicio rápido

```bash
npm install
Copy-Item .env.example .env
npm run dev
```

La API se inicia en `http://localhost:3000`. Consulte `GET /health` para comprobar su estado.

## Rutas REST

- `/users`: listar, consultar, crear, actualizar y eliminar usuarios.
- `/workouts`: administrar rutinas de entrenamiento.
- `/exercises`: administrar ejercicios.
- `/progress`: administrar registros de progreso.

Los recursos aceptan `GET`, `POST`, `PUT`, `PATCH` y `DELETE` según corresponda. Los datos se mantienen en memoria durante la ejecución.

## Control de versiones

El proyecto usa `main` como rama estable, `develop` como integración y ramas `feat/users`, `feat/workouts`, `feat/exercises` y `feat/progress` para el desarrollo de cada recurso.
