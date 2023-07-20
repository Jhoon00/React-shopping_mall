import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { upCount, filterCart } from "../store";
import { changeUser, increaseAge } from "../store/userSlice";

function Cart() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  return (
    <div>
      <h6>
        {state.user.age}살인 {state.user.name}의 장바구니
      </h6>
      <button
        onClick={() => {
          dispatch(increaseAge(10));
        }}
      >
        +
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.carts.map((cart, i) => {
            return <List cart={cart} />;
          })}
        </tbody>
      </Table>
    </div>
  );
}

function List(props) {
  const { cart } = props;
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  return (
    <tr>
      <td>{cart.id}</td>
      <td>{cart.name}</td>
      <td>{cart.count}</td>
      <td>
        <button
          onClick={() => {
            dispatch(upCount(cart.id));
          }}
        >
          +
        </button>
        <button
          className="ms-1"
          onClick={() => {
            dispatch(filterCart(cart.id));
          }}
        >
          X
        </button>
      </td>
    </tr>
  );
}

export default Cart;
