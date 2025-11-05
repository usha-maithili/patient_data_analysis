#  Coalition Technologies Frontend Developer Skills Test

This project was developed as part of the **Coalition Technologies Frontend Developer Skills Test**.  
It showcases a **Patient Dashboard** for *Jessica Taylor*, designed and implemented using **HTML**, **CSS**, and **JavaScript**, along with **Chart.js** for data visualization.  
The layout and styling are created to closely match the provided Adobe XD design reference.

---

##  Overview

The project is designed to display detailed patient information fetched from the **Coalition Technologies Patient Data API**.  
In case the API request fails or becomes inaccessible due to CORS/network issues, a **fallback sample dataset** is used to render all components seamlessly.

The dashboard provides:
- A clear and organized **three-section layout** (Sidebar, Main Content, Profile Panel).  
- Dynamic **Chart.js blood pressure visualization**.  
- **Stat Cards** for patient vitals like respiratory rate, temperature, and heart rate.  
- A **scrollable diagnostic list table**.  
- A **profile summary** and **lab results section** with visual icons and download options.

---

##  Project Structure

The project layout is cleanly divided into three major sections, matching the design structure.

###  Left Section – Sidebar
- Displays a scrollable list of patients with profile images, gender, and age.  
- Includes a **search icon** and a clear highlight for the active patient (Jessica Taylor).  
- Simplified navigation for quick access.

###  Center Section – Main Content
- Contains the **Diagnosis History** chart showing **Systolic** and **Diastolic** blood pressure trends using Chart.js.  
- Displays **Stat Cards** for:
  - Respiratory Rate  
  - Temperature  
  - Heart Rate  
- Features a **Diagnostic List Table**, fully scrollable, dynamically loaded from the API.

###  Right Section – Profile and Lab Results
- Shows Jessica Taylor’s **profile card** with her photo, date of birth, gender, contact info, emergency contact, and insurance provider.  
- Each data field has an **icon** for better visual clarity.  
- A **“Show All Information”** button is placed at the bottom.  
- Below it, a **Lab Results section** lists tests with **download icons** and a scrollable layout.

---

##  UI and Styling

- The CSS is **structured modularly** and divided into sections for:
  - Sidebar  
  - Main Content  
  - Profile Panel  
- Uses **CSS variables (`:root`)** for color consistency across the layout.  
- Implemented **custom scrollbars** for sidebar and diagnostic table.  
- The **Chart.js line graph** features:
  - Smooth **curved lines** instead of sharp edges.  
  - Unique colors for Systolic (`#E66FD2`) and Diastolic (`#8C6FE6`).  
  - A soft chart background color (`#F4F0FE`).
- Each stat card has its own background color to visually separate them:
  - Respiratory Rate → `#E0F3FA`  
  - Temperature → `#FFE6E9`  
  - Heart Rate → `#FFE6F1`

---

##  Data Handling

- The project fetches real patient data from:
  ```bash
  https://fedskillstest.coalitiontechnologies.workers.dev

# Technologies Used
HTML5
CSS3
JavaScript (ES6)
Chart.js v4 – for interactive chart visualization

# How to Run the Project

- Clone or download this repository to your local system.
- Open the folder in VS Code or your preferred editor.
- Ensure all SVG icons and assets are correctly placed inside the assets/ directory.
- Open index.html directly in your browser.
- The page will automatically:
- Fetch live data from the Coalition Technologies API.
- Use fallback sample data if the API call fails.

# Summary

- All assets renamed to meaningful and consistent names.
- Layout divided into Left (Sidebar), Center (Main), and Right (Profile) sections.
- Added top header bar for navigation using provided icons.
- CSS organized section-wise with custom variables and clean formatting.
- Implemented API integration with a fallback sample dataset in app.js.
- Chart.js configured for smooth, clean visuals.
- UI and styling designed to closely replicate the provided Adobe XD mockup.
- The project ensures full functionality even without API access.