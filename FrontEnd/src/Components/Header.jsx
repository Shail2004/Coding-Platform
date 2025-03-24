import React from 'react'
import {
  VStack,
  HStack,
  border,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useToast
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { BiMenuAltLeft } from "react-icons/bi"
import { Text } from '@chakra-ui/react'
import { FaFreeCodeCamp } from "react-icons/fa";
import { Box } from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext';

import "../Style/navbar.scss";
import "../Style/all.scss";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/login');
  };

  return (
    <>
     <HStack h="20" justifyContent={"space-between"} background={"transparent"}>
        <HStack marginLeft={"4"} className='logo' as={Link} to={isAuthenticated ? "/playground" : "/"}>
          <FaFreeCodeCamp size={"25"}/>
          <Text size={"2rem"} >CodeShastra</Text>
        </HStack>
        <HStack columnGap={"2rem"} >
          {isAuthenticated && (
            <>
              <Box as={Link} className='contest' to={"/problems"}>Problems</Box>
              <Link className='contest'>Contest</Link>
              <Link className='contest' to={"/playground"}>PlayGround</Link>
            </>
          )}
        </HStack>
        <HStack marginRight={"20"} columnGap={"0rem"} >
          {!isAuthenticated ? (
            <>
              <Link className='login' to={"/login"}>LogIn</Link>
              <Link className='last' to={"/signup"}>Sign Up</Link>
            </>
          ) : (
            <Menu>
              <MenuButton as={Button} variant="ghost" p={1} rounded="full">
                <Avatar 
                  size="sm" 
                  name={user?.name} 
                  bg="#a9e63d" 
                />
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to="/playground">My Dashboard</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
     </HStack>
    </>
  );
};

export default Header;
