# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

# npm start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Skip Selection UI

A responsive, stylish React application for selecting skip sizes. This project replicates the design and functionality of a skip selection page with a top navigation bar, hero header, skip cards with toggle selection, and a dynamic bottom bar showing skip details.

## Features

- **Responsive Design:** Fully responsive UI for both desktop and mobile browsers.
- **Step Navigation:** A top bar displaying the process steps (e.g., Postcode, Waste Type, Select Skip, Permit Check, Choose Date, Payment) with visual cues for completed and current steps.
- **Hero Header:** A prominent header that clearly communicates the page purpose.
- **Skip Cards:** Dynamically populated skip cards from an API endpoint. Each card displays:
  - Skip size and hire period.
  - Price calculation (including VAT, displayed per week).
  - Notices (e.g., "Private Property Only", "Not Suitable for Heavy Waste").
  - A toggle selection mechanism to select/unselect a skip.
- **Bottom Navigation Bar:** A stylish bottom bar that appears when a skip is selected, showing details (e.g., "6 Yard Skip – £7 day hire") along with Back and Continue buttons.

## Technologies Used

- **ReactJS:** For building the user interface.
- **CSS:** Custom CSS for styling and responsive design.
- **Fetch API:** To retrieve skip data from the provided endpoint.

## API Endpoint

Skip data is fetched from the following API:

https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft


## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/skip-selection-ui.git
   cd skip-selection-ui

