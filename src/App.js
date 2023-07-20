/* eslint-disable jsx-a11y/alt-text */
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "./App.css";
import data from "./data.js";
import { useEffect, useState, lazy, Suspense, memo } from "react";
import { Route, Routes, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { UseSelector, useSelector } from "react-redux";
import { useQuery } from "react-query";
import Cart from "./routes/Cart";
import { ProductCard, DetailCard } from "./routes/Card";

// const ProductCard = lazy(() => import("./routes/Card"));
// const DetailCard = lazy(() => import("./routes/Card"));
// const Cart = lazy(() => import("./routes/Cart"));

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [btnCount, setBtnCount] = useState(1);
  let [isExistNext, setIsExistNext] = useState(true);
  let [waiting, setWaiting] = useState(false);
  let state = useSelector((state) => state);
  let getWatched = JSON.parse(localStorage.getItem("watched"));
  let result = useQuery("result", () =>
    axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
      return a.data;
    })
  );
  useEffect(() => {
    if (!getWatched) localStorage.setItem("watched", JSON.stringify([]));
  }, []);
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
      {getWatched.length >= 1 ? (
        <div className="watched-container">
          <p className="watched-title">최근본상품</p>
          <div className="watched-list">
            {JSON.parse(localStorage.getItem("watched")).map((e) => {
              return <p>{e}번인 상품</p>;
            })}
          </div>
        </div>
      ) : null}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="nav">
          <Link to="./" className="nav-title">
            S.Shop
          </Link>
          <Nav className="me-auto nav-text">
            <Link to="./product">Product</Link>
            <Link to="./cart">Cart</Link>
          </Nav>
          <Nav className="ms-auto text-warning">
            {result.isLoading ? "로딩중" : result.data.name}
          </Nav>
        </Container>
      </Navbar>
      {/* <Suspense fallback={<div>로딩중</div>}> <Suspense>*/}
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
              <Outlet></Outlet>
            </div>
          }
        >
          <Route path=":id" element={<DetailCard shoes={shoes} />} />
        </Route>
        {/* <Route path="/detail/:id" element={<DetailCard shoes={shoes} />} /> */}
        <Route path="/about" element={<About shoes={shoes} />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>
        <Route path="*" element={<div>404</div>} />
        <Route path="/event" element={<Event shoes={shoes} />}>
          <Route path="one" element={<h4>첫 주문시 양배추즙 서비스</h4>} />
          <Route path="two" element={<h4>생일기념 쿠폰받기</h4>} />
        </Route>
        <Route path="/cart" element={<Cart></Cart>} />
      </Routes>
    </div>
  );
}
// memo 안에 있는 props값이 변하면 렌더링
let About = memo(function () {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
});

let Event = memo(function () {
  return (
    <div>
      <h1>오늘의 이벤트</h1>
      <Outlet></Outlet>
    </div>
  );
});
export default App;
