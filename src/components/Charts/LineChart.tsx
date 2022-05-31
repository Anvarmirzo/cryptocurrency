import React from 'react';
import {Col, Row, Typography} from 'antd';

interface LineChartProps {
    coinHistory: any;
    currentPrice: string;
    coinName: string
};
export const LineChart = ({coinHistory, currentPrice, coinName}: LineChartProps) => {
    return (
        <>
            <Row className="chart-header">
                <Typography.Title level={2} className="chart-title">
                    {coinName} Price Chart
                </Typography.Title>
                <Col className="price-container">
                    <Typography.Title level={5} className="price-change">
                        {coinHistory?.data?.change}%
                    </Typography.Title>
                    <Typography.Title level={5} className="current-price">
                        Current {coinName} Price: ${currentPrice}
                    </Typography.Title>
                </Col>
            </Row>
        </>
    );
};