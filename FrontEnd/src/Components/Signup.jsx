import {
    Avatar,
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

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name || !email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill all the fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Password validation (at least 6 characters)
    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password should be at least 6 characters',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        name,
        email,
        password,
      });

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast({
        title: 'Account created!',
        description: "We've created your account successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Redirect to home page
      navigate('/playground');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Registration failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container h={"90vh"} maxWw={"xl"} p={"8"} border={"solid #a9e63d" } borderRadius={"2rem"} marginBottom={"1rem"} >
      <form onSubmit={handleSubmit}>
        <VStack h={"full"} justifyContent={"center"} spacing={"8"} alignItems={"stretch"} >
            <Heading textAlign={"center"}>Sign Up</Heading>
            <Avatar alignSelf={'center'} boxSize={'32'} />
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input 
                placeholder='Name' 
                focusBorderColor={"#a9e63d"} 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input 
                type='email' 
                placeholder='Email' 
                focusBorderColor={"#a9e63d"} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input 
                type='password' 
                placeholder='Password' 
                focusBorderColor={"#a9e63d"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button 
              variant={"solid"} 
              backgroundColor={"#a9e63d"} 
              color={"black"} 
              type="submit"
              isLoading={loading}
            >
              Sign Up
            </Button>
            <Text alignSelf={"flex-end"} >Already Registered ? {"  "}
                <Button variant={"link"}>
                    <Link to={"/login"}>Log In</Link>
                </Button>
            </Text>
        </VStack>
      </form>
    </Container>
  )
}

export default Signup