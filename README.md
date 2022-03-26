# React + Redux

## store の設定

src/store/index.js

```
import { createStore } from "redux";

const initialState = {
  count: 50,
};

const reducer = (state = initialState) => {
  return state;
};
```

### Provider の設定

src/index.js

```
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux"
import store from "./store/index";

ReactDOM.render(
  // store内のデータをどのコンポーネントでも使えるようにする
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

## React + Redux には３つの表示方法がある。

1. 直接 store にアクセスする getState()

- state の更新ができない。

### store にある state へのアクセス

src/App.js

```
import "./App.css";
import store from './store/index'

const App = () => {
    return(
        <div className="App">
            <h1>Redux Learn</h1>
            // store.getState().countを実行することでstoreに保存されているstateのcountにアクセスすることができる
            <p>Count:{store.getState().count}</p>
        </div>
    )
}

export default App;
```

2. connect 関数の利用

- mapStateToProps, mapDispatchToProps を使う

### store にある state へのアクセス

src/App.js

```
import React from "react";
import "./App.css";
import { connect } from "react-redux";

// propsにcountを入れる
const App = ({ count }) => {
    return(
        <div className="App">
            <h1>Redux Learn</h1>
            <p>Count:{count}</p>
        </div>
    )
}

const mapStateToProps = ( state ) => {
    return { count: state.count }
}

export default connect(mapStateToProps)(App);
```

### データの変更　

src/store/index.js

```
import { createStore } from 'redux';

// 第二引数にactionを指定して、このactionの値によって処理を切り分ける
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return {
        count: state.count + 1,
      };
    case 'DECREASE_COUNT':
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
```

src/App.js

```
import React from "react";
import "./App.css";
import { connect } from "react-redux";

const App = () => {
    return(
        <div className="App">
            <h1>Redux Learn</h1>
            <p>Count: {count}</p>
            <button onClick={increase}>Up</button>
            <button onClick={decrease}>Down</button>
        </div>
    )
}

const mapStateToProps = ( state ) => {
    return { count: state.count };
}

// mapDispatchToPropsを使ってActionのtypeで処理をする関数を定義
const mapDispatchToProps = ( dispatch ) => {
    return {
        increase: () => dispatch({ type: "INCREASE_COUNT"}),
        decrease: () => dispatch({ type: "DECREASE_COUNT"}),
    };
}

// connectの第二引数にmapDispatchToPropsを指定
export default connect(mapStateToProps, mapDispatchToProps)(App);
```

3. Hooks の利用

- useSelector, useDispatch を使う
- combineReducer を使って目的や用途によって複数の reducer に分けられる
- これを基本的に使う。

### store にある state へのアクセス

src/App.js

```
import React from "react";
import "./App.css";
import { useSelector } from "react-redux";

const App = () => {
    // useSelectorを使うとstoreに保存されているstateデータの中から必要なデータを選択して取り出すことができる。
    const count = useSelector((state) => state.count);
    return(
        <div className="App">
            <h1>Redux Learn</h1>
            <p>Count:{count}</p>
        </div>
    )
}

export default App;
```

### combineReducer

src/store/index.js

```
import { createStore, combineReducers } from "redux";

// reducerを２つに分ける → countReducer, postsReducer
const countReducer = (
    state = {
        count: 50,
    }
) => {
    return state;
}

const postsReducer = (
    state = {
        posts: [
            { id: 1, title: "Reduxについて"},
            { id: 2, title: "ReduxのHooksについて"}
        ]
    }
) => {
    return state;
}

// combineReducersを使って２つのreducerを保存する
const rootReducer = combineReducers({
    countReducer,
    postsReducer,
})

const store = createStore(rootReducer);
```

src/App.js

```
import React from "react";
import "./App.css";
import { useSelector } from "react-redux";

const App = () => {
    // state.countReducer.countでcombineReducersからcountReducerのcountにアクセスできる
    const count = useSelector((state) => state.countReducer.count);
    return(
        <div className="App">
            <h1>Redux Learn</h1>
            <p>Count:{count}</p>
        </div>
    )
}

export default App;
```

### データの変更　

src/store/index.js

```
import { createStore } from 'redux';

// 第二引数にactionを指定して、このactionの値によって処理を切り分ける
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return {
        count: state.count + 1,
      };
    case 'DECREASE_COUNT':
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
```

src/App.js

```
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();
    const increase = () => {
        dispatch({ type: "INCREASE_COUNT"});
    };
    const decrease = () => {
        dispatch({ type: "DECREASE_COUNT"})
    }
    return(
        <div className="App">
            <h1>Redux Learn</h1>
            <p>Count: {count}</p>
            <button onClick={increase}>Up</button>
            <button onClick={decrease}>Down</button>
        </div>
    )
}

export default App;
```
