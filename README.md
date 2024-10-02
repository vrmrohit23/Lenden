
# Lenden: Manage Your Give & Take

**This web application helps users easily manage personal expenses and keep track of lendings.** It’s designed with a simple, intuitive interface to provide a smooth and lightweight experience. You can organize your daily expenses, track repayments for money lent, and see everything in one place for easy access.
Checkout here [Lenden](https://lenden-official.vercel.app/)



## Features

- **Expense Management**: 
    - Easily add, edit, delete, and categorize your expenses.
    - Filter expenses by category, date, payment method, or amount range.
    - Choose between list or table views for better data display.

- **Lending Management**:
    - Keep track of money you've lent to others.
    - Filter lendings by borrower, payment method, or amount range.
    - Log partial repayments for each lending easily.

- **Month and Year View**:
    - Select a specific month and year to display expenses or lendings without overwhelming data.

- **Protected Routes**:
    - Users must log in to access certain features, like managing expenses and lendings.

- **Mobile Responsive**:
    - Fully responsive design using Tailwind CSS for an optimized experience on mobile, tablet, and desktop devices.

- **Authentication**:
    - Secure login and signup to protect your data.
    - **Guest login** feature allows you to explore the app before becoming an active user.
## Tools and Technologies

- **Frontend**:React, Redux, and React Router.
- **Backend**: Utilizes Appwrite for a complete backend solution.
- **Libraries**: Incorporates `react-hook-form` for efficient form handling.
- **Styling**: Tailwind CSS, Font Awesome, and NextUI.
- **Authentication**: Features protected routes and a secure user authentication flow.
- **Hosting**: Deployed on Vercel for fast and reliable performance.


## Getting Started

### Prerequisites
checkout: [Appwrite_apis](https://appwrite.io/docs/references), [Redux-tool-kit_quick-Start](https://appwrite.io/docs/references), [React-js_overview](https://react.dev/reference/react)

Helpful playlist: [Chai aur react](https://youtube.com/playlist?list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&si=oukdVlHe1pGX_Wpy)

**Note** : make a env file in the root folder using env.sample references and you can checkout this video also [Appwrite setup](https://www.youtube.com/watch?v=4_JlIr8yry0)

### Installation

To get a local copy of the project up and running, follow these steps:

- Clone the repository:
   ```bash
   git clone https://github.com/your-username/expense-lending-app.git
   ```
- Navigate to the project directory:
   ```bash
   cd Lenden
   ```
- Install dependencies:
   ```bash
   npm install
   ```
- Start the development server:
   ```bash
   npm start
       or
   npm run dev
   ```

- Visit `http://localhost:3000` in your browser.

### Deployment

The app is hosted on [Vercel](https://vercel.com), providing a fast, global, and reliable hosting environment. 

For your own deployment,follow these steps:

   - Create a account on Vercel. 
   - Connect Github and install Vercel on Github account.
   - Select the repository and deploy.


## Project Structure

```bash
/src
  ├── components
  │   ├── Expenses.jsx           # Expense management component
  │   ├── Lendings.jsx           # Lending management component
  │   ├── Protected.jsx          # Protected route wrapper
  │   ├── forms
  │   │   ├── expenseform.jsx    # Form for adding/editing expenses
  │   │   └── lendingsform.jsx   # Form for creating/editing lendings
  ├── hooks
  │   └── useSetLendings.jsx     # Custom hook for managing lending data
  ├── App.jsx                    # Main app component
  ├── main.jsx                   # React app entry point
  └── ...
```



## Contributing

We welcome contributions from everyone!

Whether you want to add new features, improve existing components, or enhance the UI, your input is highly valued. Feel free to dive in, and if you have any ideas or suggestions, we encourage you to get involved. Together, we can make this project even better!

If you’re interested in contributing, please follow these steps:

- **Fork the repository** and create a new branch for your changes.
- **Make your modifications** and test them thoroughly.
- **Submit a pull request** with a clear description of the changes and why they’re valuable.

Thank you for considering contributing to our project!



