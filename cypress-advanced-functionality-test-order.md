# Cypress test order

Cypress tests should be executed in the following order:

1) Admin
  - 1.1 System
    - 1.1.1 Role
    - 1.1.2 Application
    - 1.1.3 User
    - 1.1.4 Template
    - 1.1.5 Auth client
    - 1.1.6 Action log
    - 1.1.7 Messaging queue
    - 1.1.8 Integration gateway
    - 1.1.9 Email settings
    - 1.1.10 Permissions
      - 1.1.10.1 Evaluate
  - 1.2 Compose
    - 1.2.1 Permissions
  - 1.3 Automation
    - 1.3.1 Permissions
2) Compose
  - 2.1 Namespace
    - 2.1.1 Edit
    - 2.1.2 Toggle sidebar
  - 2.2 Reminder
    - 2.2.1 Create
    - 2.2.2 Edit
    - 2.2.3 Delete
3) Webapp One
  - 3.1.1 Custom application
  - 3.1.2 Jitsi bridge
    - 3.1.2.1 Create room
4) Server
  - 4.1 Admin/Enable
    - 4.1.1 Password reset
    - 4.1.2 Mfa
  - 4.2 Mfa
  - 4.3 Profile tab
  - 4.4 Corteza_logo
  - 4.5 Authorized_clients
  - 4.6 Links
    - 4.6.1 Username
    - 4.6.2 Github
  - 4.7 Password_reset
5) Sidebar
  - 5.1 Compose
    - 5.1.1 Search bar
    - 5.1.2 Manage namespaces
  - 5.2 Reporter
    - 5.2.1 Search bar
  - 5.3 Workflows
    - 5.3.1 Home button
6) Pagination
  - 6.1 Compose
    - 6.1.1 Record list
