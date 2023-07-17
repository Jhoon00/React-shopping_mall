/* eslint-disable jsx-a11y/alt-text */
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

function ProductCard(props) {
  let { id } = useParams();
  return (
    <Col>
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
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              props.shoes.id +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{props.shoes.title}</h4>
          <p>{props.shoes.content}</p>
          <p>{props.shoes.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export { ProductCard, DetailCard };
