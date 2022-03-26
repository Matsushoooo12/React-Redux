import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";

const Count = () => {
  //   const count = useSelector((state) => state.countReducer.count);
  //   const posts = useSelector((state) => state.postsReducer.posts);
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const increase = () => {
    dispatch({ type: "INCREASE_COUNT" });
  };
  const decrease = () => {
    dispatch({ type: "DECREASE_COUNT" });
  };
  return (
    <>
      <div>Countコンポーネント:{count}</div>
      <button onClick={increase}>Up</button>
      <button onClick={decrease}>Down</button>
      {/* <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul> */}
    </>
  );
};

// const mapStateToProps = (state) => {
//   return { count: state.count };
// };

// export default connect(mapStateToProps)(Count);

export default Count;
