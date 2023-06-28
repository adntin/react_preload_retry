import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import createWithPreload from './createWithPreload';
import componentRetry from './componentRetry';
import Home_ from './Home/Home';

const withPreload = createWithPreload();
const Home = withPreload(Home_); // 注意: 首页必须包裹, 否则`componentPreload.js`返回的函数组件没有执行就不会预加载
const Scene = withPreload(
  lazy(() =>
    componentRetry(() => {
      console.log('import Scene');
      return import(/* webpackChunkName: "Scene" */ './Scene/Scene');
    }),
  ),
);
const Smart = () => {
  return <div>Smart Page</div>;
};

function App() {
  return (
    <Suspense fallback={<>Loading</>}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Scene/*" element={<Scene />} />
          <Route path="/Smart/*" element={<Smart />} />
        </Routes>
        <Link to="/">Home</Link>
        <Link to="/Scene">Scene</Link>
        <Link to="/Smart">Smart</Link>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
