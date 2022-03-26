import "./App.css";
import store from "./store/index";
import { connect, useSelector } from "react-redux";
import Count from "./components/Count";

function App({ count, increase, decrease }) {
  // const count = useSelector((state) => state.countReducer.count);
  // const increase = () => {
  //   dispatch({ type: "INCREASE_COUNT" });
  // };
  // const decrease = () => {
  //   dispatch({ type: "DECREASE_COUNT" });
  // };
  return (
    <div className="App">
      <h1>Redex Learn</h1>
      {/* <p>Count:{store.getState().count}</p> */}
      {/* <p>Count:{count}</p> */}
      <Count />
      {/* <button onClick={increase}>Up</button>
      <button onClick={decrease}>Down</button> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { count: state.count, posts: state.posts };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increase: () => dispatch({ type: "INCREASE_COUNT" }),
    decrease: () => dispatch({ type: "DECREASE_COUNT" }),
  };
};

// export default connect(mapStateToProps)(App);
export default connect(mapStateToProps, mapDispatchToProps)(App);
