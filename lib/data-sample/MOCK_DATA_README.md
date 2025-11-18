# Mock Data Admin Mode

## Overview
The Admin Mode feature allows developers and testers to quickly populate application forms with sample data for testing and demonstration purposes.

## How It Works

### Admin Mode Toggle Button
Each application form now includes an **Admin Mode** toggle button in the top-right corner of the form header:
- **OFF State**: Border button with purple outline
- **ON State**: Filled purple button with white text

### Using Admin Mode

1. **Navigate to any application form:**
   - `/expats` - eXpats Programme
   - `/derantau` - DE Rantau Programme
   - `/mtep` - Malaysia Tech Entrepreneur Programme

2. **Click the "Admin Mode: OFF" button** to enable admin mode
   - All form fields will be instantly populated with realistic mock data
   - The button will change to "Admin Mode: ON"

3. **Click the "Admin Mode: ON" button** to disable admin mode
   - All form fields will be cleared
   - The button will change back to "Admin Mode: OFF"

## Mock Data Structure

The mock data is stored in `combined-mock-data.json` with the following structure:

```json
{
  "metadata": {
    "description": "Mock data for all MDEC programme application forms",
    "created": "2025-11-18",
    "purpose": "Admin mode auto-fill functionality"
  },
  "expats": { /* Company registration data */ },
  "de-rantau": { /* Digital nomad data */ },
  "mtep": { /* Tech entrepreneur data */ }
}
```

Each program's mock data contains key-value pairs where:
- **Key**: Question ID (e.g., `section-1-subsection-1-question-1`)
- **Value**: Sample answer for that field

## Mock Data Content

### Expats Programme
- Company: TechCorp Solutions Sdn Bhd
- Registration Number: 202301234567
- Contact Person: Sarah Wong
- Directors and Shareholders information
- Authorized personnel details

### DE Rantau Programme
- Applicant: Michael Robert Johnson (USA)
- Passport: A12345678
- Education: Stanford University, Computer Science
- Work Experience: Google Inc, Senior Software Engineer
- Sponsor: Digital Nomad Hub Malaysia

### MTEP Programme
- Applicant: Robert James Chen (Singapore)
- Passport: S1234567A
- Education: National University of Singapore, Business Administration
- Business Idea: AI-powered e-commerce platform for SMEs
- Sponsor: MaGIC

## Technical Implementation

### Files Modified
1. **ApplicationForm.tsx**
   - Added `adminMode` state
   - Added `toggleAdminMode()` function
   - Imported mock data JSON
   - Added Admin Mode toggle button UI
   - Program name mapping logic

2. **combined-mock-data.json**
   - Created new file with mock data for all programs
   - Organized by program key (expats, de-rantau, mtep)

### Program Name Mapping
The system maps various program name formats to their corresponding mock data keys:

```typescript
const programKeyMap: Record<string, string> = {
  "Expats": "expats",
  "eXpats": "expats",
  "DE Rantau": "de-rantau",
  "MTEP": "mtep",
  "Malaysia Tech Entrepreneur Programme": "mtep"
};
```

## Use Cases

### 1. Development Testing
Quickly test form validation, submission, and data flow without manually entering data.

### 2. UI/UX Demonstrations
Show stakeholders how forms work with realistic data pre-populated.

### 3. Integration Testing
Test backend API integrations with consistent, predictable data.

### 4. Training
Train support staff or administrators on how forms should be filled out.

## Notes

- Mock data includes placeholders for file uploads (e.g., "Mock passport uploaded")
- All mock data is client-side only and does not persist
- Admin Mode button is visible to all users (consider adding authentication in production)
- When Admin Mode is toggled off, all form data is cleared, including manually entered data

## Future Enhancements

Consider implementing:
- Multiple mock data profiles per program
- Admin authentication to restrict access
- Partial form filling (fill only required fields)
- Export filled form data as JSON
- Import custom mock data profiles

