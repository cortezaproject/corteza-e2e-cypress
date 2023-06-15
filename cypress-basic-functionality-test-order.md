# Cypress test order

Cypress tests should be executed in the following order:

1) Server signup
  - 1.1 User create
2) Admin
  - 2.1 User
    - 2.1.1 Create
    - 2.1.2 Edit
    - 2.1.3 Delete
  - 2.2 Role
    - 2.2.1 Create
    - 2.2.2 Edit
    - 2.2.3 Delete
  - 2.3 Application
    - 2.3.1 Create
    - 2.3.2 Edit
    - 2.3.3 Delete
  - 2.4 Template
    - 2.4.1 Create
    - 2.4.2 Edit
    - 2.4.3 Delete
3) Topbar admin
  - 3.1 Helper dropdown button functionalities
  - 3.2 Avatar button functionalities
4) Compose
  - 4.1 Namespace create
  - 4.2 Module create
  - 4.3 Record page create
  - 4.4 Record page edit
  - 4.5 Record
    - 4.5.1 Create
    - 4.5.2 Edit
    - 4.5.3 Clone
    - 4.5.4 Delete
  - 4.6 Record-page delete
  - 4.7 Module edit
  - 4.8 Module delete
  - 4.9 Namespace edit
  - 4.10 Namespace delete
5) Topbar compose
  - 5.1 Helper dropdown button functionalities
  - 5.2 Avatar button functionalities
6) Workflow
  - 6.1 Create
  - 6.2 Edit
  - 6.3 Delete
7) Topbar workflow tests
  - 7.1 Helper dropdown button functionalities
  - 7.2 Avatar button functionalities
8) Reporter
  - 8.1 Create
  - 8.2 Edit
  - 8.3 Delete
9) Topbar reporter
  - 9.1 Helper dropdown button functionalities
  - 9.2 Avatar button functionalities
10) Webapp One
  - 10.1 Tour
  - 10.2 Search bar functionality
  - 10.3 App redirection
11) Webapp One topbar
  - 11.1 Helper dropdown button functionalities
  - 11.2 Avatar button functionalities
12) Sidebar
  - 12.1 Admin
    - 12.1.1 Toggle
  - 12.2 Compose
    - 12.2.1 Toggle
  - 12.3 Reporter
    - 12.3.1 Toggle
  - 12.4 Admin/Logo
    - 12.4.1 Default
  - 12.5 Compose/Logo
    - 12.5.1 Default
  - 12.6 Reporter/Logo
    - 12.6.1 Default
  - 12.7 Admin/Logo
    - 12.7.1 Custom
  - 12.8 Compose/Logo
    - 12.8.1 Custom
  - 12.9 Reporter/Logo
    - 12.9.1 Custom
13) Server
  - 13.1 Change your password functionality
  - 13.2 Logout
    - 13.2.1 User
    - 13.2.2 From everywhere
