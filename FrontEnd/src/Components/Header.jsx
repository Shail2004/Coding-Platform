import React from 'react'
import {
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useToast,
  Flex,
  Text,
  Box,
  Button,
  useColorModeValue,
  Icon
} from '@chakra-ui/react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaFreeCodeCamp, FaCode } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';

import "../Style/navbar.scss";
import "../Style/all.scss";

const NavLink = ({ to, children, isActive }) => {
  const activeColor = "#a9e63d";
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  
  return (
    <Box
      as={Link}
      to={to}
      px={4}
      py={2}
      rounded={'md'}
      fontWeight={isActive ? 'bold' : 'medium'}
      color={isActive ? activeColor : 'inherit'}
      _hover={{
        textDecoration: 'none',
        bg: hoverBg,
        transform: 'translateY(-2px)',
        transition: 'all 0.2s ease-in-out'
      }}
      transition="all 0.2s ease-in-out"
      position="relative"
      _after={isActive ? {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        bg: activeColor
      } : {}}
    >
      {children}
    </Box>
  );
};

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

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

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      px={4}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={100}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
    >
      <Flex h="16" alignItems={'center'} justifyContent={'space-between'}>
        {/* Logo and Site Name */}
        <HStack spacing={3} as={Link} to={isAuthenticated ? "/problems" : "/"} _hover={{ textDecoration: 'none' }}>
          <Icon as={FaFreeCodeCamp} w={7} h={7} color="#a9e63d" />
          <Text fontSize="xl" fontWeight="bold" bgGradient="linear(to-r, #a9e63d, green.400)" bgClip="text">
            CodeShastra
          </Text>
        </HStack>

        {/* Navigation Links */}
        {isAuthenticated && (
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <NavLink to="/problems" isActive={isActive('/problems')}>Problems</NavLink>
            <NavLink to="/contest" isActive={isActive('/contest')}>Contest</NavLink>
            <NavLink to="/playground" isActive={isActive('/playground')}>PlayGround</NavLink>
          </HStack>
        )}

        {/* Auth Buttons or User Menu */}
        <HStack spacing={4}>
          {!isAuthenticated ? (
            <>
              <Button 
                as={Link} 
                to="/login" 
                variant="ghost"
                colorScheme="green"
                size="sm"
                fontWeight="medium"
                _hover={{ bg: 'gray.100' }}
              >
                Log In
              </Button>
              <Button 
                as={Link} 
                to="/signup" 
                colorScheme="green"
                size="sm"
                fontWeight="medium"
                bg="#a9e63d"
                _hover={{ bg: 'green.400' }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                _hover={{ transform: 'scale(1.05)' }}
                transition="all 0.2s"
              >
                <Avatar
                  size="sm"
                  name={user?.name}
                  bg="#a9e63d"
                  src={user?.avatar}
                  border="2px solid"
                  borderColor="green.400"
                />
              </MenuButton>
              <MenuList>
                <MenuItem 
                  as={Link} 
                  to="/problems" 
                  icon={<Icon as={FaCode} color="#a9e63d" />}
                  fontWeight="medium"
                >
                  My Dashboard
                </MenuItem>
                <MenuItem 
                  onClick={handleLogout}
                  fontWeight="medium"
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
