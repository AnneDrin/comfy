const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'comfy',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL');
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const {
    email,
    password,
    name,
    birthdate,
    verificationCode,
    imagePath,
    phoneNumber
  } = req.body;

  // Check if all required fields are present
  if (!email || !password || !name || !birthdate || !verificationCode || !imagePath || !phoneNumber) {
    return res.status(400).json({ error: 'All fields are required for registration.' });
  }

  // Dummy verification logic (replace with your actual verification logic)
  if (verificationCode !== '123456') {
    return res.status(400).json({ error: 'Verification code is incorrect.' });
  }

  // Insert user data into the database
  const query = `
    INSERT INTO users (email, password, name, birthdate, verification_code, image_path, phone_number)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [email, password, name, birthdate, verificationCode, imagePath, phoneNumber], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
    res.status(201).json({ message: 'User registered successfully.', user: result });
  });
});


// Sa iyong server:
app.post('/api/send-verification-code', (req, res) => {
  const { phoneNumber } = req.body;
  // Generate random verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  // Simulated code to send verification code (replace with actual code to send SMS)
  console.log(`Sending verification code ${verificationCode} to ${phoneNumber}`);
  res.json({ message: 'Verification code sent successfully!' });
});

app.post('/api/verify-code', (req, res) => {
  const { enteredVerificationCode, verificationCode } = req.body;
  // Verify if the entered code matches the generated code
  const verified = enteredVerificationCode === verificationCode;
  res.json({ verified });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

