import React from 'react';
import './App.css';
import { NavView, nav, Page, Tabs, start, AppConfig } from 'tonva';
import { CApp } from './CApp';
import { jnkTop } from 'me/loginTop';
import { tvs } from 'tvs';

export const appConfig: AppConfig = {
  appName: "百灵威系统工程部/cart",
  version: "1.0.1",                   // 版本变化，缓存的uqs才会重载
  tvs: tvs,
  loginTop: jnkTop,
};

nav.setSettings(appConfig);

class App extends React.Component {
  private onLogined = async () => {
    await start(CApp, appConfig);
  }
  public render() {
    return <NavView onLogined={this.onLogined} notLogined={this.onLogined} />
  }
}

export default App;