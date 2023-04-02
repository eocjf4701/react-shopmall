import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../component/ProductCard';

const ProductAll = () => {
  const [productList, setProductList] = useState([]);
  const [query, seyQuery] = useSearchParams();
  const getProducts = async () => {
    let searchQuery = query.get('q') || "";
    let url = `http://localhost:3004/products?q=${searchQuery}`;
    let response = await fetch(url);
    let data = await response.json();
    // 2.
    setProductList(data);
  }

  // 배열에 빈값이면 화면 호출시 1번만 호출됨.
  useEffect(() => {
    // 1.
    getProducts();
  }, [query]);

  return (
    <div>
      <Container>
        <Row>
          {productList.map(menu => (
            <Col lg={3}>
              <ProductCard item={menu} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default ProductAll