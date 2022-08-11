# Cypress test order

Cypress tests should be executed in the following order:

1) Server signup test 
  - 1.1 Create a user
2) Server login test
  - 2.1 Login tests
3) Admin tests
  - 3.1 Create a user
  - 3.2 Create an application
  - 3.3 Create a role
  - 3.4 Create a template 
  - 3.5 Edit a user
  - 3.6 Edit an application
  - 3.7 Edit a role
  - 3.8 Edit a template
  - 3.9 Delete a user
  - 3.10 Delete an application
  - 3.11 Delete a role
  - 3.12 Delete a template
4) Topbar admin tests
  - 4.1 Helper dropdown button functionalities
  - 4.2 Avatar button functionalities
5) Compose tests
  - 5.1 Create a namespace
  - 5.2 Create a module
  - 5.3 Create a record page
  - 5.4 Create a record
  - 5.5 Edit a module
  - 5.6 Edit a record page
  - 5.7 Edit a module
  - 5.8 Edit a namespace
  - 5.9 Delete a record
  - 5.10 Delete a record page
  - 5.11 Delete a module
  - 5.12 Delete a namespace
6) Topbar compose tests
  - 6.1 Helper dropdown button functionalities
  - 6.2 Avatar button functionalities
7) Workflow tests
  - 7.1 Create a workflow
  - 7.2 Edit the created workflow
  - 7.3 Delete the created workflow
8) Topbar workflow tests
  - 8.1 Helper dropdown button functionalities
  - 8.2 Avatar button functionalities
9) Reporter tests
  - 9.1 Create a report
  - 9.2 Edit a report
  - 9.3 Delete a report
10) Topbar reporter tests
  - 10.1 Helper dropdown button functionalities
  - 10.2 Avatar button functionalities
11) Webapp ONE tests
  - 12.1 Webpage tour test
  - 12.2 Search bar functionality
  - 12.3 App redirection
12) Topbar one tests
  - 13.1 Helper dropdown button functionalities
  - 13.2 Avatar button functionalities
13) Remaining server tests
  - 14.1 Change your password functionality
  - 14.2 Logout user
  - 14.3 Logout from everywhere