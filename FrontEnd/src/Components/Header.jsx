import React, { useState } from 'react'
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
  Icon,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaFreeCodeCamp, FaCode } from "react-icons/fa";
import { HamburgerIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';

import "../Style/navbar.scss";
import "../Style/all.scss";

const NavLink = ({ to, children, isActive, mobile = false }) => {
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
      className={`nav-link ${isActive ? 'active' : ''}`}
      w={mobile ? "full" : "auto"}
      textAlign={mobile ? "center" : "left"}
      _hover={{
        textDecoration: 'none',
        bg: hoverBg,
        transform: 'translateY(-2px)',
        transition: 'all 0.2s ease-in-out'
      }}
      transition="all 0.2s ease-in-out"
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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      className="navbar-container"
    >
      <Flex h="16" alignItems={'center'} justifyContent={'space-between'}>
        {/* Logo and Site Name */}
        <HStack spacing={3} as={Link} to={isAuthenticated ? "/problems" : "/"} className="logo" _hover={{ textDecoration: 'none' }}>
          <Icon as={FaFreeCodeCamp} w={7} h={7} color="#a9e63d" />
          <Text fontSize="xl" fontWeight="bold" bgGradient="linear(to-r, #a9e63d, green.400)" bgClip="text">
            CodeShastra
          </Text>
        </HStack>

        {/* Desktop Navigation Links */}
        {isAuthenticated && (
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }} className="nav-links">
            <NavLink to="/problems" isActive={isActive('/problems')}>Problems</NavLink>
            <NavLink to="/contest" isActive={isActive('/contest')}>Contest</NavLink>
            <NavLink to="/playground" isActive={isActive('/playground')}>PlayGround</NavLink>
          </HStack>
        )}

        {/* Mobile Menu Button */}
        {isAuthenticated && (
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
          />
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
                className="auth-button login-button"
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
                className="auth-button signup-button"
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
                transition="all 0.2s"
              >
                <Avatar
                  size="sm"
                  name={user?.name}
                  bg="#a9e63d"
                  src={user?.avatar}
                  className="user-avatar"
                />
              </MenuButton>
              <MenuList>
                <MenuItem 
                  as={Link} 
                  to="/problems" 
                  icon={<Icon as={FaCode} color="#a9e63d" />}
                  fontWeight="medium"
                  className="menu-item"
                >
                  My Dashboard
                </MenuItem>
                <MenuItem 
                  onClick={handleLogout}
                  fontWeight="medium"
                  className="menu-item"
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
      </Flex>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <Icon as={FaFreeCodeCamp} color="#a9e63d" />
              <Text fontWeight="bold" bgGradient="linear(to-r, #a9e63d, green.400)" bgClip="text">
                CodeShastra
              </Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={6} align="stretch" mt={6}>
              <NavLink to="/problems" isActive={isActive('/problems')} mobile onClick={onClose}>Problems</NavLink>
              <NavLink to="/contest" isActive={isActive('/contest')} mobile onClick={onClose}>Contest</NavLink>
              <NavLink to="/playground" isActive={isActive('/playground')} mobile onClick={onClose}>PlayGround</NavLink>
              <Box pt={4} mt={4} borderTop="1px" borderColor={borderColor}>
                <Button
                  onClick={() => {
                    handleLogout();
                    onClose();
                  }}
                  colorScheme="red"
                  variant="outline"
                  width="full"
                  mt={4}
                >
                  Logout
                </Button>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
