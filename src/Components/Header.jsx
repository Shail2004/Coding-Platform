import React from 'react'
import {
  VStack,
  HStack,
  border
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {BiBorderBottom, BiMenuAltLeft, BiOutline} from "react-icons/bi"
import { Text } from '@chakra-ui/react'
import { FaFreeCodeCamp } from "react-icons/fa";
import { Box } from '@chakra-ui/react'

import "../Style/navbar.scss";
import "../Style/all.scss";

const Header = () => {
  return (
    <>
     <HStack h="20" justifyContent={"space-between"} background={"transparent"}>
        <HStack marginLeft={"4"} className='logo' as={Link} to={"/"}>
          <FaFreeCodeCamp size={"25"}/>
          <Text size={"2rem"} >CodeShastra</Text>
        </HStack>
        <HStack columnGap={"2rem"} >
          <Box as={Link} className='contest' to={"/problems"}>Problems</Box>
          
          <Link className='contest'>Contest</Link>
          <Link className='contest' to={"/playground"}>PlayGround</Link>
        </HStack>
        <HStack marginRight={"20"} columnGap={"0rem"} >
          <Link className='login' to={"/login"}>LogIn</Link>
          <Link className='last' to={"/signup"}>Sign Up</Link>
        </HStack>
     </HStack>

    </>
  );
};

export default Header;
