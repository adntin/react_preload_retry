/*
 * @Author: linbin@leedarson.com
 * @Date: 2022-07-12 19:47:19
 * Copyright © Leedarson. All rights reserved.
 */

export default function componentRetry(lazyComponent, attemptsLeft = 3, interval = 1500) {
  return new Promise((resolve, reject) => {
    lazyComponent()
      .then(resolve)
      .catch(error => {
        // let us retry after 1500 ms
        setTimeout(() => {
          if (attemptsLeft === 1) {
            console.error('JS加载失败');
            reject(error);
            return;
          }
          console.warn('JS加载重试', attemptsLeft);
          componentRetry(lazyComponent, attemptsLeft - 1).then(resolve, reject);
        }, interval);
      });
  });
}
