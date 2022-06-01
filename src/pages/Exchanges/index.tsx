import React from 'react';
import {Avatar, Col, Collapse, Row, Typography} from 'antd';
import {useGetExchangesQuery} from '../../core/services';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import {Loader} from '../../components';

export const ExchangesPage = () => {
    const {data, isFetching} = useGetExchangesQuery();

    const exchangesList = data?.data?.exchanges;
    // Note: To access this endpoint you need premium plan
    if (isFetching) return <Loader/>;
    if (!exchangesList) return <>No exchanges</>;

    const renderExchanges = () => {
        return exchangesList.map((exchange) => (
            <Col span={24}>
                <Collapse>
                    <Collapse.Panel
                        key={exchange.uuid}
                        showArrow={false}
                        header={(
                            <Row key={exchange.uuid}>
                                <Col span={6}>
                                    <Typography.Text><strong>{exchange.rank}.</strong></Typography.Text>
                                    <Avatar className="exchange-image" src={exchange.iconUrl}/>
                                    <Typography.Text><strong>{exchange.name}</strong></Typography.Text>
                                </Col>
                                <Col span={6}>${millify(parseFloat(exchange['24hVolume']))}</Col>
                                <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                <Col span={6}>{millify(exchange.numberOfMarkets)}%</Col>
                            </Row>
                        )}
                    >
                        {HTMLReactParser('')}
                    </Collapse.Panel>
                </Collapse>
            </Col>
        ))
    }
    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Row>
                {renderExchanges()}
            </Row>
        </>
    );
};