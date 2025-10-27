# **App Name**: HufManager

## Core Features:

- Customer and Horse Management: Manage customer and horse data, including creation, modification, and deletion of records.
- Appointment Scheduling: Schedule, edit, delete, and export appointments in ICS/CSV formats.
- Hoof Analysis Tool (HufAnalysePro): A multi-step wizard for detailed hoof analysis with camera integration, geolocation, digital signature, and PDF export.
- AI-Powered Hoof Health Analysis: Utilize Google Gemini API to generate textual summaries and recommendations based on hoof analysis data. The tool getsHufHealthAnalysis sends the data from a hoof analysis to Gemini, to generate a textual summary and recommendations.
- AI-Driven Appointment Suggestions: Leverage Google Gemini API to provide intelligent appointment suggestions based on the current calendar and user requests. The tool getsTerminSuggestions sends the current terminkalender and a freetext-request to Gemini, to get intelligent Terminvorschläge.
- QR Code Check-in: Scan QR codes for quick horse identification.
- Role-Based Access Control with Consent Management: Implement a role-based access control system that leverages customer-approved consents. Data Freigabe für Tierarzt und Schmied

## Style Guidelines:

- Primary color: Brand Orange (#FF6A00) for primary actions, active states, and highlights.
- Secondary color: Brand Blue (#0066FF) for special accents.
- Text and Dark Elements: Brand Dark (#1a1a1a) for standard text and dark UI elements.
- Background: Brand Light Gray (#f4f4f7) as the main background color for a clean appearance.
- Font: 'Inter' (sans-serif) for both headings and body text, ensuring readability and a modern look. Note: currently only Google Fonts are supported.
- Utilize a set of 24x24px stroke icons consistently throughout the application. Icons such as CameraIcon, ClockIcon, UsersIcon, SparklesIcon, PencilIcon and TrashIcon will provide easy visual cues for features.
- The layout will be based on Flexbox and CSS Grid, managed by Tailwind CSS classes, with a fixed sidebar and flexible main content area.
- Subtle transitions and animations will enhance user experience when navigating and performing actions.