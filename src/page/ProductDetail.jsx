import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const getProductDetail = async () => {
    let url = `http://localhost:3004/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProduct(data);
  }
  useEffect(() => {
    getProductDetail();
  }, []);
  return (
    <Container>
      <Row>
        <Col className='product-img'>
          <img src={product?.img} />
        </Col>
        <Col>
          <div>{product?.title}</div>
          <div>{product?.price} 원</div>
          <div>conscious choice</div>
          <div>
            {['사이즈선택'].map(
              (variant) => (
                <DropdownButton
                  as={ButtonGroup}
                  key={variant}
                  id={`dropdown-variants-${variant}`}
                  variant={variant.toLowerCase()}
                  title={variant}
                >
                  <Dropdown.Item eventKey="1">S</Dropdown.Item>
                  <Dropdown.Item eventKey="2">M</Dropdown.Item>
                  <Dropdown.Item eventKey="3" active>
                    L
                  </Dropdown.Item>
                </DropdownButton>
              ),
            )}
          </div>
          <div>
            <Button className='product-add' variant="dark">추가</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetail