# **NEXTJS PROJECT - ADMIN DASHBOARD**

## Overview

This document provides an overview of the system, detailing its functionality in managing user-contributed templates and daily personal tasks.

- Design: [here](<https://www.figma.com/design/REurjW8goPRDZn3cMMeQZY/Admin-Dashboard-Web-(Community)-(Copy)?node-id=2-3&m=dev&t=b6s6n2xpqUU8qsbV-1>)
- Requirements & Scope: [here](https://docs.google.com/document/d/1m2-HJrk2ecMf4919sprfFy8VvmQzTlfx/edit?usp=sharing&ouid=103083083655563138202&rtpof=true&sd=true)

## Timeline

- Total: 7 weeks
- Start Date: Aug 23, 2024
- End Date: Oct 14, 2024

## Task Management

- Board of Gitlab: [here](https://gitlab.asoft-python.com/ngoc.ngo/admin-dashboard/-/boards)

## Technical stacks

### Libraries

- [Next - v14.2.3](https://nextjs.org/): Next.js enables you to create full-stack Web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.
- [React - v^18](https://react.dev/learn): is a JavaScript library for building user interfaces.
- [Storybook - v^8.1.2](https://storybook.js.org/): captures the rendered state of a UI component. Developers write multiple stories per component that describe all the “interesting” states a component can support.
- Editor: Visual Studio Code.

### Testing

- [React Testing Library - v^15.0.7](https://testing-library.com/): Simple and complete testing utilities that encourage good testing practices. Is a light-weight solution for testing web pages by querying and interacting with DOM nodes.

### Debug tool

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) React Developer Tools is a Chrome DevTools extension for the open-source React JavaScript library. It allows you to inspect the React component hierarchies in the Chrome Developer Tools.
- [Responsively App](https://responsively.app/): A simple application for developing, help dev test design in many screens.

### Deployment

- Vercel
- Render

## Application flow chart

- Update later

## How to run

### Prerequisites

Make sure you install packages with correct version below:

- [node v18.18.2+](https://nodejs.org/en/download/package-manager)
- [pnpm 9.1.2+](https://pnpm.io/installation)

- **Note:**:
  - Please add `.env` into root of project source code, refer `.env.sample`. Please contact the developers to get the `.env` file.

### Get source code

| Command                                                              | Action                    |
| :------------------------------------------------------------------- | :------------------------ |
| `git clone git@gitlab.asoft-python.com:ngoc.ngo/admin-dashboard.git` | Clone Repository with SSH |
| `$ cd admin-dashboard`                                               | Redirect to folder        |

### Build and Run app

| Command            | Action                                     | Port                  |
| :----------------- | :----------------------------------------- | :-------------------- |
| `$ pnpm install`   | Install packages dependencies              | N/A                   |
| `$ pnpm build`     | Build app with optimized production mode   | N/A                   |
| `$ pnpm start`     | Starts the application in production mode. | http://localhost:3000 |
| `$ pnpm dev`       | Run the app in development mode            | http://localhost:3000 |
| `$ pnpm storybook` | Run Storybook.                             | http://localhost:6006 |
| `$ pnpm test`      | Run Unit Test                              | N/A                   |
| `$ pnpm coverage`  | Generate code coverage                     | N/A                   |

### Project structure

```shell
.
├── README.md                       # README file
├── .husky                          # Husky configuration
├── .storybook                      # Storybook folder
├── .vscode                         # VSCode configuration
├── public                          # Public assets folder
├── src
│   ├── api                         # Handle data with API: GET, POST, PUT, DELETE
│   ├── app                         # Next.js App (App Router)
│   ├── components                  # React components
│   ├── constants                   # App constants
│   ├── icons                       # Icons folder
│   ├── layouts                     # React components for app layout
│   ├── models                      # Model type definitions
│   ├── types                       # Type definitions
│   ├── ui                          # React components by feature
│   ├── utils                       # Utilities folder
├── .eslintrc.json                  # ESLint configuration
├── .lintstagedrc                   # Lint-stage
├── .prettierrc                     # Prettier configuration
├── jest.config.ts                  # Jest configuration
├── next.config.mjs                 # Next.js configuration
├── next.config.mjs                 # Next.js configuration
├── postcss.config.mjs              # Post CSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```
