import { AppBar, Toolbar, Box, Button, SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ReactComponent as MenuIcon } from "../../assets/icons/hamburger.svg";
import OhmMenu from "./OhmMenu.jsx";
import ThemeSwitcher from "./ThemeSwitch.jsx";
import ConnectMenu from "./ConnectMenu.jsx";
import styled from 'styled-components'
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { AiFillFacebook } from 'react-icons/ai'
import { FaInstagram, FaYoutube, FaTwitter, FaPaperPlane } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi'
import "./topbar.scss";

const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      padding: "10px",
    },
    justifyContent: "flex-end",
    alignItems: "flex-end",
    background: "transparent",
    backdropFilter: "none",
    zIndex: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("981")]: {
      display: "none",
    },
  },
}));

function TopBar({ theme, toggleTheme, handleDrawerToggle }) {
  const classes = useStyles();
  const isVerySmallScreen = useMediaQuery("(max-width: 355px)");
  const [hamburgeropen, setHamburgerOpen] = useState(false);

  const dialog = useRef();
  const hamburger = useRef();

  useEffect(() => {
    document.addEventListener('mouseup', function (event) {
      if (dialog.current && !dialog.current.contains(event.target) && !hamburger.current.contains(event.target)) {
        setHamburgerOpen(false);
      }
    });
  }, []);

  useEffect(() => {
    console.log(hamburgeropen)
  }, [hamburgeropen])
  return (
    <StyledContainer >
      <Box display={'flex'} justifyContent={'space-between'} pr={'16px'} pl={'16px'}>
        <Box display={'flex'} alignItems={'center'}>
          <Box display={'flex'} alignItems={'center'}>
            <Box mr={'10px'} mt={'8px'}>
              <img src={'./bsc-usd.webp'} width={'40px'} height={'100%'} alt={'logo'} />
            </Box>
            <Menus>
              <Box><Link to={'/pools'} style={{ color: 'white', textDecoration: 'unset' }}>Pools</Link></Box>
            </Menus>
          </Box>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Box display={'flex'} alignItems={'center'} height={'64px'} >
            <ConnectMenu theme={theme} />
            <Hamburger onClick={() => setHamburgerOpen(!hamburgeropen)} ref={hamburger}>
              <GiHamburgerMenu />
            </Hamburger>
          </Box>
        </Box>
      </Box>
      <div ref={dialog}>
        <HamburgerMenu width={'100%'} open={hamburgeropen}>
          <Menus open={hamburgeropen}>
            <Box><Link to={'/pools'} style={{ color: 'white', textDecoration: 'unset' }} >Pools</Link></Box>
          </Menus>
        </HamburgerMenu>
      </div>
    </StyledContainer >
  );
}
const StyledContainer = styled(Box)`
    width : 100%;
    background-color : rgb(236, 249, 255);
    padding : 0 20px;
    @media screen and (max-width : 450px){
      padding : 0;
    }
    @media screen and (max-width : 1175px){
        >div:nth-child(1)>div:nth-child(1)>div{
            justify-content : start;
            >div{
                width : fit-content;
                margin-left : 10px;
            }
        }
    }
    position : fixed;
    top : 0;
    z-index : 10;
`;

const LogoText = styled(Box)`
    font-family : none;
    font-size : 28px;
    font-weight : 400;
    color : #d3824a;
    font-style : italic;
    -webkit-text-stroke: 0.3px #363636;
    margin-left : 20px;
    >span{
        color : white;
    }
    @media screen and (max-width : 500px){
        display : none;
    }
`;

const Divider = styled(Box)`
    width : 2px;
    height : 34px;
    background-color :  rgba(255,255,255,0.3);
    @media screen and (max-width : 1175px){
        display : none;
    }
`;

const Menus = styled(Box)`
    display : flex;
    justify-content : space-evenly;
    width : 100%;
    max-width : 500px;
    >div{
      position: relative;
      display: flex;
      align-items: center;
        height: 48px;
        padding: 0px 16px;
        cursor : pointer;
        >a {
          color : rgb(50, 111, 174) !important;
          font-size : 16px;
          font-weight: 400;
        }
        &:hover {
          background: rgba(85, 176, 221, 0.133);
          border-radius: 16px;
      }
    }
    
    @media screen and (max-width : 1175px){
        display : ${({ open }) => open ? '' : 'none'};
        align-items : center;
        flex-direction : column;
        max-width : unset;
        font-size : 16px;
        >div{
            padding : 5px;
        }
    }
`;
const Socials = styled(Box)`
    color : white;
    display : flex;
    justify-content : space-evenly;
    width : 100%;
    max-width : 80px;
    >div{
        cursor : pointer;
    }
    @media screen and (max-width : 1175px){
        display : ${({ open }) => open ? '' : 'none'};
        justify-content : center;
        max-width : unset;
        font-size : 24px;
        >div{
            padding : 10px 15px;
        }
    }
`;

const ConnectButton = styled(Box)`
    align-items: center;
    border-radius: 20px;
    width : 130px;
    height : 26px;
    box-shadow: rgb(14 14 44 / 40%) 0px -1px 0px 0px inset;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    justify-content: center;
    opacity: 1;
    height: 32px;
    background-color: rgb(31, 199, 212);
    color: white;
`;

const ConnectedButton = styled(Box)`
    width : 114px;
    height : 26px;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : white;
    color : #56ced7;
    border-radius : 20px;
    font-size : 11px;
    position : relative;
    overflow : unset;
    >div{
        position : absolute;
        border-radius : 50%;
        width : 29px;
        height : 29px;
        border: 1px solid #56ced7;
        top : -2px;
        left : -10px;
        background-color : white;
    }
    cursor : pointer;
`;

const Hamburger = styled.div`
    font-size : 24px;
    color : #06a2ef ;
    margin-top : 7px;
    margin-left : 20px;
    cursor : pointer;
    display : none;
    @media screen and (max-width : 1175px){
        display : unset;
    }
`;

const HamburgerMenu = styled(Box)`
    transition : all 0.3s;
    height : ${({ open }) => open ? '110px' : '0'};
    overflow : hidden;
    @media screen and (min-width : 1175px){
        display : none;
    }
`;
export default TopBar;
