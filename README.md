# Playwright Automation Framework

A Playwright + JavaScript test automation framework for web applications.  
Supports **environment-based configurations**, **GitHub Actions CI/CD**, and **custom test reporting**.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Project Structure](#project-structure)  
- [Installation](#installation)  
- [Configuration](#configuration)  
- [Running Tests](#running-tests)  
- [GitHub Actions CI](#github-actions-ci)  
- [Test Reports](#test-reports)  
- [Contributing](#contributing)

---

## Overview

This framework is built with:

- [Playwright](https://playwright.dev/) for browser automation
- JavaScript for scripting tests
- Environment-based `.env` configurations
- Custom CLI table reporter for test summaries
- HTML report generation

---

## Features

- Run tests in **Chrome** or other Playwright-supported browsers
- Environment-specific configurations (`dev`, `prod`, etc.)
- Custom test hooks for screenshots, videos, and viewport setup
- GitHub Actions workflow for CI/CD
- Table summary of tests in console
- HTML report for detailed test results
- Secrets management via GitHub Secrets

---

## Prerequisites

- Node.js >= 18.x (tested with Node 23)
- npm
- Git
- Supported browsers (Chrome, Firefox, WebKit)

---

## Project Structure

playwright-automation/
│
├── tests/ # Your test files
│ └── example.spec.js
│
├── Utility/ # Utility files & hooks
│ └── testhooks.js
│
├── Reports/ # Custom reporters
│ └── report.js
│
├── .env.dev # Dev environment variables
├── .env.prod # Prod environment variables
├── playwright.config.js # Playwright config
├── package.json
└── README.md

yaml
Copy code

---

## Installation

Clone the repository:

```bash
git clone https://github.com/YourUsername/playwright-automation.git
cd playwright-automation
Install dependencies:

bash
Copy code
npm install
npx playwright install --with-deps
Configuration
Environment variables are set in .env files:

ini
Copy code
URL=https://www.saucedemo.com
USERNAME=your_username
PASSWORD=your_password
In CI/CD, use GitHub Secrets instead of committing .env files.

Running Tests
Run tests for a specific environment:

bash
Copy code
npm run test:dev       # Runs tests using .env.dev
npm run test:prod      # Runs tests using .env.prod
Screenshots and videos are captured on failure.

Test summary is printed in a CLI table and saved as test-summary.txt.

GitHub Actions CI
Workflow triggers:
On push to main
On pull_request to main
Manual trigger (workflow_dispatch)

Secrets used in workflow:
URL
USERNAME
PASSWORD

Test Reports
HTML report: playwright-report/
CLI table summary: printed in console & saved as test-summary.txt

Contributing
Fork the repository
Create a feature branch
Write tests / features
Raise a PR to main branch
Ensure tests pass in GitHub Actions
