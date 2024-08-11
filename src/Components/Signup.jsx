import {
    Avatar,
    Button,
    Container,
    Heading,
    Input,
    Text,
    VStack,
  } from '@chakra-ui/react';
  import React from 'react';
  import { Link } from 'react-router-dom';


const Signup = () => {
  return (
    <Container h={"90vh"} maxWw={"xl"} p={"8"} border={"solid #a9e63d" } borderRadius={"2rem"} marginBottom={"1rem"} >
    <VStack h={"full"} justifyContent={"center"} spacing={"8"} alignItems={"stretch"} >
        <Heading textAlign={"center"}>Sign Up</Heading>
        <Avatar alignSelf={'center'} boxSize={'32'} />
        <Input placeholder='Name' focusBorderColor={"#a9e63d"} required/>
        <Input type='email' placeholder='Email' focusBorderColor={"#a9e63d"} required/>
        <Input type='password' placeholder='Password' focusBorderColor={"#a9e63d"} required/>
        <Button variant={"solid"} backgroundColor={"#a9e63d"} color={"black"}>Sign Up</Button>
        <Text alignSelf={"flex-end"} >Already Registered ? {"  "}
            <Button variant={"link"}>
                <Link to={"/login"}>Log In</Link>
            </Button>
        </Text>
    </VStack>

</Container>
  )
}

export default Signup