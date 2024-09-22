import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

 const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      pos={"fixed"}
      top={"5"}
      right={"4"}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
      zIndex={"overlay"}
    />
  );
};
export default ColorModeSwitcher;
