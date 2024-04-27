import React, { useState } from 'react';


const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [enteredVerificationCode, setEnteredVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Reset all states when switching between login and signup modes
    setVerificationCodeSent(false);
    setVerificationCode('');
    setPhoneNumber('');
    setEnteredVerificationCode('');
    setEmail('');
    setPassword('');
    setName('');
    setBirthdate('');
    setUploadedImage(null);
    setSelectedAddress('');
  };

  const handleSendVerificationCode = () => {
    // Simulated code to send verification code
    // This is just a placeholder, in a real application, you would send the code through SMS
    const generatedCode = Math.floor(100000 + Math.random() * 900000);
    setVerificationCode(generatedCode.toString());
    setVerificationCodeSent(true);
  };

  const handleVerification = () => {
    // Simulated code to verify the entered code
    if (enteredVerificationCode === verificationCode) {
      alert('Verification successful! You have been registered successfully.');
      setIsLogin(true); // Switch to login mode after successful registration
      // Reset verification related states after successful verification
      setVerificationCodeSent(false);
      setVerificationCode('');
      setEnteredVerificationCode('');
      // Restore other form fields
      setEmail('');
      setPassword('');
      setName('');
      setBirthdate('');
      setUploadedImage(null);
      setSelectedAddress('');
    } else {
      alert('Verification failed. Please enter the correct code.');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
          birthdate,
          verificationCode,
          imagePath: '', // Add logic to handle image upload and set imagePath
          phoneNumber,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        // Optionally, you can redirect the user to the login page after successful registration
        setIsLogin(true);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Perform validation if needed
    setUploadedImage(file);
  };

  const handleAddressSelect = (event) => {
    setSelectedAddress(event.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
        {isLogin ? (
          <div>
            <h3>Login</h3>
            <form>
              <label htmlFor="username">Email:</label><br />
              <input type="text" id="username" name="username" placeholder="Enter email" style={{ width: '100%', marginBottom: '10px' }} />
              <label htmlFor="password">Password:</label><br />
              <input type="password" id="password" name="password" placeholder="Enter password" style={{ width: '100%', marginBottom: '10px' }} />
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <button type="submit" style={{ width: '30%', backgroundColor: '#4CAF50', color: 'white', padding: '5px', margin: '4px 0', border: '1px solid #4CAF50', borderRadius: '1px', cursor: 'pointer' }}>Login</button>
              </div>
            </form>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>New User? <button onClick={toggleMode} style={{ border: 'none', backgroundColor: 'transparent', color: 'red', cursor: 'pointer' }}>Sign Up Now!</button></p>
          </div>
        ) : (
          <div>
            {!verificationCodeSent && <h3>Sign Up</h3>}
            {!verificationCodeSent ? (
              <form>
                <label htmlFor="newUsername">Email:</label><br />
                <input type="text" id="newUsername" name="newUsername" value={email || ''} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" style={{ width: '100%', marginBottom: '10px' }} /><br />
                <label htmlFor="newPassword">Password:</label><br />
                <input type="password" id="newPassword" name="newPassword"  value={password || ''} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" style={{ width: '100%', marginBottom: '10px' }} /><br />
                <label htmlFor="name">Complete Name:</label><br />
                <input type="text" id="name" name="name"  value={name || ''} onChange={(e) => setName(e.target.value)} placeholder="Firstname/Middlename/Lastname" style={{ width: '100%', marginBottom: '10px' }} /><br />
                <label htmlFor="birthdate">Birthdate:</label><br />
                <input type="date" id="birthdate" name="birthdate"  value={birthdate || ''} onChange={(e) => setBirthdate(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} /><br />
                <label htmlFor="phoneNumber">Phone Number:</label><br />
                <input type="text" id="phoneNumber" name="phoneNumber"  value={phoneNumber || ''} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter phone number" style={{ width: '100%', marginBottom: '10px' }} /><br />
                <label htmlFor="image">Upload Profile Picture:</label><br />
                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageUpload} style={{ width: '100%', marginBottom: '10px' }} /><br />
                <label htmlFor="address">Complete Address:</label><br />
                <select id="address" name="address"  value={selectedAddress || ''} onChange={handleAddressSelect} style={{ width: '100%', marginBottom: '10px' }}>
                  <option value="">-- Select Address --</option>
                  <option value=" Cebu City"> Cebu City</option>
                  <option value=" Cebu City"> Mandaue City</option>
                  {/* Add more options as needed */}
                </select>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                  <button type="button" onClick={handleSendVerificationCode} style={{ width: '30%', backgroundColor: '#4CAF50', color: 'white', padding: '5px', margin: '4px 0', border: '1px solid #4CAF50', borderRadius: '1px', cursor: 'pointer' }}>Sign Up</button>
                </div>
              </form>
            ) : (
              <form>
                <div style={{ marginBottom: '10px' }}>Enter Verification Code:</div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                  {[...Array(6)].map((_, index) => (
                    <input key={index} style={{ marginRight: '10px', width: '30px', textAlign: 'center' }} type="text" maxLength="1" value={enteredVerificationCode[index] || ''} onChange={(e) => {
                      const newCode = [...enteredVerificationCode];
                      newCode[index] = e.target.value;
                      setEnteredVerificationCode(newCode);
                    }} />
                  ))}
                </div>
                <button type="button" onClick={handleVerification} style={{ width: '100%', marginBottom: '10px', backgroundColor: '#4CAF50', color: 'white', padding: '10px', margin: '8px 0', border: '1px solid #4CAF50', borderRadius: '4px', cursor: 'pointer' }}>Verify</button>
              </form>
            )}
            {!verificationCodeSent && <p style={{ textAlign: 'center', marginTop: '10px' }}>Already have an account? <button onClick={toggleMode} style={{ border: 'none', backgroundColor: 'transparent', color: 'red', cursor: 'pointer' }}>Login Now!</button></p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
