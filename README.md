# Product Admin Dashboard

A colorful, responsive admin dashboard for managing products built with Next.js, TypeScript, and TailwindCSS.

## Features

- 🎨 **Colorful UI**: Beautiful gradient designs and vibrant colors
- 📱 **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- 🔐 **Token-based Authentication**: Secure login system
- 📊 **Dashboard Analytics**: Overview of products, pricing, and statistics
- 🛍️ **Product Management**: Full CRUD operations for products
- 🔍 **Search & Filter**: Find products quickly
- ✅ **Form Validation**: Client-side validation with error messages
- 🚀 **Real-time Updates**: Using React Query for data synchronization
- 🐳 **Docker Support**: Easy deployment with Docker Compose

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **State Management**: React Query (TanStack Query)
- **UI Components**: Radix UI primitives with custom styling
- **Authentication**: Token-based auth with localStorage
- **Icons**: Lucide React
- **Deployment**: Docker & Docker Compose

## Getting Started

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose (for full stack deployment)
- Backend API from Task 1 running

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd product-admin-dashboard
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit \`.env.local\`:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:3001
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

- **Username**: admin
- **Password**: password

## Docker Deployment

To run the full stack with Docker Compose:

\`\`\`bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
\`\`\`

This will start:
- Frontend (Next.js) on port 3000
- Backend API on port 3001  
- PostgreSQL database on port 5432

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication
│   └── globals.css       # Global styles
├── components/           # Reusable components
│   ├── dashboard/        # Dashboard-specific components
│   ├── providers/        # Context providers
│   └── ui/              # UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and API client
├── docker-compose.yml   # Docker configuration
└── README.md           # Documentation
\`\`\`

## Features Overview

### Dashboard
- **Analytics Cards**: Colorful gradient cards showing key metrics
- **Product Statistics**: Total products, value, average price, and tags
- **Recent Products**: Quick overview of latest additions

### Product Management
- **Product List**: Searchable table with all products
- **Create/Edit Forms**: Validated forms with tag management
- **Delete Confirmation**: Safe deletion with confirmation dialogs
- **Real-time Updates**: Automatic refresh after operations

### Authentication
- **Login Page**: Beautiful gradient design with demo credentials
- **Token Management**: Secure token storage and validation
- **Protected Routes**: Automatic redirection for unauthorized access

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablets
- **Desktop Experience**: Full-featured desktop interface
- **Collapsible Sidebar**: Space-efficient navigation

## API Integration

The dashboard integrates with the Product Metadata Microservice from Task 1:

### Endpoints Used
- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Error Handling
- Network error handling with user-friendly messages
- Form validation with real-time feedback
- Loading states for better UX
- Toast notifications for success/error states

## Customization

### Colors and Themes
The dashboard uses custom gradient classes defined in `globals.css`:

\`\`\`css
.gradient-bg { /* Purple to blue gradient */ }
.gradient-card { /* Pink to red gradient */ }
.gradient-success { /* Blue to cyan gradient */ }
.gradient-warning { /* Green to cyan gradient */ }
\`\`\`

### Adding New Features
1. Create new components in `components/dashboard/`
2. Add new pages in `app/dashboard/`
3. Update navigation in `components/dashboard/sidebar.tsx`
4. Add API calls in `lib/api.ts`
5. Create custom hooks in `hooks/`

## Environment Variables

\`\`\`bash
# Required
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional
NEXT_PUBLIC_APP_NAME=Product Admin Dashboard
NEXT_PUBLIC_VERSION=1.0.0
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the demo credentials for testing
