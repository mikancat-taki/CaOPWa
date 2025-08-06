# CaOPWa - Integrated Workspace Application

## Overview

CaOPWa is a comprehensive, space-themed integrated workspace application that combines multiple productivity tools into a single unified platform. The application features a calendar, real-time chat, translation tools, AI search capabilities, web search, and various utility tools, all presented with a cosmic/space aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom space-themed color variables and dark mode support
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Component Structure**: Modular component architecture with reusable UI components

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with WebSocket support for real-time features
- **Data Storage**: In-memory storage with interfaces for future database integration
- **Session Management**: Express sessions with PostgreSQL session store configuration

### Database Schema
The application uses Drizzle ORM with PostgreSQL dialect and defines three main entities:
- **Users**: User authentication and profile data (id, username, password)
- **Chat Messages**: Real-time messaging system (id, userId, username, message, timestamp)
- **Search Queries**: Search history and results storage (id, query, type, results, timestamp)

### Real-time Communication
- **WebSocket Integration**: Custom WebSocket hook for real-time chat functionality
- **Message Broadcasting**: Server-side WebSocket handling for live chat updates
- **Client Synchronization**: Automatic query invalidation on WebSocket messages

### Component Organization
- **Core Components**: Calendar, Chat, Translator, AI Search, Utility Tools
- **UI Components**: Comprehensive Shadcn/ui component library with custom theming
- **Layout**: Responsive grid-based dashboard with space-themed visual effects
- **Theming**: Custom CSS variables for space/cosmic color scheme with glass morphism effects

### Development Setup
- **Build System**: Vite with React plugin and runtime error overlay
- **Development**: Hot module replacement with Vite middleware in Express
- **Production**: Separate client/server builds with static file serving
- **Type Safety**: Shared TypeScript schemas between client and server

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Neon Database serverless driver for PostgreSQL
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **drizzle-kit**: Database migration and schema management tools

### UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Component variant management
- **cmdk**: Command palette component

### State Management and Data Fetching
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form state management with validation
- **@hookform/resolvers**: Form validation resolvers

### Real-time and Communication
- **ws**: WebSocket library for real-time chat functionality
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Development Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution engine for development
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Replit integration plugin

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **zod**: Schema validation library
- **nanoid**: Unique ID generation
- **lucide-react**: Icon library for UI components