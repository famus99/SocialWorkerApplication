# Social Worker Application

## Overview
The Social Worker Application is a comprehensive platform designed to assist social workers in managing their client relationships. Built with a Java Spring Boot backend and a responsive HTML/CSS/JavaScript frontend, this system facilitates efficient client record management, allowing social workers to track their caseload whilst maintaining secure and organised records.

## Features
- **Worker Management**: Create, retrieve and delete social worker profiles
- **Client Management**: Associate clients with specific social workers
- **Relationship Hierarchy**: Maintain clear worker-client relationships
- **RESTful API**: Well-structured endpoints for frontend integration
- **Responsive UI**: User-friendly interface for managing workers and clients
- **Administrative Dashboard**: System statistics and management tools

## Technical Architecture

### Backend
The backend is built using Java Spring Boot, providing a robust and scalable RESTful API service:

- **Spring Boot 3.2.2**: Application framework for dependency injection and configuration
- **JPA/Hibernate**: Object-relational mapping for database interactions
- **MySQL**: Database for persistent storage
- **REST Controllers**: API endpoints for frontend communication
- **CORS Configuration**: Configured for cross-origin requests

### Frontend
The frontend is developed using vanilla HTML, CSS, and JavaScript:

- **HTML5**: Semantic markup for structure
- **CSS3**: Responsive styling with dedicated stylesheets for each page
- **JavaScript**: Dynamic client-side functionality
- **Fetch API**: Asynchronous communication with the backend

### Data Models
- **Worker**: Contains information about social workers including their name and role
- **Client**: Stores client details with references to their assigned social worker

### API Endpoints

#### Worker Endpoints
- `GET /api/workers`: Retrieve all workers
- `GET /api/workers/{workerId}`: Retrieve a specific worker
- `POST /api/workers`: Create a new worker
- `DELETE /api/workers/{workerId}`: Remove a worker

#### Client Endpoints
- `GET /api/workers/{workerId}/clients`: Get all clients for a specific worker
- `GET /api/workers/{workerId}/clients/{clientId}`: Retrieve a specific client
- `POST /api/workers/{workerId}/clients`: Create a new client for a worker
- `DELETE /api/workers/clients/{clientId}`: Remove a client

## Getting Started

### Prerequisites
- Java JDK 17 or higher
- Maven
- MySQL
- Web browser (Chrome, Firefox, etc.)

### Installation and Setup

#### Backend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/social-worker-application.git
   ```

2. Navigate to the backend directory
   ```bash
   cd social-worker-application/backend/SocialWorkerApp
   ```

3. Install dependencies
   ```bash
   mvn install
   ```

4. Configure your database connection in `src/main/resources/application.properties`
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/socialworkdb?createDatabaseIfNotExist=true
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

5. Run the backend application
   ```bash
   mvn spring-boot:run
   ```

6. The API will be available at `http://localhost:8080`

#### Frontend Setup
1. Navigate to the frontend directory
   ```bash
   cd ../frontend
   ```

2. You can serve the frontend using any static file server. For example, with Python:
   ```bash
   # For Python 3
   python -m http.server 3000
   ```

3. Open your browser and navigate to `http://localhost:3000/html_templates/Home.html`

## Application Pages

- **Home**: Landing page with overview and navigation
- **Workers**: Manage social worker profiles
- **Clients**: View and manage clients for each worker
- **Administration**: System statistics and administrative tools
- **Testimonials**: Client success stories and feedback

## Development Notes

### Entity Relationships
- A Worker can have multiple Clients (One-to-Many relationship)
- Each Client is associated with exactly one Worker

### JSON Serialization
- `@JsonManagedReference` and `@JsonBackReference` annotations are used to prevent circular references during serialization

### CORS Configuration
- The backend is configured to accept requests from any origin
- This can be restricted to specific origins in production environments

## Deployment

### Backend Deployment
The Spring Boot application can be deployed as a standalone JAR file:

```bash
mvn package
java -jar target/social-worker-app-1.0.0.jar
```

### Frontend Deployment
The frontend static files can be deployed to any web server (Apache, Nginx, etc.) or a static file hosting service.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
- Spring Boot documentation
- Hibernate documentation
- FDM Group for project framework and guidance
