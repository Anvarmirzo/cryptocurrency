import React, {useState} from 'react';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import {useParams} from 'react-router-dom';
import {useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} from '../../core/services';
import {
    CheckOutlined,
    DollarCircleOutlined, ExclamationCircleOutlined,
    FundOutlined, MoneyCollectOutlined,
    NumberOutlined, StopOutlined,
    ThunderboltOutlined,
    TrophyOutlined
} from '@ant-design/icons';
import {Col, Row, Select, Typography} from 'antd';
import {LineChart, Loader} from '../../components';

const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

export const CryptoDetailsPage = () => {
    const {coinId} = useParams();

    const [timePeriod, setTimePeriod] = useState('7d');

    const {data: detailsData, isFetching: isDetailsDataFetching} = useGetCryptoDetailsQuery(coinId || '')
    const {data: historyData, isFetching: isHistoryDataFetching} = useGetCryptoHistoryQuery({
        coinId: coinId || '',
        timePeriod
    })
    const cryptoDetails = detailsData?.data?.coin;

    if (isDetailsDataFetching || isHistoryDataFetching) return <Loader/>;
    if (!cryptoDetails || !historyData) return <>Not found</>;
    const stats = [
        {
            title: 'Price to USD',
            value: `$ ${millify(parseFloat(cryptoDetails.price))}`,
            icon: <DollarCircleOutlined/>
        },
        {
            title: 'Rank',
            value: cryptoDetails.rank,
            icon: <NumberOutlined/>
        },
        {
            title: '24h Volume',
            value: `$ ${millify(parseFloat(cryptoDetails['24hVolume']))}`,
            icon: <ThunderboltOutlined/>
        },
        {
            title: 'Market Cap',
            value: `$ ${millify(parseFloat(cryptoDetails.marketCap))}`,
            icon: <DollarCircleOutlined/>
        },
        {
            title: 'All-time-high(daily avg.)',
            value: `$ ${millify(parseFloat(cryptoDetails.allTimeHigh.price))}`,
            icon: <TrophyOutlined/>
        },
    ]

    const genericStats = [
        {
            title: 'Number of Markets',
            value: cryptoDetails.numberOfMarkets,
            icon: <FundOutlined/>
        },
        {
            title: 'Number of Exchanges',
            value: cryptoDetails.numberOfExchanges,
            icon: <MoneyCollectOutlined/>
        },
        {
            title: 'Approved Supply',
            value: cryptoDetails.supply.confirmed ? <CheckOutlined/> : <StopOutlined/>,
            icon: <ExclamationCircleOutlined/>
        },
        {
            title: 'Total Supply',
            value: `${millify(parseFloat(cryptoDetails.supply.total))}`,
            icon: <ExclamationCircleOutlined/>
        },
        {
            title: 'Circulating Supply',
            value: `$ ${millify(parseFloat(cryptoDetails.supply.circulating))}`,
            icon: <ExclamationCircleOutlined/>
        },
    ]

    const handleChange = (value: string) => setTimePeriod(value)

    const renderTimePeriod = () => {
        return time.map(date => <Select.Option key={date}>{date}</Select.Option>)
    }

    const renderStats = (stats: { title: string, value: string | number | JSX.Element, icon: JSX.Element }[]) => {
        return stats.map(stat => (
            <Col className="coin-stats" key={stat.title}>
                <Col className="coin-stats-name">
                    <Typography.Text>{stat.icon}</Typography.Text>
                    <Typography.Text>{stat.title}</Typography.Text>
                </Col>
                <Typography.Text className="stats">{stat.value}</Typography.Text>
            </Col>
        ))
    }

    const renderLinks = () => {
        return cryptoDetails.links.map(link => (
            <Row className="coin-link" key={link.name}>
                <Typography.Title level={5} className="link-name">{link.name}</Typography.Title>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                </a>
            </Row>
        ));
    };

    return (
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Typography.Title level={2} className="coin-name">
                    {cryptoDetails.name}
                    {cryptoDetails.symbol} Price
                </Typography.Title>
                <p>
                    {cryptoDetails.name} live price in US dollars. View value statistics, market cap and supply
                </p>
            </Col>
            <Select
                defaultValue={timePeriod}
                className="select-timeperiod"
                placeholder="Select Time Period"
                onChange={handleChange}
                value={timePeriod}
            >
                {renderTimePeriod()}
            </Select>
            <LineChart
                coinHistory={historyData}
                currentPrice={millify(parseFloat(cryptoDetails.price))}
                coinName={cryptoDetails.name}
            />
            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Typography.Title level={3} className="coin-details-heading">
                            {cryptoDetails.name} Value Statistics
                        </Typography.Title>
                        <p>An overview showing the stats of {cryptoDetails.name}</p>
                    </Col>
                    {renderStats(stats)}
                </Col>
                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Typography.Title level={3} className="coin-details-heading">
                            Other Statistics
                        </Typography.Title>
                        <p>An overview showing the stats of all cryptocurrencies</p>
                    </Col>
                    {renderStats(genericStats)}
                </Col>
            </Col>
            <Col className="coin-desc-link">
                <Row className="coin-desc">
                    <Typography.Title level={3} className="coin-details-heading">
                        What is {cryptoDetails.name}?
                    </Typography.Title>
                    {HTMLReactParser(cryptoDetails.description)}
                </Row>
                <Col className="coin-links">
                    <Typography.Title level={3} className="coin-details-heading">
                        {cryptoDetails.name} Links
                    </Typography.Title>
                    {renderLinks()}
                </Col>
            </Col>
        </Col>
    );
};