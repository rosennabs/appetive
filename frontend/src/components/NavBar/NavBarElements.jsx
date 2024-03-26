import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: #EBB22F;
    height: 70px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;
    /* Third Nav */
    /* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
    color: #00000;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &:hover {
        color: #F5F5EF;
    }
    &.active {
        color: #F5F5EF;
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #00000;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
        z-index: 13;
    }
    &:hover {
        color: #F5F5EF;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    /* Second Nav */
    /* margin-right: 24px; */
    /* Third Nav */
    /* width: 100vw;
    white-space: nowrap; */
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    /* Third Nav */
    /* justify-content: flex-end;
    width: 100vw; */
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #F5F5EF;
    padding: 8px 22px;
    color: #00000;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    /* Second Nav */
    margin-left: 10px;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #64471D;
        color: #F5F5EF;
    }
    &.active {
        background: #64471D;
        color: #F5F5EF;
    }
`;


export const ImgBtnLink = styled(Link)`
    position: absolute;
    border-radius: 4px;
    background: #EBB22F;
    padding: 8px 20px;
    color: #000000;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    font-size: 10px;
    margin-left: 200px;
    margin-top: -65px;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #64471D;
        color: #F5F5EF;
    }
    @media screen and (min-width: 768px) {
        margin-top: -60px;
        margin-left: 250px;
        font-size: 15px;
        padding: 7px 20px;
    }
    @media screen and (min-width: 1080px) {
        margin-top: -110px;
        margin-left: 320px;
        font-size: 22px;
    }
`;

export const SearchBtnLink = styled(Link)`
    position: absolute;
    border-radius: 4px;
    background: #EBB22F;
    padding: 8px 25px;
    color: #000000;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    font-size: 10px;
    margin-left: 40px;
    margin-top: -65px;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #64471D;
        color: #F5F5EF;
    }
    @media screen and (min-width: 768px) {
        margin-top: -60px;
        margin-left: 50px;
        font-size: 15px;
        padding: 7px 20px;
    }
    @media screen and (min-width: 1080px) {
        margin-top: -110px;
        margin-left: 60px;
        font-size: 22px;
        
    }
`;