# Knot
## Founders
- Arian Shaikh, https://github.com/arian0zen
- Souvik Das, https://github.com/souvik-wizard
- Tuhin Bar, https://github.com/TuhinBar

## Features
- Login: Users can log in to Knot using their Google account or a username and password.

- Create posts: Users can create posts with text, images, or links, and categorize them with tags. Other users can upvote, downvote, comment, and share posts.

- Create challenges: Users can create challenges with a specific theme and rules, and invite other users to participate. Participants can submit entries and vote for the winner.

- Create polls: Users can create polls with multiple options and vote on them. The results are displayed in real-time.

- Follow other users: Users can follow other users to see their posts and activity in their feed.

- Points system: Each user has a certain amount of points that they can earn by posting content, getting engagement on their content, and participating in challenges and polls. Users can use their points to perform certain actions, such as commenting with special emojis or updating their profile picture and username.

## Technologies
Knot is built using the following technologies:
- Node.js: A JavaScript runtime that allows for server-side scripting.

- JavaScript: A programming language used for both front-end and back-end development.

- EJS: A templating language for rendering HTML pages dynamically.

- CSS: A style sheet language used for designing the look and feel of the platform.

## Installation
To run Knot locally, follow these steps:

1. Clone this repository to your local machine.
Install Node.js and npm (Node Package Manager) on your machine.
2. Open a terminal and navigate to the root directory of the repository.
3. Run the command `npm install` to install the necessary dependencies.
4. Create a .env file in the root directory and add the following environment variables:  
`DB_URI =`  
`CLIENT_ID = `  
`CLIENT_SECRET = `  
`CALLBACK_URL = `  
`SESSION_SECRET =   `   
`COOKIE_KEY = `  
`CLOUD_NAME = <cloudinary name, client>`  
`API_KEY = <cloudinary api key>`  
`API_SECRET = <cloudinary secret>`
5. Run the command `npm start` to start the server.
6. Open a web browser and go to `http://localhost` to access the platform.

# Contributions
Contributions to Knot are always welcome! Whether you have found a bug, want to add a new feature, or just have a suggestion for improvement, your input is valued.

If you want to contribute, here are some guidelines to follow:  
## Submitting an issue
If you have found a bug or want to suggest an improvement, please submit an issue on the GitHub repository. When submitting an issue, please provide as much detail as possible, including:

- A clear and concise description of the issue
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Any error messages or stack traces

## Making a pull request
If you want to make a code contribution to Knot, please follow these steps:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Implement your changes, making sure to follow the code style guidelines and write tests for any new functionality.
3. Run the tests using the command npm test to make sure everything passes. (current version doesn't include tests)
Create a pull request to the main branch of the Knot repository.    
n.b : contribution about the testings and documentation are highly prioritized at this point
4. Wait for feedback from the maintainers and address any comments or suggestions.

## Code style guidelines
To maintain consistency and readability in the codebase, please follow these guidelines:

- Use camelCase for variable and function names
- Use descriptive variable names that are easy to understand.
- Avoid nested callbacks and use async/await where possible.
- Use try catch when possible
- Make sure you use await Promise.all([]) for independent concurrent requests
- Follow the DRY (Don't Repeat Yourself) principle and refactor duplicate code into reusable functions.
- Write tests for any new functionality. 

## License
By contributing to Knot, you agree to license your contributions under the terms of the MIT License.
