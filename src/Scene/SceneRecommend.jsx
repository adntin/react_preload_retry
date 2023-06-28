import React, { lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import componentPreload from '../../componentPreload';
import componentRetry from '../componentRetry';
import SceneRecommendList_ from './SceneRecommendList';
import createWithPreload from '../createWithPreload';

const withPreload = createWithPreload();

const SceneRecommendList = withPreload(SceneRecommendList_);
const SceneRecommendDetail = withPreload(
  lazy(() =>
    componentRetry(() => {
      console.log('import SceneRecommendDetail');
      return import(/* webpackChunkName: "Scene.Recommend.Detail" */ './SceneRecommendDetail');
    }),
  ),
);

const Scene = () => {
  return (
    <div>
      <Routes>
        <Route path="/Scene/Recommend" exact>
          <SceneRecommendList />
        </Route>
        <Route path="/Scene/Recommend/Detail">
          <SceneRecommendDetail />
        </Route>
      </Routes>
      <Link to="/Scene/Recommend/Detail?id=123">Scene Recommend Detail 123</Link>
      <Link to="/Scene/Recommend/Detail?id=456">Scene Recommend Detail 456</Link>
    </div>
  );
};

export default Scene;
