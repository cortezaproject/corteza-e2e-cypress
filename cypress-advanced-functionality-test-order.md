# Cypress test order

Cypress tests should be executed in the following order:

Server signup
  - User create
Admin
  - System
    - Role
    - Application
    - User
    - Template
    - Auth client
    - Action log
    - Messaging queue
    - Integration gateway
    - Email settings
    - Permissions
      - Evaluate
  - Compose
    - Permissions
  - Automation
    - Permissions
Compose
  - Namespace
    - Edit
    - Toggle sidebar
  - Reminder
    - Create
    - Edit
    - Delete
Webapp One
  - Custom application
  - Jitsi bridge
    - Create room
Server
  - Admin/Enable
    - Password reset
    - Mfa
  - Mfa
  - Profile tab
  - Corteza_logo
  - Authorized_clients
  - Links
    - Username
    - Github
  - Password_reset
Sidebar
  - Compose
    - Search bar
    - Manage namespaces
  - Reporter
    - Search bar
  - Workflows
    - Home button
Pagination
  - Compose
    - Record list
