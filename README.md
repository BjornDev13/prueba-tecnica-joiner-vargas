# Cliente de la API de Dragon Ball

Una aplicación web moderna construida con React, TypeScript y SASS para gestionar personajes y planetas de Dragon Ball utilizando la [API de Dragon Ball](https://web.dragonball-api.com/documentation).

## Capturas de Pantalla

### Vista de Personajes (Rol: Admin)
![Vista de Personajes (Admin)](https://i.imgur.com/9V5X027.png)

### Vista de Planetas (Rol: User)
![Vista de Planetas (User)](https://i.imgur.com/p4S742X.png)

### Vista de Inicio de Sesión
![Vista de Inicio de Sesión](https://i.imgur.com/2h3h2Ah.png)

## Características

### 🔐 Autenticación y Autorización
- Sistema de inicio de sesión simulado con control de acceso basado en roles.
- Dos roles de usuario:
  - **Admin** (`admin/admin123`): Acceso CRUD completo a los personajes.
  - **User** (`user/user123`): Acceso de solo lectura a personajes y planetas.

### 👤 Gestión de Personajes (CRUD)
- **Crear**: Añadir nuevos personajes con información completa (solo Admin).
- **Leer**: Ver todos los personajes con paginación.
- **Actualizar**: Editar detalles de personajes existentes (solo Admin).
- **Eliminar**: Eliminar personajes del sistema (solo Admin).
- **Filtrar**: Buscar personajes por nombre y raza.

### 🌍 Gestión de Planetas
- Ver todos los planetas de Dragon Ball con paginación.
- Filtrar planetas por nombre y estado (Activo/Destruido).
- Mostrar información del planeta, incluyendo imágenes y descripciones.

### 🎨 Interfaz de Usuario
- Diseño responsivo con estilos SASS.
- Diseño basado en tarjetas para una fácil navegación.
- Diálogos modales para la creación y edición de personajes.
- Navegación y filtrado intuitivos.

## Tecnologías Utilizadas

- **Framework Frontend**: React 19.2.0
- **Lenguaje**: TypeScript 5.9.3
- **Herramienta de Compilación**: Vite 7.2.4
- **Estilos**: SASS 1.97.3
- **Enrutamiento**: React Router DOM 7.12.0
- **Cliente HTTP**: Axios 1.13.2
- **Gestión de Formularios**: React Hook Form 7.71.1
- **Validación de Esquemas**: Zod 4.3.5 / Yup 1.7.1
- **Calidad de Código**: ESLint 9.39.1

## Cómo Empezar

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/BjornDev13/prueba-tecnica-joiner-vargas.git
cd prueba-tecnica-joiner-vargas
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador y navega a `http://localhost:5173`

### Compilar para Producción

```bash
npm run build
```

Los archivos listos para producción se generarán en el directorio `dist`.

### Vista Previa de la Compilación de Producción

```bash
npm run preview
```

## Uso

### Inicio de Sesión
1. Navega a la aplicación.
2. Usa una de las credenciales de demostración:
   - Admin: `admin / admin123`
   - User: `user / user123`
3. Haz clic en "Sign In".

### Gestionar Personajes (Solo Admin)

#### Crear un Personaje
1. Haz clic en el botón "➕ Create Character".
2. Rellena todos los campos requeridos:
   - Nombre
   - Raza
   - Género
   - Ki
   - Descripción
   - URL de la Imagen
3. Haz clic en "Create Character" para guardar.

#### Editar un Personaje
1. Haz clic en el icono del lápiz (✏️) en la tarjeta de un personaje.
2. Modifica la información en el modal.
3. Haz clic en "Update Character" para guardar los cambios.

#### Eliminar un Personaje
1. Haz clic en el icono de la papelera (🗑️) en la tarjeta de un personaje.
2. Confirma la eliminación.

### Filtrar Personajes y Planetas
- Usa los campos de búsqueda y los menús desplegables en la parte superior de las cuadrículas de personajes y planetas para filtrar los resultados.
   - Max Ki
   - Affiliation
   - Image URL
   - Description
3. Click "Create"

#### Edit a Character
1. Click the "✏️ Edit" button on any character card
2. Modify the desired fields
3. Click "Update"

#### Delete a Character
1. Click the "🗑️ Delete" button on any character card
2. Confirm the deletion

### Filtering
- Use the filter inputs to search by name or race
- Results update in real-time as you type

### Viewing Planets
1. Click "Planets" in the navigation menu
2. Browse through the available planets
3. Use filters to search by name or status

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── CharacterModal.tsx
│   ├── Navbar.tsx
│   └── PrivateRoute.tsx
├── contexts/           # React context providers
│   └── AuthContext.tsx
├── pages/             # Page components
│   ├── Characters.tsx
│   ├── Login.tsx
│   └── Planets.tsx
├── services/          # API service layer
│   └── api.ts
├── styles/            # SASS stylesheets
│   └── main.scss
├── types/             # TypeScript type definitions
│   └── index.ts
└── App.tsx            # Main application component
```

## Features Implementation Details

### Authentication
- Uses React Context API for global auth state
- Stores user session in localStorage for persistence
- Implements protected routes with automatic redirection

### Data Management
- API integration with Dragon Ball API
- Local storage for user-created characters
- Optimistic UI updates for better UX
- Error handling with user-friendly messages

### Styling
- Modular SASS architecture
- Responsive design for mobile and desktop
- Consistent color scheme and typography
- Smooth transitions and animations

## API Reference

This application uses the [Dragon Ball API](https://web.dragonball-api.com/documentation):
- **Characters Endpoint**: `/api/characters`
- **Planets Endpoint**: `/api/planets`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is created as a technical test.

## Acknowledgments

- Dragon Ball API for providing the data
- Dragon Ball franchise for the characters and planets
