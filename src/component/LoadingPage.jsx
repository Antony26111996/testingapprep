import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const LoadingPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress size={80} />
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Loading...
      </Typography>
    </div>
  );
};

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate slow network request
    setTimeout(() => {
      fetch('https://api.example.com/data')
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false); // Data loaded, set loading to false
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // Error occurred, set loading to false
        });
    }, 2000); // Simulated delay of 2 seconds
  }, []);

  return loading ? <LoadingPage /> : <div>{/* Render your content here */}</div>;
};

export default App;