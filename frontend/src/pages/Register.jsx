const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData) // formData must have fullName, email, idNumber, password
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Account created! Please log in.");
      navigate('/login');
    } else {
      // This will show "Already exists" message from your backend
      toast.error(data.message); 
    }
  } catch (error) {
    toast.error("Connection failed.");
  }
};