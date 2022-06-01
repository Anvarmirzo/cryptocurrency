import React, {useEffect, useState} from 'react';
import {useGetCryptosQuery} from '../../core/services';
import {Card, Col, Input, Row} from 'antd';
import {Link} from 'react-router-dom';
import millify from 'millify';
import {Loader} from '../../components';

interface CryptoCurrenciesPageProps {
    simplified?: boolean;
}

export const CryptocurrenciesPage = ({simplified}: CryptoCurrenciesPageProps) => {
    const {data, isFetching} = useGetCryptosQuery(simplified ? 10 : 100)

    const [cryptos, setCryptos] = useState(data?.data?.coins || []);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        setCryptos(data?.data?.coins || []);
    }, [data?.data?.coins])

    if (isFetching) return <Loader/>;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        const filteredCryptos = data?.data?.coins.filter(crypto => crypto.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setCryptos(filteredCryptos || []);
    }

    const renderCryptos = () => {
        return cryptos.map((crypto) => (
                <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.uuid}>
                    <Link to={`/crypto/${crypto.uuid}`}>
                        <Card
                            title={`${crypto.rank}. ${crypto.name}`}
                            extra={<img src={crypto.iconUrl} className="crypto-image" alt=""/>}
                            hoverable
                        >
                            <p>Price: {millify(parseFloat(crypto.price))}</p>
                            <p>Market Cap: {millify(parseFloat(crypto.marketCap))}</p>
                            <p>Daily Change: {millify(parseFloat(crypto.change))}</p>
                        </Card>
                    </Link>
                </Col>
            )
        )
    }

    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input
                        placeholder="Search Cryptocurrency"
                        onChange={handleSearchChange}
                        value={searchTerm}
                    />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {renderCryptos()}
            </Row>
        </>
    );
};