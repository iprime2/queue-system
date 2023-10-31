# Automatic Queue Management System (AQMS)

AQMS is a web-based system designed to streamline the management of student tickets within educational institutions. This README provides instructions for setting up the project and basic Git commands to work with this repository.

## Getting Started

### Prerequisites

Before you start, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/): A JavaScript runtime for running the Next.js application.
- [PNPM](https://pnpm.io/): A package manager (optional) for installing project dependencies.

### Installation

1. **Install Node.js:**

   If you haven't already, download and install Node.js from the [official website](https://nodejs.org/en/download/) for your Windows operating system.

2. **Install PNPM (Optional):**

   While not required, you can install PNPM for managing project dependencies. To install PNPM globally, run:

   ```bash
   npm install -g pnpm

3. **Install Project Dependencies:**

   Navigate to the project directory and run the following command to install project dependencies using npm or pnpm:

   ```bash
   # Using NPM (Node Package Manager)
   npm install

   # OR Using PNPM (Package Manager)
   pnpm install

4. **Create .env File:**

   Create a .env file in the project root and define your environment variables. Example:

   ```bash
   DB_URL=your_database_url
   OTHER_VARIABLE=your_value

## Start the Development Server

To start the development server, run the following command:

   ```bash
   # Using NPM
   npm run dev

   # OR Using PNPM
   pnpm dev

Your AQMS application should now be accessible in your browser at http://localhost:3000.

## Basic Git Commands
   Here are some common Git commands to work with this repository:

### Clone the Repository
   ```bash
   git clone [https://github.com/iprime2/queue-system](https://github.com/iprime2/queue-system)

### Switch to a Branch
   ```bash
   git checkout branch_name

### List Branches
   ```bash
   git branch

### Check Status
   ```bash
   git status

### Add Files for Commit
   ```bash
   git add file1 file2

### Make a Commit
   ```bash
   git commit -m "Your commit message here"

### Push Changes to the Repository
   ```bash
   git push origin branch_name

Please replace yourusername with your actual GitHub username and adjust the branch names as needed.
