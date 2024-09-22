import {
    Button,
    Container,
    Heading,
    Input,
    Text,
    VStack,
  } from '@chakra-ui/react';
  import React from 'react';
  import { Link } from 'react-router-dom';

  
const Login = () => {
  return (
    <Container h={"95vh"} maxWw={"xl"} p={"8"} border={"solid #a9e63d" } borderRadius={"2rem"} marginBottom={"1rem"} >
        <VStack h={"full"} justifyContent={"center"} spacing={"8"} alignItems={"stretch"} >
            <Heading textAlign={"center"}>Welcome Back</Heading>
            <Input type='email' placeholder='Email' focusBorderColor='#a9e63d' required/>
            <Input type='password' placeholder='Password' focusBorderColor='#a9e63d' required/>
            <Button variant={"link"} alignSelf={"flex-end"}><Link  to={"/signup"} textalin="right" >Forget password ?</Link></Button>
            <Button variant={"solid"} backgroundColor={"#a9e63d"}>Log In</Button>
            <Text alignSelf={"flex-end"}>New User ? {"  "}
                <Button variant={"link"}>
                  <Link to={"/signup"} >Sign Up</Link>
                </Button>
            </Text>
        </VStack>

    </Container>
  )
}

export default Login