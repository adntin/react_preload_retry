import React, { lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import componentPreload from '../../componentPreload';
import componentRetry from '../componentRetry';
import SceneList_ from './SceneList';
// import createWithPreload from '../createWithPreload';

// const withPreload = createWithPreload();

const SceneList = SceneList_;
const SceneCreate = lazy(() =>
  componentRetry(() => {
    console.log('import SceneCreate');
    return import(/* webpackChunkName: "Scene.Create" */ './SceneCreate');
  }),
);
const SceneUpdate = lazy(() =>
  componentRetry(() => {
    console.log('import SceneUpdate');
    return import(/* webpackChunkName: "Scene.Update" */ './SceneUpdate');
  }),
);
const SceneRecommend = lazy(() =>
  componentRetry(() => {
    console.log('import SceneRecommend');
    return import(/* webpackChunkName: "Scene.Recommend" */ './SceneRecommend');
  }),
);

const Scene = () => {
  return (
    <div>
      <Routes>
        <Route element={<SceneList />} index></Route>
        <Route path="/Scene/Create" element={<SceneCreate />}></Route>
        <Route path="/Scene/Update" element={<SceneUpdate />}></Route>
        <Route path="/Scene/Recommend" element={<SceneRecommend />}></Route>
      </Routes>
      <Link to="/Scene/Create">Scene Create</Link>
      <Link to="/Scene/Update">Scene Update</Link>
      <Link to="/Scene/Recommend">Scene Recommend</Link>
    </div>
  );
};

export default Scene;
