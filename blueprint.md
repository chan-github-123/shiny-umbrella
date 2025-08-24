## Web Application Blueprint: Consulting Services (Student-Focused)

**Project Goal:** To create a web application for providing 생기부 (Student Record) consulting for high school students and 자소서 (Personal Statement) consulting for middle school students.

**Target Audience:** High school students, middle school students, and their parents.

**Technology Stack:**

*   **Frontend:** Next.js (App Router), React, TypeScript
*   **Styling:** CSS Modules (or Tailwind CSS, depending on preference)
*   **Backend/Database:** Firebase (Authentication, Firestore, etc.)

**App Router Structure:**

```
/app
├── layout.tsx  // Root layout (includes global styles, header, footer - planned)
├── page.tsx    // Main landing page
├── services    // Service details pages
│   ├── sengi부
│   │   └── page.tsx  // 생기부 consulting details
│   └── jaso서
│       └── page.tsx  // 자소서 consulting details
├── about       // Consultant profile(s) page
│   └── page.tsx
├── testimonials // Success stories and testimonials page
│   └── page.tsx
├── contact     // Contact information and form page
│   └── page.tsx
├── reservation // Online reservation system
│   └── page.tsx  // Reservation form and calendar
├── blog        // Blog or resource library
│   └── page.tsx
├── faq         // Frequently Asked Questions page
│   └── page.tsx
└── consultation // Online consultation/chat (future feature)
    └── page.tsx
```
**Planned Features:**

1.  **Service Details:** Dedicated pages explaining 생기부 and 자소서 consulting services, process, and benefits.
2.  **Consultant Profiles:** Page to introduce the consultant(s) with their expertise and background.
3.  **Testimonials/Success Stories:** Section to showcase positive outcomes and feedback from previous clients.
4.  **Contact Form:** A form for users to submit inquiries.
5.  **Online Reservation System (Detailed Below):**
    *   **UI Components:**
        *   Calendar component for date selection.
        *   Time slot display based on selected date and consultant availability.
        *   Form fields for user information (Name, Contact Number, Email).
        *   Dropdown or radio buttons for selecting consultation type (생기부 or 자소서).
        *   Optional text area for specific requests or notes.
        *   Submit button.
    *   **Data Management (using Firebase):**
        *   **Improvement Plan for UI/UX:**
            *   Integrate a user-friendly date picker component.
            *   Enhance the visual display of time slots (e.g., buttons, cards) with clear indication of availability and selected slot.
            *   Provide inline validation feedback to the user.
            *   Refine the layout and styling of the entire reservation page for better aesthetics and usability, adhering to the bright blue color scheme.
        *   **Firestore Collection: `availableSlots`**
            *   Document ID: Represents a specific date (e.g., `YYYY-MM-DD`).
            *   Fields:
                *   `date`: Date object or timestamp.
                *   `slots`: Array of objects, each representing a time slot.
                    *   `time`: String (e.g., "10:00 AM", "2:30 PM").
                    *   `isBooked`: Boolean (true if booked, false if available).
                    *   `bookedBy`: User ID (if authenticated) or contact info (if not authenticated).
                    *   `consultationType`: "생기부" or "자소서".
        *   **Firestore Collection: `reservations`**
            *   Document ID: Auto-generated.
            *   Fields:
                *   `userId`: User ID (if authenticated).
                *   `name`: User's name.
                *   `contactNumber`: User's contact number.
                *   `email`: User's email.
                *   `date`: Date of the reservation.
                *   `time`: Time of the reservation.
                *   `consultationType`: "생기부" or "자소서".
                *   `requests`: Additional requests (optional).
                *   `status`: "Pending", "Confirmed", "Cancelled".
                *   `timestamp`: Timestamp of the reservation request.
        *   **Firestore Rules:** Implement security rules to control read/write access to `availableSlots` and `reservations` collections.
        *   **Backend Logic (within Next.js API Routes or Server Components):**
            *   Fetch available time slots based on selected date from `availableSlots`.
            *   Handle reservation submission:
                *   Validate input data.
                *   Check if the selected slot is still available in `availableSlots`.
                *   Update `isBooked` in `availableSlots` for the booked slot.
                *   Create a new document in the `reservations` collection with reservation details.
                *   Implement error handling for concurrent booking attempts.
6.  **Resource Library/Blog:** Articles and resources related to 생기부 and 자소서.
7.  **FAQ:** Common questions and answers.
8.  **Online Consultation/Chat (Future):** Integrate a chat feature for quick questions.
9.  **Admin Panel (Future):** Interface for managing available slots, reservations, content, etc.

**Styling:**

*   Using CSS Modules to scope styles to individual components.
*   Implementing a bright blue color scheme with complementary colors.
*   Ensuring responsiveness for various screen sizes (desktop, tablet, mobile).

**Current Status:** Basic App Router structure and placeholder pages created. Beginning implementation of the Online Reservation System, focusing on the UI and Firebase data management plan.