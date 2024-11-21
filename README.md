# AWS-portfolio-proj
A group project for the Per Scholas AWS re/Start portfolio project
## Overall Project Goals
1. User should be able to input information and be assigned a QR code
2. User should be able to scan QR code and be sent to a web page displaying information corresponding to the QR code

## Repository structure (Subject to change)
------------

        aws-portfolio-proj/
        │
        ├── /frontend
        │   ├── /public
        │   │   ├── index.html              # HTML template for React
        │   │   ├── manifest.json           # Metadata for the web app
        │   │   └── favicon.ico             # App icon
        │   │
        │   ├── /src
        │   │   ├── /components
        │   │   │   ├── UserInputForm.jsx   # React component for user input form
        │   │   │   ├── QRCodeDisplay.jsx  # React component to display QR code
        │   │   │   └── Navbar.jsx         # Optional navigation bar component
        │   │   │
        │   │   ├── /pages
        │   │   │   ├── HomePage.jsx       # Main page containing the UserInputForm
        │   │   │   ├── ProfilePage.jsx    # Profile page to show user data and QR code
        │   │   │   └── NotFoundPage.jsx   # 404 fallback page
        │   │   │
        │   │   ├── App.js                 # Root component of the React app
        │   │   ├── index.js               # Entry point for React app
        │   │   └── App.css                # Global styles for the app
        │   │
        │   ├── package.json               # Dependencies and project metadata
        │   ├── package-lock.json          # Lockfile for dependencies
        │   └── README.md                  # Documentation for the frontend
        │
        ├── backend/                           # Backend Lambda function code
        │   ├── lambda-functions/                   
        │   │   ├── process_user.py            # Lambda for validating and processing user info
        │   │   ├── generate_QR_code.py        # Lambda function to generate QR code
        │   │   ├── store_QR_code.py           # Lambda function to store QR code in S3
        │   │   ├── store_user_data.py         # Lambda function to store user info to DyanmoDB
        │   │   └── utils.py
        │   └──  requirements.txt           # Python dependencies for Lambda
        │
        │
        ├── infrastructure/                    # Infrastructure as Code (IaC) for project deployment
        │   └── template.yaml                  # CloudFormation Template 
        │
        ├── .gitignore                         # Git ignore file
        └── README.md                          # Main project overview

## Person 1: Frontend Developer (User Interface and S3 Hosting)
Goal: Build the frontend of the application to collect user data and host it on Amazon S3.
## Steps:
### 1.Design the Frontend:


    a. Build a form to collect user information (first name, last name, email).
      The form should have fields for:
      First Name
      Last Name
      Email Address
      Submit Button
    b. Build a page that will display the info of the QR code when scanned
        Page should display a picture (THIS WILL NOT BE A USER SPECIFIC PHOTO JUST A STATIC PLACEHOLDER IMAGE) 

### 2.Connect to API Gateway:


    After the user submits the form, configure the form to send an HTTP request to API Gateway. The API Gateway URL will be provided by Person 2.
    Fetch API in JavaScript to send data in JSON format to the backend API.
### 3.Host on Amazon S3:


    Create an S3 bucket to host the static website (you can configure this with public access).
    Upload the static website files (HTML, CSS, JS) to the bucket.
    Enable Static Website Hosting on the S3 bucket.
    Share the URL of the hosted website with the team so they can test the frontend.


## Person 2: API Gateway and Routing SpecialistPerson 2: API Gateway and Routing Specialist
Goal: Set up Amazon API Gateway to route the data from the frontend to the backend Lambda function.
## Steps:
### 1.Create the API:


    Go to Amazon API Gateway in the AWS Console.
    Create a new REST API.
    Set up a POST method for the endpoint, as the form will be sending user data (first name, last name, email).
    The POST method will route the requests to the Lambda function created by Person 3.
### 2.Connect API Gateway to Lambda:


    In the API Gateway console, choose your newly created API.
    For the POST method, configure it to invoke the Lambda function created by Person 3 (backend logic for processing user data).
    Set up request validation and any necessary API keys or authentication if required.
### 3.Test the API:


    Ensure the API Gateway is correctly routing the data to the Lambda function.
    Provide the API Gateway URL to Person 1 so the frontend can send data to the backend.



## Person 3: Lambda Functions and Backend Logic
Goal: Build the backend logic using AWS Lambda to process user input and generate a unique user ID.
## Steps:
### 1.Create Lambda Function:


    Create a new AWS Lambda function using the Python or Node.js runtime (whichever is preferred).
    This function will be triggered by API Gateway (configured by Person 2) when the form is submitted.
### 2.Process User Input:


    Extract the user data (first name, last name, email) from the incoming POST request body.
    Generate a unique user ID (you can use a random UUID library in Python/Node.js).
### 3.Invoke QR Code Generation:


    Pass the user details and the generated user ID to the Lambda function handled by Person 4 for QR code generation.
### 4.Return Response:


    Once Person 4 returns the QR code and URL, send back the URL as the response to the frontend.
    Also, pass the user details and user ID to Person 5 to store in the database.
### 5.Deploy Lambda:


    Ensure the Lambda function is connected to API Gateway and test it to ensure the logic works as expected.
    


## Person 4: QR Code Generation and S3 Storage Management
Goal: Generate the QR code, store it in Amazon S3, and return the link to the QR code image.
## Steps:
### 1.Create Lambda for QR Code Generation:


    Create another AWS Lambda function that will generate a QR code based on the user ID generated by Person 3.
    Use a library like qrcode (Python) or qr-image (Node.js) to generate the QR code.
### 2.Store QR Code in S3:


    Create an Amazon S3 bucket specifically for storing the QR codes.
    After generating the QR code, save it as an image (PNG or JPEG) in the S3 bucket.
    Make sure to give the QR code a unique name (e.g., based on the user ID).
### 3.Return QR Code URL:


    Once the QR code is saved in S3, generate a pre-signed URL or public S3 link for the image.
    Return this URL to Person 3 so it can be returned to the frontend and stored in the database.
### 4.Deploy Lambda:


    Test the QR code generation function and its integration with the S3 bucket.



## Person 5: Database Management (DynamoDB or RDS)
Goal: Store user records in the database, including the user's first name, last name, email, user ID, and QR code URL.
## Steps:
### 1.Set Up the Database:


    Choose between Amazon DynamoDB (NoSQL) or Amazon RDS (relational). For simplicity, DynamoDB might be preferred for a beginner project.
    Create a DynamoDB table with a primary key for userID and additional attributes for firstname, lastname, email, and qrCodeUrl.
### 2.Store User Records:


    Write a Lambda function that stores user records when called by Person 3.
    When the user data and QR code URL are passed from the Lambda function created by Person 3, insert the data into the DynamoDB table.
### 3.Test Database Integration:


    Ensure that every new user submission results in a new entry in the database, with all required fields correctly stored.
    Test retrieval and storage with dummy data before full integration.



## Person 6: Testing, Monitoring, and Notifications
Goal: Set up monitoring for the application and send notifications when new users register.
## Steps:
### 1.Set Up Monitoring with CloudWatch:


    Use Amazon CloudWatch to track the performance of the Lambda functions and monitor API Gateway requests.
    Set up CloudWatch Alarms to trigger if there are any errors in Lambda execution, API Gateway timeouts, or high latency.
### 2.Set Up Notifications with SNS or SES:


    Option 1: Amazon SNS: Set up Simple Notification Service to send a notification (email or SMS) when a new user signs up. This can be triggered after the user record is successfully stored in DynamoDB.


    Option 2: Amazon SES: If you want to send confirmation emails to users with a link to their QR code, use Amazon SES (Simple Email Service) to send personalized emails.
### 3.End-to-End Testing:


    Coordinate with the other team members to test the entire workflow: from frontend submission to QR code generation and database storage.
    Test notifications to ensure that new users and the team are alerted when a new sign-up occurs.
### 4.Troubleshoot Issues:


    Use CloudWatch Logs to troubleshoot any issues in Lambda execution or API Gateway errors.
