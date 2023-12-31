# Automatic Queue Management System (AQMS)

AQMS is a web-based system designed to streamline the management of student tickets within educational institutions. This README provides instructions for setting up the project and basic Git commands to work with this repository.

## Getting Started

### Prerequisites

Before you start, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/): A JavaScript runtime for running the Next.js application.
- [PNPM](https://pnpm.io/): A package manager (optional) for installing project dependencies.
- [Visual Studio Code (VSCode)](https://code.visualstudio.com/download) or your preferred Integrated Development Environment (IDE): A code editor with extensions that enhance your development experience.

### Installation

1. **Install Node.js:**

   If you haven't already, download and install Node.js from the [official website](https://nodejs.org/en/download/) for your Windows operating system.

2. **Install PNPM (Optional):**

   While not required, you can install PNPM for managing project dependencies. To install PNPM globally, run:

   ```bash
   npm install -g pnpm

3. **Install Visual Studio Code (VSCode) or Your Preferred IDE:**

   Download and install Visual Studio Code from the official website or your preferred Integrated Development Environment (IDE). Ensure you have the necessary extensions and plugins installed for a seamless development experience.

4. **Create Folder and Open with VSCode:**

   - Create a new folder named "queue-management" on your desktop or any preferred location.
   - Open the "queue-management" folder using your Visual Studio Code (VSCode) or your preferred IDE.

5. **Pull Git Repository from GitHub:**

   To clone a Git repository from GitHub to your local machine, run the following command (replace <repository_url> with the actual repository URL):

   ```bash
   git clone https://github.com/iprime2/queue-system.git


This will create a local copy of the GitHub repository on your machine, which you can then work with.

6. **Install Project Dependencies:**

   Navigate to the project directory and run the following command to install project dependencies using npm or pnpm:

   ```bash
   # Using NPM (Node Package Manager)
   npm install

   # OR Using PNPM (Package Manager)
   pnpm install

7. **Create .env File:**

   Create a .env file in the project root and define your environment variables. Example:

   ```bash
   DB_URL=your_database_url
   OTHER_VARIABLE=your_value

### Start the Development Server

   To start the development server, run the following command:

    #Using NPM 
    npm run dev
      
    #OR Using PNPM
    pnpm dev

Your AQMS application should now be accessible in your browser at http://localhost:3000.

### Basic Git Commands

Here are some common Git commands to work with this repository:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/iprime2/queue-system.git

2. **Switch to a Branch**

   ```bash
   git checkout branch_name

3. **List Branches**

   ```bash
   git branch

4. **Check Status**

   ```bash
   git status

5. **Add Files for Commit**

   ```bash
   git add file1 file2

6. **Make a Commit**

   ```bash
   git commit -m "Your commit message here"

7. **Push Changes to the Repository**

   ```bash
   git push origin branch_name
