# Challenge React/MongoDB 🚀📊

Este proyecto implementa una aplicación que muestra y gestiona precios especiales de productos para diferentes usuarios, utilizando React como frontend y una API de Node.js con express que interactúa con MongoDB. 🛍️

## Introducción 🌟

Este proyecto fue desarrollado como parte del desafío técnico para evaluar conocimientos en React, Node.js y MongoDB. La aplicación permite:

- 📋 Visualizar productos con sus precios correspondientes
- 🔍 Visualizar los detalles de los productos con su descripción, categoría y más información
- 💲 Mostrar precios especiales personalizados para diferentes usuarios
- ➕ Agregar y gestionar precios especiales a través de un formulario

## Tecnologías utilizadas 🛠️

- **Frontend**: Vite + React 18, React Router v6, Context API
- **Backend**: Node.js, Express, Mongoose
- **Base de datos**: MongoDB
- **Lenguaje**: JavaScript ES6+
- **Herramientas de desarrollo**:
  - Vite (herramienta de build y development server)
  - ESLint (linting de código)

## Pasos para ejecutar localmente 💻

### Prerrequisitos
- Node.js (v14 o superior)
- npm o yarn

### Opciones de Ejecución 🚦

#### Opción 1: Ejecución Independiente Backend y Frontend

##### Iniciar Backend
1. Navegar al directorio del backend:
```bash
cd backend
npm install
npm run dev
```
El servidor estará disponible en http://localhost:5000 (o el puerto configurado)

##### Iniciar Frontend
1. En otra terminal, navegar al directorio del frontend:
```bash
cd frontend
npm install
npm run dev
```
La aplicación frontend estará disponible en http://localhost:3000

#### Opción 2: Ejecución Conjunta 🔄
Para ejecutar backend y frontend simultáneamente:

```bash
# En el directorio raíz del proyecto
npm install
npm run dev
```

Esta opción utiliza `concurrently` para iniciar tanto el backend como el frontend en un solo comando.

### Configuración de Variables de Entorno 🔐

Asegúrate de configurar las variables de entorno necesarias:

- En `backend/.env`:
  - `MONGODB_URI`: Cadena de conexión a tu base de datos MongoDB
  - `PORT`: Puerto para el servidor backend (opcional, por defecto 5000)

- En `frontend/.env`:
  - `VITE_API_URL`: URL base de la API backend (por ejemplo, http://localhost:5000)

### Notas Adicionales ℹ️
- Verifica que MongoDB esté corriendo localmente o configura la conexión remota
- Asegúrate de tener instaladas todas las dependencias antes de ejecutar

## Justificación de elecciones técnicas 🤔

### Elección de JavaScript (ES6+) vs TypeScript

Opté por utilizar JavaScript (ES6+) en lugar de TypeScript por las siguientes razones:

1. **Tiempo de desarrollo**: JavaScript permite un desarrollo más rápido al eliminar la necesidad de definir tipos y interfaces.
2. **Simplicidad**: Para proyectos de tamaño medio como este desafío, JavaScript ofrece un buen equilibrio entre flexibilidad y estructura.
3. **Ecosistema maduro**: Las bibliotecas utilizadas tienen un excelente soporte para JavaScript.

No obstante, TypeScript sería una mejor opción para proyectos más grandes o con equipos más grandes debido a sus ventajas en mantenibilidad y detección temprana de errores.

## Funcionalidades implementadas ✨

1. **Visualización de productos**: Tabla que muestra los productos disponibles. 📦
2. **Detalles de los productos**: Tarjetas que muestra mas informacion de los productos. 🏷️
3. **Precios especiales personalizados**: Los precios cambian según el usuario seleccionado. 💰
4. **Formulario de subida**: Interfaz para agregar precios especiales para usuarios. 📝
5. **Gestión de precios especiales**: Interfaz para ver y eliminar precios especiales. 🗑️

## Mejoras futuras 🚧

- Implementar autenticación real de usuarios 🔒
- Añadir paginación para grandes conjuntos de datos 📄
- Implementar filtros y búsqueda en las tablas 🔎
- Añadir más validaciones en formularios ✅
- Integrar tests unitarios y de integración 🧪