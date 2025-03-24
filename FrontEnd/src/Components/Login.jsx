import {
    Button,
    Container,
    Heading,
    Input,
    Text,
    VStack,
    useToast,
    FormControl,
    FormLabel,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import axios from 'axios';

  
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill all the fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Redirect to problems page
      navigate('/problems');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Login failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container h={"95vh"} maxWw={"xl"} p={"8"} border={"solid #a9e63d" } borderRadius={"2rem"} marginBottom={"1rem"} >
        <form onSubmit={handleSubmit}>
          <VStack h={"full"} justifyContent={"center"} spacing={"8"} alignItems={"stretch"} >
              <Heading textAlign={"center"}>Welcome Back</Heading>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                  type='email' 
                  placeholder='Email' 
                  focusBorderColor='#a9e63d' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input 
                  type='password' 
                  placeholder='Password' 
                  focusBorderColor='#a9e63d' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button variant={"link"} alignSelf={"flex-end"}><Link to={"/signup"} textalin="right" >Forget password ?</Link></Button>
              <Button 
                variant={"solid"} 
                backgroundColor={"#a9e63d"} 
                type="submit"
                isLoading={loading}
              >
                Log In
              </Button>
              <Text alignSelf={"flex-end"}>New User ? {"  "}
                  <Button variant={"link"}>
                    <Link to={"/signup"} >Sign Up</Link>
                  </Button>
              </Text>
          </VStack>
        </form>
    </Container>
  )
}

export default Login