/* eslint-disable jsx-a11y/alt-text */
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">S.Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Product</Nav.Link>
            <Nav.Link href="#pricing">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div
        className="main-bg"
        style={{
          backgroundImage: "url(" + process.env.PUBLIC_URL + "/img/bg.png)",
        }}
      ></div>
      <Row>
        <Col>
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            style={{ width: "80%" }}
          />
          <h4>상품명</h4>
          <p>상품설명</p>
        </Col>
        <Col>
          <img
            src="https://codingapple1.github.io/shop/shoes2.jpg"
            style={{ width: "80%" }}
          />
          <h4>상품명</h4>
          <p>상품설명</p>
        </Col>
        <Col>
          <img
            src="https://codingapple1.github.io/shop/shoes3.jpg"
            style={{ width: "80%" }}
          />
          <h4>상품명</h4>
          <p>상품설명</p>
        </Col>
      </Row>
    </div>
  );
}

export default App;
