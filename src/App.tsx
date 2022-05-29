import React from 'react';
import './App.css';
import {AppRoutes} from './Routes';
import {Layout, Space, Typography} from 'antd';
import {Navbar} from './components';
import {NavLink} from 'react-router-dom';

function App() {
    return (
        <div className="app">
            <header className="navbar">
                <Navbar/>
            </header>
            <div className="main">
                <main>
                    <Layout>
                        <div className="routes">
                            <AppRoutes/>
                        </div>
                    </Layout>
                </main>
                <footer className="footer">
                    <Typography.Title level={5} style={{color: '#fff', textAlign: 'center'}}>
                        Cryptoverse <br/>
                        All rights reserved
                    </Typography.Title>
                    <Space>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/exchanges">Exchanges</NavLink>
                        <NavLink to="/news">News</NavLink>
                    </Space>
                </footer>
            </div>
        </div>
    )
}

export default App;
