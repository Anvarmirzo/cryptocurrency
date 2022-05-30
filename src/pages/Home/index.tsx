import React from 'react';
import {Col, Row, Statistic, Typography} from 'antd';
import {useGetCryptosQuery} from '../../core/services';
import millify from 'millify';
import {Link} from 'react-router-dom';
import {CryptocurrenciesPage} from '../Cryptocurrencies';
import {NewsPage} from '../News';

export const HomePage = () => {
    const {data, isFetching} = useGetCryptosQuery(10);
    const stats = data?.data.stats;

    if (isFetching) return <>Loading...</>;
    return (
        <>
            <Typography.Title level={2} className="heading">Global Crypto Stats</Typography.Title>
            <Row>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={millify(stats?.total || 0)}/></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(stats?.totalExchanges || 0)}/></Col>
                <Col span={12}>
                    <Statistic
                        title="Total Market Cap"
                        value={millify(parseFloat(stats?.totalMarketCap || '0'))}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Total 24h Volume"
                        value={millify(parseFloat(stats?.total24hVolume || '0'))}
                    />
                </Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(stats?.totalMarkets || 0)}/></Col>
            </Row>
            <div className="home-heading-container">
                <Typography.Title level={2} className="home-title">
                    Top 10 Cryptocurrencies in the world
                </Typography.Title>
                <Typography.Title level={3} className="show-more">
                    <Link to="/cryptocurrencies">Show more</Link>
                </Typography.Title>
            </div>
            <CryptocurrenciesPage simplified/>
            <div className="home-heading-container">
                <Typography.Title level={2} className="home-title">
                    Latest Crypto News
                </Typography.Title>
                <Typography.Title level={3} className="show-more">
                    <Link to="/news">Show more</Link>
                </Typography.Title>
            </div>
            <NewsPage simplified/>
        </>
    );
};