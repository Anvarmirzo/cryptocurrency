import React, {useEffect, useState} from 'react';
import {Avatar, Button, Menu, Typography} from 'antd';
import {NavLink} from 'react-router-dom'
import icon from '../../assets/images/cryptocurrency.png';
import {FundOutlined, HomeOutlined, MenuOutlined, MoneyCollectOutlined} from '@ant-design/icons';


export const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState<number | null>(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        if (screenSize && screenSize < 768) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize])

    const handleClick = () => setActiveMenu(!activeMenu);


    return (
        <nav className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large"/>
                <Typography.Title level={2} className="logo">
                    <NavLink to="/">Cryptoverse</NavLink>
                </Typography.Title>
                <Button onClick={handleClick} className="menu-control-container">
                    <MenuOutlined/>
                </Button>
            </div>
            {activeMenu && (
                <Menu theme="dark">
                    <Menu.Item icon={<HomeOutlined/>}>
                        <NavLink to="/">Home</NavLink>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined/>}>
                        <NavLink to="/cryptocurrencies">Cryptocurrencies</NavLink>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined/>}>
                        <NavLink to="/exchanges">Exchanges</NavLink>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined/>}>
                        <NavLink to="/news">News</NavLink>
                    </Menu.Item>
                </Menu>
            )}
        </nav>
    );
};