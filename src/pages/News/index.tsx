import React, {useState} from 'react';
import {useGetCryptoNewsQuery, useGetCryptosQuery} from '../../core/services';
import {Avatar, Card, Col, Row, Select, Typography} from 'antd';
import moment from 'moment';
import {Loader} from '../../components';

const demoImgUrl = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

interface NewsPageProps {
    simplified?: boolean;
}

export const NewsPage = ({simplified}: NewsPageProps) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

    const {data: cryptoNews, isLoading} = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 12});
    const {data: cryptos} = useGetCryptosQuery(100);

    if (isLoading) return <Loader/>;

    const handleChange = (value: string) => setNewsCategory(value);

    const renderCryptoNews = () => {
        return cryptoNews?.value.map((news) => (
            <Col xs={24} sm={12} lg={8} key={news.url}>
                <Card hoverable className="news-card">
                    <a href={news.url} target="_blank" rel="noopener noreferrer">
                        <div className="news-image-container">
                            <Typography.Title level={4} className="news-title">{news.name}</Typography.Title>
                            <img
                                style={{maxWidth: '200px', maxHeight: '100px'}}
                                src={news.image?.thumbnail?.contentUrl || demoImgUrl}
                                alt=""
                            />
                        </div>
                        <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                        <div className="provider-container">
                            <div>
                                <Avatar
                                    size={24}
                                    src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImgUrl}
                                    alt=""
                                />
                                <Typography.Text className="provider-name">
                                    {news.provider[0]?.name}
                                </Typography.Text>
                            </div>
                            <Typography.Text>
                                {moment(news.datePublished).startOf('hours').fromNow()}
                            </Typography.Text>
                        </div>
                    </a>
                </Card>
            </Col>
        ));
    }

    const renderOptions = () => {
        return cryptos?.data?.coins.map((coin) => (
            <Select.Option key={coin.uuid} value={coin.name}>{coin.name}</Select.Option>
        ))
    }
    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a crypto"
                        optionFilterProp="children"
                        onChange={handleChange}
                        filterOption={(input, option) =>
                            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        <Select.Option value="Cryptocurrency">Cryptocurrency</Select.Option>
                        {renderOptions()}
                    </Select>
                </Col>
            )}
            {renderCryptoNews()}
        </Row>
    );
};