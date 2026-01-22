# Dragon Ball API Client

A modern web application built with React, TypeScript, and SASS for managing Dragon Ball characters and planets using the [Dragon Ball API](https://web.dragonball-api.com/documentation).

## Features

### 🔐 Authentication & Authorization
- Mock login system with role-based access control
- Two user roles:
  - **Admin** (`admin/admin123`): Full CRUD access to characters
  - **User** (`user/user123`): Read-only access to characters and planets

### 👤 Character Management (CRUD)
- **Create**: Add new characters with complete information (Admin only)
- **Read**: View all characters with pagination
- **Update**: Edit existing character details (Admin only)
- **Delete**: Remove characters from the system (Admin only)
- **Filter**: Search characters by name and race

### 🌍 Planet Management
- View all Dragon Ball planets with pagination
- Filter planets by name and status (Active/Destroyed)
- Display planet information including images and descriptions

### 🎨 User Interface
- Responsive design with SASS styling
- Card-based layout for easy browsing
- Modal dialogs for character creation and editing
- Intuitive navigation and filtering

## Technology Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: SASS 1.97.3
- **Routing**: React Router DOM 7.12.0
- **HTTP Client**: Axios 1.13.2
- **Form Management**: React Hook Form 7.71.1
- **Schema Validation**: Zod 4.3.5 / Yup 1.7.1
- **Code Quality**: ESLint 9.39.1

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BjornDev13/prueba-tecnica-joiner-vargas.git
cd prueba-tecnica-joiner-vargas
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Login
1. Navigate to the application
2. Use one of the demo credentials:
   - Admin: `admin / admin123`
   - User: `user / user123`
3. Click "Sign In"

### Managing Characters (Admin Only)

#### Create a Character
1. Click the "➕ Create Character" button
2. Fill in all required fields:
   - Name
   - Race
   - Gender
   - Ki
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

## Screenshots

### Login Page
![Login Page](https://github.com/user-attachments/assets/16e984a0-c2b3-4904-be43-3a6bee818510)

### Characters Page (Admin View)
![Characters Page](https://github.com/user-attachments/assets/c4e08f36-6e4d-46df-8fa3-b997f9343ce5)

### Create Character Modal
![Create Character](https://github.com/user-attachments/assets/815bdbab-29e4-4b4c-8e99-559969c14d76)

### Edit Character Modal
![Edit Character](https://github.com/user-attachments/assets/e18dbfb1-e852-45ab-b08a-872a778ab331)

### Characters Page (User View - Read Only)
![User View](https://github.com/user-attachments/assets/e0ee2ccd-9423-49d8-9bf0-7c61259dcf65)

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
