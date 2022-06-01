import React, {useEffect, useState} from 'react';
import {Col, Row, Typography} from 'antd';
import {Line} from 'react-chartjs-2';
import {ICoinHistoryResponse} from '../../core/models';
import {CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

interface LineChartProps {
    coinHistory: ICoinHistoryResponse;
    currentPrice: string;
    coinName: string
};
export const LineChart = ({coinHistory, currentPrice, coinName}: LineChartProps) => {
    const [coinPrice, setCoinPrice] = useState<string[]>([]);
    const [coinTimestamp, setCoinTimestamp] = useState<string[]>([]);
    useEffect(() => {
        coinHistory.data.history.forEach((coinHistoryItem) => {
            setCoinPrice(prev => [...prev, coinHistoryItem.price])
            setCoinTimestamp(prev => [...prev, new Date(coinHistoryItem.timestamp * 1000).toLocaleDateString()])
        });
    }, [coinHistory])

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

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
            <Line options={options} data={data}/>
        </>
    );
}