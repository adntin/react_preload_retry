/*
 * @Author: liwenfu@leedarson.com
 * @Date: 2021-11-19 15:50:41
 * Copyright © Leedarson. All rights reserved.
 */
import React from 'react';

const createWithPreload = (timeout = 0) => {
  const preloadComponents = [];

  return (Component, disabled) => {
    // react 17：lazyType._payload._result
    // react 16：lazyType._ctor
    if (!disabled && Component._ctor) {
      preloadComponents.push(Component);
    }

    return props => {
      if (preloadComponents.length) {
        // 避免重复 preload，因为预加载一次就够
        const components = preloadComponents.splice(0);

        setTimeout(() => {
          components.forEach(lazyType => {
            console.log('JS预加载', lazyType._ctor());
          });
        }, timeout);
      }

      return <Component {...props} />;
    };
  };
};

export default createWithPreload;
