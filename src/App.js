/* eslint-disable jsx-a11y/alt-text */
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "./App.css";
import data from "./data.js";
import { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate, Outlet } from "react-router-dom";
import { DetailCard, ProductCard } from "./routes/Card";
import axios from "axios";
import Cart from "./routes/Cart";

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [btnCount, setBtnCount] = useState(1);
  let [isExistNext, setIsExistNext] = useState(true);
  let [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (btnCount == 1) return;
    if (!isExistNext) {
      return;
    }

    setTimeout(() => {
      axios
        .get("https://codingapple1.github.io/shop/data" + btnCount + ".json")
        .then((res) => {
          let copy = [...shoes, ...res.data];
          setShoes(copy);
        })
        .catch(() => {
          setIsExistNext(false);
          alert("상품이 더 이상 없습니다.");
        })
        .finally(() => setWaiting(false));
    }, 1000);
  }, [btnCount]);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="nav">
          <Link to="./" className="nav-title">
            S.Shop
          </Link>
          <Nav className="me-auto nav-text">
            <Link to="./product">Product</Link>
            <Link to="./detail">Detail</Link>
            <Link to="./cart">Cart</Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <button
                onClick={() => {
                  navigate(-1);
                }}
              >
                ⬅
              </button>
              <button
                onClick={() => {
                  navigate(1);
                }}
              >
                ➡
              </button>
            </div>
          }
        />
        <Route
          path="/product"
          element={
            <>
              <div
                className="main-bg"
                style={{
                  backgroundImage:
                    "url(" + process.env.PUBLIC_URL + "/img/bg.png)",
                }}
              ></div>
              <Row>
                {shoes.map((e, idx) => {
                  return (
                    <ProductCard
                      key={idx}
                      id={e.id}
                      title={e.title}
                      content={e.content}
                      price={e.price}
                    />
                  );
                })}
              </Row>
              {isExistNext ? (
                <button
                  onClick={() => {
                    setWaiting(true);
                    setBtnCount(btnCount + 1);
                  }}
                >
                  더보기
                </button>
              ) : null}
              {waiting ? <p>waiting.......</p> : null}
            </>
          }
        />
        <Route
          path="/detail"
          element={
            <div>
              <input
                onChange={(e) => {
                  if (isNaN(e.target.value)) {
                    alert("그러지마세요");
                    e.target.value = "";
                  } else {
                    navigate("./detail/" + e.target.value);
                  }
                }}
                className="mt-3"
              ></input>
              <Outlet></Outlet>
            </div>
          }
        >
          <Route path=":id" element={<DetailCard shoes={shoes} />} />
        </Route>
        {/* <Route path="/detail/:id" element={<DetailCard shoes={shoes} />} /> */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>
        <Route path="*" element={<div>404</div>} />
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<h4>첫 주문시 양배추즙 서비스</h4>} />
          <Route path="two" element={<h4>생일기념 쿠폰받기</h4>} />
        </Route>
        <Route path="/cart" element={<Cart></Cart>} />
      </Routes>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}
function Event() {
  return (
    <div>
      <h1>오늘의 이벤트</h1>
      <Outlet></Outlet>
    </div>
  );
}
export default App;
