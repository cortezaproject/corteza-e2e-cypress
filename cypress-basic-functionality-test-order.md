# Cypress test order

Cypress tests should be executed in the following order:

Server signup
  - User create
Admin
  - User
    - Create
    - Edit
    - Delete
  - Role
    - Create
    - Edit
    - Delete
  - Application
    - Create
    - Edit
    - Delete
  - Template
    - Create
    - Edit
    - Delete
Topbar admin
  - Helper dropdown button functionalities
  - Avatar button functionalities
Compose
  - Namespace create
  - Module create
  - Record page create
  - Record page edit
  - Record
    - Create
    - Edit
    - Clone
    - Delete
  - Record-page delete
  - Module edit
  - Module delete
  - Namespace edit
  - Namespace delete
Topbar compose
  - Helper dropdown button functionalities
  - Avatar button functionalities
Workflow
  - Create
  - Edit
  - Delete
Topbar workflow tests
  - Helper dropdown button functionalities
  - Avatar button functionalities
Reporter
  - Create
  - Edit
  - Delete
Topbar reporter
  - Helper dropdown button functionalities
  - Avatar button functionalities
Webapp One
  - Tour
  - Search bar functionality
  - App redirection
Webapp One topbar
  - Helper dropdown button functionalities
  - Avatar button functionalities
Sidebar
  - Admin
    - Toggle
  - Compose
    - Toggle
  - Reporter
    - Toggle
  - Admin/Logo
    - Default
  - Compose/Logo
    - Default
  - Reporter/Logo
    - Default
  - Admin/Logo
    - Custom
  - Compose/Logo
    - Custom
  - Reporter/Logo
    - Custom
Server
  - Change your password functionality
  - Logout
    - User
    - From everywhere
