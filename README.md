# Codeforces Student Sync Project

## Overview

This project synchronizes Codeforces data for students, including their contest history, problem submissions, and statistics. It provides a backend API for managing students, fetching their Codeforces data, and sending inactivity reminder emails. The system supports scheduled automatic syncing via cron jobs and manual sync triggers.

---

## Features

- **Student Management:** Create, update, delete, and list students with Codeforces handles.
- **Codeforces Data Sync:**  
  - Fetch and store user profiles, contest history, and submissions from the Codeforces API.  
  - Calculate problem-solving statistics and generate insights such as rating graphs and heatmaps.
- **Inactivity Reminders:** Automatically send reminder emails to inactive students.
- **Scheduling:** Configurable cron jobs to automate data synchronization.
- **Responsive UI:** Supports mobile and tablet views with light/dark mode toggle (if frontend included).
- **CSV Export:** Export student data for reporting.

---

## Technologies Used

- **Backend:** Node.js, Express.js, Mongoose (MongoDB)
- **API Client:** Axios for Codeforces API calls
- **Email:** Nodemailer for sending reminder emails
- **Scheduling:** node-cron for cron job management
- **Environment Management:** dotenv for configuration

---

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB instance (local or cloud)
- Gmail account or SMTP server for sending emails

### Installation

1. Clone the repository:
git clone https://github.com/yourusername/codeforces-student-sync.git
cd codeforces-student-sync

2. Install dependencies:
npm install

3. Create a `.env` file in the root directory with the following variables:
MONGODB_URI=mongodb://localhost:27017/your_database_name
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password-or-app-password

4. Seed initial sync configuration (optional but recommended):
uncomment out the seeding section in the index.js
Note: after the first run, comment out the seeding area except for
seedSyncConfig() & startSyncCron()


### Running the Application

Start the backend server:


The API will be available at `http://localhost:3000` (or your configured port).

---

## API Endpoints (Examples)

- `GET /students` - List all students
- `POST /students` - Add a new student
- `PUT /students/:id` - Update student data
- `DELETE /students/:id` - Remove a student
- `GET /students/:id/contest-history` - Get contest history for a student
- `GET /students/:id/problem-stats` - Get problem-solving stats
- `POST /sync-now` - Trigger manual sync of all students
- `PUT /sync-config` - Update sync cron schedule and enable/disable flag

---

## Scheduling and Sync

- The sync job runs automatically based on a cron schedule stored in the database (default: daily at 2 AM).
- You can update the cron schedule via API or seed configuration.
- Sync operations fetch and update Codeforces data for all students with handles.
- Inactivity reminder emails are sent after syncing.

---

## Notes
- I retrieve seeding data from CodeForces API. The amount of contest history will
depend on how long you let the seeding run. Stop the server and run it again with seeding functions coment out except for seedSyncConfig() & startSyncCron()
- Be mindful of Codeforces API rate limits.
- Email sending I used gmail credential
- The project assumes MongoDB is running and accessible.
- Customize the email template and UI as needed.
- Phone number column is empty because numbers are not exposed by the CodeForce API
- Email won't work. I commented out a section in the email.js to avoid sending emails to the participants in the contest. You can uncomment and use a customize email. I've left a test.js file for further testing.


---




