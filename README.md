# User Management System

A modern React application for user management with TypeScript, Redux Toolkit, and Ant Design.


## Features
- User authentication
- User management (CRUD operations)
- Permission-based access control
- Infinite scroll
- Responsive design
- Type-safe development

## Tech Stack
- React 19
- TypeScript 5
- Redux Toolkit & RTK Query
- Ant Design 5
- React Router 6
- Vite

## Project Structure


    /src
    ├── /assets            # Static assets and resources
    ├── /components        # Shared components
    ├── /constants         # Global constants and enums
    ├── /pages            # Page components with their local components
    ├── /shared           # Shared utilities and components
    │   ├── /components   # Common UI components
    │   └── /hooks        # Common custom hooks
    ├── /store            # Redux store configuration
    │   ├── /api         # API configurations and RTK Query
    ├── /types            # Global TypeScript types
    ├── App.tsx           # Root component
    ├── openapi-config.ts # API RTK code generation config
    └── main.tsx          # Application entry point

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## Development Guidelines

- Follow TypeScript strict mode
- Use JSDoc for documentation
- Follow component composition pattern
- Implement comprehensive error handling
- Use well-defined type definitions

## Code Style

- Use functional components
- Implement structured error boundaries
- Follow React best practices
- Maintain consistent TypeScript types
- Implement structured loading states
- Use validated form handling
- Follow established folder structure
- Use consistent naming conventions
- Implement comprehensive testing
- Maintain detailed documentation

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

    VITE_API_URL=your_api_url

> **Note**: This repository represents a carefully extracted module from an enterprise-level application, 
> specifically curated to demonstrate architectural decisions, code organization patterns, and implementation 
> approaches. 