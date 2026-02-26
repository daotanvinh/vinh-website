# Vinh Website

## Setup Instructions

### Running the Server Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/daotanvinh/vinh-website.git
   cd vinh-website
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Development Server**:
   ```bash
   npm start
   ```
   Your server should now be running on `http://localhost:3000`.

### Deploying to Heroku
1. **Create a new Heroku app**:
   ```bash
   heroku create your-app-name
   ```
2. **Deploy your code**:
   ```bash
   git push heroku main
   ```
3. **Open your app**:
   ```bash
   heroku open
   ```

### Deploying to Render
1. **Create a new web service** on Render.
2. **Connect your GitHub repository** and select `main` as the branch to deploy.
3. **Set environment variables** if necessary, and Render will automatically deploy your app.