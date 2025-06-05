# Software Engineer Test - User Management Application

Este proyecto es una aplicación web full-stack desarrollada con **Next.js 15.3.3** y **TypeScript** en el frontend, y **PostgreSQL** como base de datos, todo orquestado con **Docker Compose**. El objetivo principal es demostrar habilidades en desarrollo web, manejo de bases de datos, uso de contenedores y buenas prácticas de codificación.

## Tabla de Contenidos

- [Software Engineer Test - User Management Application](#software-engineer-test---user-management-application)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [1. Visión General del Proyecto](#1-visión-general-del-proyecto)
  - [2. Características Implementadas](#2-características-implementadas)
  - [3. Arquitectura del Proyecto](#3-arquitectura-del-proyecto)
  - [4. Tecnologías Utilizadas](#4-tecnologías-utilizadas)
  - [5. Requisitos](#5-requisitos)
  - [6. Cómo Ejecutar el Proyecto Localmente](#6-cómo-ejecutar-el-proyecto-localmente)
  - [7. Endpoints API](#7-endpoints-api)

---

## 1. Visión General del Proyecto

Esta aplicación permite la gestión básica de usuarios, incluyendo la creación y listado, así como la visualización de métricas de analíticas sobre la base de usuarios. Está diseñada con un enfoque en la modularidad, la separación de preocupaciones y el uso de contenedores para un entorno de desarrollo consistente.

## 2. Características Implementadas

* **Configuración de Contenedores:**
    * **Next.js Application Container:** Entorno consistente para el desarrollo y despliegue de la aplicación.
    * **PostgreSQL Database Container:** Base de datos relacional para el almacenamiento de datos de usuarios.
    * **Docker Compose:** Orquestación de ambos servicios para un levantamiento y gestión sencillos.
    * **Persistencia de Datos:** Los datos de PostgreSQL persisten a través de un volumen con nombre.
    * **Inicialización Automática de DB:** La tabla `users` se crea automáticamente en el primer inicio de la base de datos mediante un script SQL (`docker/db/init.sql`).
* **Endpoints API (Next.js App Router):**
    * `GET /api/health`: Un endpoint simple para verificar el estado de la aplicación.
    * `GET /api/users`: Recupera una lista de todos los usuarios registrados en la base de datos.
    * `POST /api/users`: Permite crear un nuevo usuario. Incluye validación de entrada (`Zod`) y manejo de errores para campos requeridos y unicidad de email.
    * `GET /api/analytics`: Proporciona métricas agregadas, como el número total de usuarios y usuarios creados en el último día.
* **Interfaz de Usuario (Next.js Pages):**
    * Una página principal (`/`) que integra:
        * **`UserList` Component:** Muestra la lista de usuarios recuperada de `/api/users`.
        * **`UserForm` Component:** Un formulario para la creación de nuevos usuarios.
        * **Métricas de Analíticas:** Muestra el `totalUsers` y `usersCreatedToday` obtenidos de `/api/analytics`.
    * **Validación de Formulario:** El formulario `UserForm` utiliza [react-hook-form](https://react-hook-form.com/) y [Zod](https://zod.dev/) para una validación robusta y una gestión de estado eficiente.
    * **Estilos:** Utiliza [Tailwind CSS](https://tailwindcss.com/) para un diseño responsivo y rápido.
    * **Formato de Fecha:** Las fechas de creación de usuarios se muestran en formato `DD/MM/YYYY`.
* **Manejo de Errores:** Implementación de bloques `try-catch` y `NextResponse` para una propagación clara de errores en los endpoints API.
* **Estructura de Código:** Organización por capas (`lib`, `services`, `features`) para separación de preocupaciones, reusabilidad y mantenibilidad.

## 3. Arquitectura del Proyecto

El proyecto sigue una arquitectura modular y por capas, inspirada en las mejores prácticas Clean arquitecture y el desarrollo de APIs:

* **Capa de Presentación/API (`app/api`):** Contiene los Route Handlers de Next.js, que son los puntos de entrada para las solicitudes HTTP. Su rol es recibir solicitudes, realizar validaciones básicas de entrada y delegar la lógica de negocio a la capa de `features`.

* **Capa de Características/Dominios (`features`):** Cada funcionalidad principal (ej. `users`) tiene su propia carpeta. Aquí se encapsula toda la lógica de negocio relacionada:
    * `UserForm.tsx`: Formulario para la creacion de usuarios.
    * `user.schema.ts`: Esquemas de validación con Zod para inputs.

* **Capa de Acceso a Datos (`lib/db.ts`):** Una capa delgada y genérica para la interacción directa con la base de datos (conexión, ejecución de consultas SQL). No contiene lógica de negocio, solo la infraestructura de la base de datos.

* **Capa de Componentes (`components`):** Contiene los componentes de React reutilizables para la interfaz de usuario.

* **Contenedores Docker:** Aísla la aplicación y la base de datos en entornos separados, garantizando la consistencia del desarrollo y la facilidad de despliegue.

* **Arquitectura:**
```bash
├── docker/             # Scripts y configuraciones para Docker
│   └── db/
│       └── init.sql    # Script de inicialización de PostgreSQL
├── src/
│   ├── app/
│   │   ├── api/        # Route Handlers de Next.js
│   │   │   ├── analytics/
│   │   │   │   └── route.ts
│   │   │   ├── users/
│   │   │   │    └── route.ts
│   │   │   └── health/
│   │   │       └── route.ts
│   │   ├── globals.css # Estilos globales (Tailwind CSS)
│   │   ├── layout.tsx
│   │   └── page.tsx    # Página principal de la UI
│   ├── components/     # Componentes de UI reutilizables
│   ├── features/       # Lógica de negocio por característica
│   ├── services/       # Lógica de BD para su consumo
│   ├── types/          # interfaces
│   └── lib/            # Utilidades generales (ej. conexión a DB)
├── .env                # Variables de entorno (para desarrollo local sin Docker)
├── docker-compose.yml  # Definición de servicios Docker
├── Dockerfile          # Definición de la imagen de la aplicación Next.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md           # Este archivo
```

## 4. Tecnologías Utilizadas

* **Frontend:**
    * [Next.js](https://nextjs.org/) (v15.3.3)
    * [React](https://react.dev/)
    * [TypeScript](https://www.typescriptlang.org/)
    * [Tailwind CSS](https://tailwindcss.com/)
    * [React Hook Form](https://react-hook-form.com/)
    * [Zod](https://zod.dev/)
* **Backend:**
    * [PostgreSQL](https://www.postgresql.org/)
    * [`pg`](https://node-postgres.com/) (cliente de PostgreSQL para Node.js)
* **Contenedores:**
    * [Docker](https://www.docker.com/)
    * [Docker Compose](https://docs.docker.com/compose/)

## 5. Requisitos

Asegúrate de tener instalado lo siguiente en tu sistema:

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (incluye Docker Engine y Docker Compose)

## 6. Cómo Ejecutar el Proyecto Localmente

Sigue estos pasos para levantar la aplicación en tu máquina local:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/Ricardoo-LC/app-challenge-lkmx.git
    cd app-challenge-lkmx
    ```

2.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y añade la siguiente variable:
    ```env
    NEXT_PUBLIC_DATABASE_URL=postgres://user:password@localhost:5432/app
    ```

3.  **Levanta los contenedores Docker:**
    Desde la raíz del proyecto, ejecuta:
    ```bash
    docker-compose up --build -d
    ```

    La primera vez que ejecutes esto, puede tardar un poco mientras Docker descarga las imágenes y construye la aplicación. El script `docker/db/init.sql` se ejecutará automáticamente para crear la tabla `users` en la base de datos la primera vez que el volumen `db-data` se inicialice.

4.  **Verifica el estado de los contenedores:**
    ```bash
    docker-compose ps
    ```
    Deberías ver `nextjs-app-1` y `db-1` en estado `Up`.

5.  **Accede a la aplicación:**
    Abre tu navegador web y visita:
    [http://localhost:3000](http://localhost:3000)

La interfaz de usuario cargará, y podrás interactuar con el formulario para crear usuarios y ver la lista.

## 7. Endpoints API

Puedes probar los endpoints API usando herramientas como Postman, Insomnia, Thunder Client (VS Code) o `curl`.

* **GET /api/health**
    * **URL:** `http://localhost:3000/api/health`
    * **Método:** `GET`
    * **Respuesta Exitosa (200 OK):**
        ```json
        {"status":"OK"}
        ```

* **GET /api/users**
    * **URL:** `http://localhost:3000/api/users`
    * **Método:** `GET`
    * **Respuesta Exitosa (200 OK):**
        ```json
        [
          {
            "id": 1,
            "name": "Juan Pérez",
            "email": "juan.perez@example.com",
            "created_at": "2023-10-27T10:00:00.000Z"
          }
        ]
        ```
        (O un array vacío si no hay usuarios)

* **POST /api/users**
    * **URL:** `http://localhost:3000/api/users`
    * **Método:** `POST`
    * **Headers:** `Content-Type: application/json`
    * **Body (raw JSON):**
        ```json
        {
          "name": "Nuevo Usuario",
          "email": "nuevo.usuario@example.com"
        }
        ```
    * **Respuesta Exitosa (201 Created):**
        ```json
        {
          "id": 2,
          "name": "Nuevo Usuario",
          "email": "nuevo.usuario@example.com",
          "created_at": "2023-10-27T10:05:00.000Z"
        }
        ```
    * **Respuesta de Error (400 Bad Request - Validación):**
        ```json
        {
          "message": "Validation failed",
          "errors": {
            "email": ["Dirección de correo electrónico inválida"]
          }
        }
        ```
    * **Respuesta de Error (409 Conflict - Email duplicado):**
        ```json
        {
          "message": "El correo electrónico ya existe."
        }
        ```

* **GET /api/analytics**
    * **URL:** `http://localhost:3000/api/analytics`
    * **Método:** `GET`
    * **Respuesta Exitosa (200 OK):**
        ```json
        {
          "totalUsers": 5,
          "usersCreatedToday": 2
        }
        ```