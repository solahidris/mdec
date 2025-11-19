# Admin Dashboard

## Overview
The Admin Dashboard provides a comprehensive view of all applications across MDEC's programmes (Expats, MTEP, and DE Rantau) with a Kanban-style board for tracking application status. The dashboard features a collapsible sidebar navigation powered by shadcn/ui.

## Features

### 1. **Collapsible Sidebar Navigation**
- Beautiful, modern sidebar that collapses to icons
- Quick access to all dashboard sections
- Organized navigation groups:
  - **Main Navigation**: Dashboard, All Applications, Analytics
  - **Programmes**: Direct access to Expats, MTEP, and DE Rantau
  - **Settings**: Notifications (with badge count), Settings, Help & Support
- User profile dropdown in footer with logout option
- MDEC branding with logo
- Link to public website

### 2. **Dashboard Statistics**
- Total Applications count with trend indicators
- Under Review applications count
- Approved applications count with trend
- Documents Pending count requiring action

### 3. **Kanban Board System**
The dashboard uses a Kanban board to visualize applications through different stages:

- **Submitted** - New applications that have been submitted
- **Under Review** - Applications currently being reviewed by the team
- **Documents Pending** - Applications waiting for additional documents
- **Approved** - Successfully processed applications
- **Rejected** - Applications that were not approved

### 4. **Programme Filters**
Filter applications by programme type:
- All Programmes
- Expats
- MTEP
- DE Rantau

### 5. **Application Cards**
Each application card displays:
- Applicant name and ID
- Priority level (High, Medium, Low)
- Programme type
- Company name
- Position
- Nationality
- Submission date
- Quick action to view full details

### 6. **Quick Actions**
- Export Report
- View Analytics
- View Pending Actions

## Components

### Layout Components

#### App Sidebar
`/components/dashboard/app-sidebar.tsx`
- Collapsible sidebar navigation using shadcn/ui sidebar component
- Organized menu groups with icons
- User profile section with dropdown menu
- Badge notifications
- Responsive and accessible

#### Dashboard Top Bar
`/components/dashboard/DashboardTopBar.tsx`
- Sidebar toggle trigger
- Breadcrumb navigation
- Search functionality
- Quick action buttons (Filter, Export)
- Sticky header behavior

### Dashboard Page
`/app/dashboard/page.tsx`
- Main dashboard layout with sidebar provider
- Statistics calculation
- Application filtering logic
- Kanban board rendering

### Component Files

#### Dashboard Header (Legacy)
`/components/dashboard/DashboardHeader.tsx`
- Original header (replaced by sidebar + top bar)
- Preserved for reference

#### Dashboard Stat Card
`/components/dashboard/DashboardStatCard.tsx`
- Reusable statistics card
- Trend indicators
- Customizable colors and icons

### Kanban Column
`/components/dashboard/KanbanColumn.tsx`
- Column container for each status
- Application count badge
- Scrollable card list

### Kanban Card
`/components/dashboard/KanbanCard.tsx`
- Individual application card
- Priority and programme badges
- Applicant details
- Quick actions

## Data Structure

### Application Interface
```typescript
interface Application {
  id: string;              // Unique application ID
  applicantName: string;   // Full name of applicant
  programme: string;       // Expats, MTEP, or DE Rantau
  company: string;         // Company or "Freelance"
  submittedDate: string;   // ISO date string
  status: string;          // Application status
  priority: "high" | "medium" | "low";
  email: string;           // Contact email
  phone: string;           // Contact phone
  position: string;        // Job position/role
  nationality: string;     // Country of origin
}
```

### Status Values
- `submitted` - Initial submission
- `under-review` - Being reviewed
- `documents-pending` - Waiting for documents
- `approved` - Application approved
- `rejected` - Application rejected

## Styling

The dashboard follows MDEC's brand guidelines:
- **Primary Color**: Red (MDEC brand color) - `oklch(0.45 0.44 29)`
- **Background**: Zinc-50 for main background
- **Cards**: White with subtle shadows
- **Borders**: Consistent border radius and colors
- **Typography**: Semibold headings, regular body text

### Sidebar Styling
The sidebar is fully customized to match MDEC branding:
- **Sidebar Primary**: Uses MDEC red for active states
- **Sidebar Ring**: MDEC red for focus states
- **Sidebar Background**: Light gray (#f8f8f8) in light mode
- **Collapsible**: Smoothly collapses to icon-only view
- All sidebar colors defined in `/app/globals.css`

### Priority Colors
- **High**: Red background with red text
- **Medium**: Yellow background with yellow text
- **Low**: Green background with green text

### Programme Colors
- **Expats**: Blue theme
- **MTEP**: Purple theme
- **DE Rantau**: Orange theme

## Usage

### Accessing the Dashboard
Navigate to `/dashboard` to view the admin dashboard with the collapsible sidebar.

### Using the Sidebar
- **Collapse/Expand**: Click the hamburger menu icon in the top bar to toggle sidebar
- **Icon-only Mode**: When collapsed, hover over icons to see labels
- **Navigation**: Click any menu item to navigate to that section
- **User Menu**: Click on the user profile at the bottom for profile/settings/logout options
- **Notifications Badge**: Red badge shows count of unread notifications (currently set to 3)

### Viewing Application Details
Click the "View Details" button on any application card to see full application information.

### Filtering Applications
Use the programme tabs at the top of the kanban board to filter by specific programme types.

### Searching Applications
Use the search bar in the header to search for specific applications (implementation ready).

## Mock Data
Sample application data is provided in:
`/lib/data-sample/dashboard-applications.json`

This includes 12 sample applications across all programmes with various statuses and priorities.

## Future Enhancements
- Drag and drop functionality to move applications between columns
- Advanced filtering and sorting options
- Detailed application view modal
- Real-time notifications
- Application status history timeline
- Bulk actions for multiple applications
- Export functionality for reports
- Analytics dashboard with charts and graphs
- Email notifications for status changes
- Document management system
- User role management

## Technical Details

### shadcn/ui Components Used
The dashboard utilizes the following shadcn/ui components:
- **Sidebar**: Main navigation component with collapsible functionality
- **Dropdown Menu**: User profile menu
- **Breadcrumb**: Navigation breadcrumb in top bar
- **Separator**: Visual dividers
- **Tooltip**: Hover tooltips (auto-included with sidebar)
- **Skeleton**: Loading states (auto-included with sidebar)
- **Sheet**: Mobile sidebar drawer (auto-included with sidebar)
- **Button**: Action buttons
- **Card**: Content containers
- **Badge**: Status and priority indicators
- **Tabs**: Programme filtering
- **Input**: Search functionality

### Installation
All necessary shadcn/ui components are already installed. If you need to reinstall:

```bash
npx shadcn@latest add sidebar dropdown-menu breadcrumb
```

### Dependencies Added
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-separator`
- `@radix-ui/react-tooltip`
- Additional Radix UI primitives for sidebar functionality

