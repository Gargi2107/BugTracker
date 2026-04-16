# BugTracker – Project Management & Issue Tracking System

A full-stack project management application.
It enables teams to collaboratively manage projects, track bugs, assign tasks, and streamline workflows through an intuitive Kanban interface.

## Features

### Authentication

* User registration & login
* Secure authentication using **JWT**
* Password hashing with **bcrypt**

### Project Management

* Create, update, delete projects
* Add/remove team members via email
* Project listing dashboard

### Ticket Management

* Create, update, delete tickets
* Fields: title, description, priority, status, assignee, projectId
* Assign tickets to team members
* View tickets by project

### Kanban Board

* Drag & drop tickets across columns:

  * To Do
  * In Progress
  * Done
* Built using modern drag-and-drop library

### Comments System

* Add comments to tickets
* Enables team collaboration

### Search & Filter

* Filter tickets by:

  * Status
  * Priority
  * Assignee
* Keyword-based search

### Team Collaboration

* Manage project members

### UI/UX

* Modern responsive UI with **Tailwind CSS**
* Clean Kanban interface


## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router
* @hello-pangea/dnd (Drag & Drop)

### Backend

* Node.js
* Express.js
* MongoDB (MongoDB Atlas)
* Mongoose

### Authentication

* JSON Web Tokens (JWT)
* bcrypt


## Folder Structure

```bash
bug-tracker/
│
├── client/        
│   ├── components/
│   ├── pages/
│   ├── api/
│
├── server/        
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
```

## API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Projects

* `GET /api/projects`
* `POST /api/projects`
* `PUT /api/projects/:id`
* `DELETE /api/projects/:id`
* `POST /api/projects/:id/add-member`
* `POST /api/projects/:id/remove-member`

### Tickets

* `GET /api/tickets/:projectId`
* `POST /api/tickets`
* `PUT /api/tickets/:id`
* `DELETE /api/tickets/:id`

### Comments

* `POST /api/comments`
* `GET /api/comments/:ticketId`

## Deployment

* Frontend: Vercel
* Backend: Render / Railway
* Database: MongoDB Atlas

## Author

**Gargi Nigam**

* Email: [gargi.nigam2107@gmail.com](mailto:gargi.nigam2107@gmail.com)
* LinkedIn: https://www.linkedin.com/in/gargi-nigam
* GitHub: https://github.com/Gargi2107
