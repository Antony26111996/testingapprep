import React, { useState } from 'react';
import { Lock } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import Missanlogo from '../Images/Missanlogo.png'; 

export const Login = (props) => {
  const navigate = useNavigate();

  const { handleLogin, password, email, setEmail, setPassword } = props;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url("https://static.wixstatic.com/media/036fc9_cfef4cd7bc004f3c98c62506a1056da4~mv2.png/v1/fill/w_640,h_462,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/036fc9_cfef4cd7bc004f3c98c62506a1056da4~mv2.png")', // Replace with your image URL
        backgroundSize: 'cover',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '800px',
        }}
      >
        {/* Left side: Login form */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            color: 'black',
            width: '50%',
            height: '42vh',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative', 
          }}
        >
          {/* Missan logo  */}
          <img
            src={Missanlogo}
            alt="Missan Logo"
            style={{
              width: '120px',
              position: 'absolute',
              top: '0px',
              right: '10px', 
            }}
          />

          <h1 style={{ paddingTop: '40px' }}>
            Login 
         
          </h1>
          <form>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ marginBottom: '15px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid grey',
                    marginBottom: '15px',
                    marginTop: '45px',
                  }}
                >
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    placeholder="Username"
                    style={{
                      padding: '10px',
                      width: '100%',
                      border: 'none',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                  />
                  <IconButton>
                    <PersonIcon />
                  </IconButton>
                </div>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid grey',
                  }}
                >
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    placeholder="Password"
                    style={{
                      padding: '10px',
                      width: '100%',
                      border: 'none',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                  />
                  <IconButton>
                    <Lock />
                  </IconButton>
                </div>
              </div>
              <button
                onClick={handleLogin}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '50px',
                }}
              type='button'
              >
                Login
              </button>
            </div>
          </form>
        </div>
        {/* Right side: Image */}
        <div
          style={{
            width: '50%',
          }}
        >
          <img
            src="https://media.licdn.com/dms/image/C4E12AQEYMCFZy1ygiw/article-cover_image-shrink_720_1280/0/1610325424082?e=2147483647&v=beta&t=qmTC3E8zGKwUe4i9oT5NhSi-zaA4KZtbVlyFSKitgrA"
            alt="Login Image"
            style={{
              width: '100%',
              height: '44vh',
              objectFit: 'cover',
              borderRadius:'10px',
            }}
          />
        </div>
      </div>
    </div>
  );
};
