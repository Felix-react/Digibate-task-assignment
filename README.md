
# Blog Post Generator API

## Overview
This is a NestJS application that generates blog posts using OpenAI's GPT model. Users can upload a JSON file containing company details, specify the blog post structure, description, and length, and receive a generated blog post in HTML format.

## Features
- Upload a JSON file with company details.
- Specify blog post description, structure, and length.
- Generate and display the blog post in HTML format.

## Technologies Used
- NestJS
- TypeScript
- Express.js
- Multer (for file uploads)
- OpenAI API

## Requirements
- Node.js (version 14 or higher)
- Nest CLI (optional)
- OpenAI API Key (you must sign up for an API key)

## Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory and add your OpenAI API key:
```bash
OPENAI_API_KEY=your_openai_api_key
```

### 4. Create the uploads directory
Make sure to create a directory for file uploads:
```bash
mkdir uploads
```

### 5. Start the application
Run the application:
```bash
npm run start
```

## API Endpoints

### Generate Blog Post
- **POST** `/blog/generate`
- **Description**: Generates a blog post based on the uploaded JSON file and request body.
- **Request Body**:
  ```json
  {
    "description": "Your blog description",
    "structure": "The desired structure of the blog post",
    "length": "Desired word count"
  }
  ```
- **File Upload**: 
  - The request must include a file upload with the key `file`. The file should be in JSON format containing company details.
  
### Example Request
You can use tools like Postman or cURL to test the endpoint. Here's an example using cURL:
```bash
curl -X POST http://localhost:3000/blog/generate \
  -H "Content-Type: application/json" \
  -F "file=@path/to/your/file.json" \
  -F 'description="Sample Blog Post"' \
  -F 'structure="Introduction, Body, Conclusion"' \
  -F 'length="500"'
```

## Error Handling
- If no file is uploaded, a 400 status code will be returned.
- If there’s an issue reading the uploaded file, a 500 status code will be returned.
- If there’s an error generating the blog post, a 500 status code will be returned.

## License
This project is licensed under the MIT License.

## Acknowledgements
- [NestJS](https://nestjs.com/)
- [OpenAI API](https://beta.openai.com/)
- [Multer](https://www.npmjs.com/package/multer)
