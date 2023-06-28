import React, { lazy } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import componentPreload from '../componentPreload';
import componentRetry from '../componentRetry';
import SmartList_ from './SmartList';

const SmartList = componentPreload(SmartList_);
const SmartCreate = componentPreload(
  lazy(() =>
    componentRetry(() => {
      console.log('import SmartCreate');
      return import(/* webpackChunkName: "Smart.Create" */ './SmartCreate');
    }),
  ),
);
const SmartUpdate = componentPreload(
  lazy(() =>
    componentRetry(() => {
      console.log('import SmartUpdate');
      return import(/* webpackChunkName: "Smart.Update" */ './SmartUpdate');
    }),
  ),
);

const Smart = () => {
  return (
    <div>
      <Switch>
        <Route path="/Smart" exact>
          <SmartList />
        </Route>
        <Route path="/Smart/Create">
          <SmartCreate />
        </Route>
        <Route path="/Smart/Update">
          <SmartUpdate />
        </Route>
      </Switch>
      <NavLink to="/Smart/Create">Smart Create</NavLink>
      <NavLink to="/Smart/Update">Smart Update</NavLink>
    </div>
  );
};

export default Smart;
