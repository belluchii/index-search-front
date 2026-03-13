# Index Search — Frontend

Frontend del buscador de productos de Amazon con capacidades de búsqueda full-text sobre un dataset de 500,000 productos.

🔗 [Demo en vivo](https://amazon-index-search.netlify.app/) · [Backend](https://github.com/belluchii/index-search-back)

## ¿Qué es?

Aplicación web que permite buscar en tiempo real sobre un índice de más de 850,000 productos de Amazon. El frontend consume una API REST construida con Fastify y MongoDB, mostrando resultados de forma rápida y eficiente.

## Tech Stack

- **Framework:** Vue.js
- **Build tool:** Vite
- **Lenguaje:** JavaScript

## Requisitos

- Node.js >= 18.x
- Backend corriendo localmente o en producción

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/belluchii/index-search-front.git
cd index-search-front
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo `.env`:

```env
VITE_API_URL=http://localhost:3000
```

4. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Previsualiza el build de producción |

## Repositorios relacionados

- [index-search-back](https://github.com/belluchii/index-search-back) — API REST con Node.js, Fastify y MongoDB
