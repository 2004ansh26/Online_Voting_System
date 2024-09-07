# Blockchain-Based-Voting-System


<!-- Blockchain-Based Voting System -->
Welcome to the Blockchain-Based Voting System repository! This project aims to provide a secure, transparent, and efficient voting platform utilizing blockchain technology.

<!-- Overview -->
The Blockchain-Based Voting System is designed to ensure a trustworthy electoral process, mitigating risks of fraud, enhancing voter confidence, and providing real-time access to voting results. The system leverages the immutable nature of blockchain to record votes, ensuring that all votes are counted accurately and cannot be tampered with.

# Features
Secure Voting: Each vote is recorded on the blockchain, ensuring it cannot be altered or deleted.

Real-Time Results: View real-time voting results with interactive charts and data visualizations.

Admin Control: Admins can start and end elections, reset the system, and manage candidates.

Voter Verification: Ensure that only eligible voters can participate in the election.

Timeout Functionality: Automatically end the election after a specified period.

# Technologies Used
<!-- Frontend -->

React.js: A JavaScript library for building user interfaces.

Axios: Promise-based HTTP client for the browser and Node.js.

Formik: Library for building forms in React.

Yup: Schema builder for value parsing and validation.

<!-- Backend -->

Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine.

Express.js: Fast, unopinionated, minimalist web framework for Node.js.

TypeORM: ORM for TypeScript and JavaScript.

Web3.js: Collection of libraries to interact with a local or remote Ethereum node.

Multer: Middleware for handling multipart/form-data, primarily used for uploading files.

JWT: Library to create and verify JSON Web Tokens.

<!-- Blockchain -->

Ganache CLI: Personal blockchain for Ethereum development.

Truffle: Development environment, testing framework, and asset pipeline for Ethereum.

<!-- Database -->

MySQL: Open-source relational database management system.


# Installation

<!-- Prerequisites -->
Node.js (version 14.x or higher)
npm (version 6.x or higher) or Yarn (version 1.22.x or higher)
MySQL (version 5.7 or higher)
Ganache CLI (version 6.12.x or higher)
Truffle (version 5.x or higher)


# Steps
Clone the repository:
```sh
git clone https://github.com/2004ansh26/Online_Voting_System.git
```
```sh
cd blockchain-voting-system
```
<!-- Install dependencies: -->
```sh
npm install
```
or
```sh
yarn install
```

<!-- Set up MySQL database: -->

Create a new database named voting_system.
Update the database connection settings in ormconfig.json.
Compile and deploy smart contracts:
```sh
truffle compile
```
```sh
truffle migrate
```
<!-- Start the development server: -->
```sh
npm start
```
or
```sh
yarn start
```

# Usage
<!-- Admin -->
Start Election: Admin can start an election by providing election details and candidate information.
End Election: Admin can manually end the election or wait for the automatic timeout.
Reset Election: Admin can reset the election system for a new election cycle.

<!-- Voter -->
Vote: Voters can cast their votes securely, ensuring their vote is recorded on the blockchain.
View Results: Voters can view real-time results and the remaining time until the election ends.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

## Note
To upload the bulk users use format as give in the file :- Book1.xlsx
