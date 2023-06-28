/*
 * @Author: liwenfu@leedarson.com
 * @Date: 2021-11-19 15:50:41
 * Copyright © Leedarson. All rights reserved.
 */
import React from 'react';

const preloadComponents = [];

const componentPreload = (Component, timeout = 1000) => {
  // react 16：lazyType._ctor
  // react 17：lazyType._payload._result
  if (Component._ctor) {
    preloadComponents.push(Component);
  }
  return props => {
    if (preloadComponents.length) {
      // 注意: 避免重复 preload，因为预加载一次就够
      const components = preloadComponents.splice(0); // 清除数组
      setTimeout(() => {
        components.forEach(reactLazy => {
          console.log('JS 预加载, 执行 reactLazy._ctor()');
          reactLazy
            ._ctor()
            .then(v => {
              console.log('JS 预加载成功', v);
            })
            .catch(e => {
              console.log('JS 预加载失败', e);
            });
        });
      }, timeout);
    }

    return <Component {...props} />;
  };
};

export default componentPreload;
