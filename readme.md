🛠️ Admin Portal – Setup & Usage Guide
🔹 Overview
This is a simple Admin Portal built using Kendo UI and jQuery.

It follows the MVVM (Model-View-ViewModel) pattern.

The project runs from a single entry point: index.html.

🔹 Components
Views: HTML files used as templates or views for different sections.

ViewModels: JavaScript files that contain Kendo observable view models and logic for binding.

Assets: Contains styles (CSS) and other static resources.

Data: Contains mock JSON data for local development and testing.

License Key: A valid Kendo UI license key is included to enable full functionality.

🔹 How to Run the Project
Make sure you have a local server (like Live Server in VSCode, or use http-server via npm).

Open the project in your preferred code editor.

Serve or open index.html using a local server (recommended to avoid CORS issues with local JSON).

The app will load with the default Kendo MVVM bindings.

Interact with the UI – data is fetched from the /data/ JSON files.

🔹 Notes
Kendo MVVM binding is initialized inside index.html via JavaScript.

Each section (e.g., Countries, Users) has its own ViewModel and corresponding view.

JSON files simulate backend data and are used for populating Kendo Grids or controls.

Styling is handled via custom CSS inside the assets folder, along with Kendo’s own styles.
