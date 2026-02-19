Web Site Noticias Ambientales C.R.

-->Description:
 Noticias Ambientales C.R. is a comprehensive website developed primarily with React on the front end and Django/Django REST Framework on the back end. The website aims to promote environmental awareness and citizen participation in Costa Rica. The application allows users not only to stay informed about ecological events and environmental campaigns but also to actively contribute by publishing news, reporting incidents, and participating in comments.
 The platform combines secure authentication, role-based access control, geolocation and image storage features, content moderation, and graphical data visualization to offer a structured and scalable system for environmental information management.
<HR>

-->Architecture:
- Front-End:
 React
 React Router
 ApexCharts (data visualization)
 Leaflet (geolocation)
 Native Fetch API (API consumption)
 LocalStorage and Cookies (session storage)

- Back-End:
 Python
 Django
 Django REST Framework
 MySQL (relational database)
 Simple JWT (authentication)
 Django administration
 Cloudinary (image storage)
<HR>

-->Features:
- Publishing System:
 Creation of news articles or environmental campaigns
 Publication types (News/Campaign)
 Status tracking (Published, Rejected, Pending)
 Image upload integration (Cloudinary)
 Geolocation via Leaflet with latitude and longitude coordinates
 Automatic moderation workflow in reports

- Interaction System:
 Nested comments and replies
 Publication rating system
 Reporting mechanism

- Administration Panel:
 User management table (CRUD)
 Publication management panel
 Contact form management
 Data visualization with ApexCharts:
 Comparison of news articles and campaigns
 Analysis of user growth

- Authentication and Roles:
  Authentication is managed using JWTs (access and update tokens) via Simple JWT, ensuring secure and private user sessions.

- User Role
 Register and log in securely
 Create news or environmental campaigns
 Upload images via Cloudinary
 Select geolocation using Leaflet (latitude/longitude)
 Comment on and reply to posts
 Rate posts
 Report inappropriate content
 Edit personal profile information

- Administrator Role
 Full CRUD permissions over users and posts
 Control over post status
 Access to the moderation panel
 Access to the analytics panel
 Access to the contact panel
<HR>

-->Technologies:
- Lenguages:
Python
JavaScript 
HTML5
CSS3

- Framework & Libraries:
Frontend:
React
React Router
Leaflet 
ApexCharts 

Backend:
Django
Django REST Framework
Simple JWT 

- Database & Storage:
MySQL
Cloudinary 

- Development Tools:
VS Code
Git
Django Admin
  
- Design & Collaboration:
Figma
Trello
Slack
<HR>

-->Technical Highlights:
RESTful API design with Django REST Framework.
Secure authentication flow based on JWT.
Role-based access control system.
Automated moderation of reporting logic.
Relational database modeling (MySQL).
Asynchronous data management using the Fetch API.
Geolocation implementation with Leaflet.
Image management with Cloudinary.
Responsive user interface (UI) architecture.
<HR>

-->Installation Front-End:


-->Installation Back-End:


<HR>

-->Credits: 
Final Back-End Project
Title: Noticias Ambientales C.R.
Authores: Joseph Monge y Juan Diego C.C.
