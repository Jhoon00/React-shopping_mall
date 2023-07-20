/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Col, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Styled, { styled } from "styled-components";
import { pushCart } from "../store";

let Btn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;

let Box = styled.div`
  background: grey;
  padding: 20px;
`;

function ProductCard(props) {
  let navigate = useNavigate();
  return (
    <Col
      className="col-4 mb-3"
      onClick={() => {
        navigate("./../detail/" + props.id);
      }}
    >
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.id + 1) + ".jpg"
        }
        style={{ width: "80%" }}
      />
      <h4>{props.title}</h4>
      <p>{props.content}</p>
      <p>{"가격 : " + props.price}</p>
    </Col>
  );
}

function DetailCard(props) {
  const { shoes } = props;
  let { id } = useParams();
  let shoe = shoes.find((shoe) => shoe.id == id);
  let [time, setTime] = useState(2);
  let [tap, setTap] = useState(0);
  let [fade, setFade] = useState("");
  let dispatch = useDispatch();
  let state = useSelector((state) => state);
  useEffect(() => {
    let getWatch = JSON.parse(localStorage.getItem("watched"));
    getWatch.push(shoe.id);
    getWatch = [...new Set(getWatch)];
    localStorage.setItem("watched", JSON.stringify(getWatch));
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, []);
  useEffect(() => {
    if (time >= 0) {
      setTimeout(() => {
        setTime(time - 1);
        console.log(time);
      }, 1000);
    }
  }, [time]);
  return (
    <div className={"container start " + fade}>
      {time >= 0 ? (
        <div className="alert alert-warning">{time}초이내 구매시 할인</div>
      ) : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (shoe.id + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{shoe.title}</h4>
          <p>{shoe.content}</p>
          <p>{shoe.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(pushCart(shoe));
            }}
          >
            주문하기
          </button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={() => setTap(0)}>
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={() => setTap(1)}>
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={() => setTap(2)}>
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TapContent tap={tap} shoes={shoes} />
    </div>
  );
}
function TapContent(props) {
  const { tap, shoes } = props;
  let [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [tap]);
  return (
    <div className={"start " + fade}>
      {
        [
          <div>{shoes[0].title}</div>,
          <div>{shoes[1].title}</div>,
          <div>{shoes[2].title}</div>,
        ][tap]
      }
    </div>
  );
}
export { ProductCard, DetailCard };
