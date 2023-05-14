import React from "react";
import "./App.css";
import { Tabs } from "antd";
import { Products } from "./components/Products";

function App() {
  return (
    <Tabs>
      <Tabs.TabPane tab="Produtos" key="1">
        <Products />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Pacotes" key="2">
        Content of Tab Pane 2
      </Tabs.TabPane>
    </Tabs>
  );
}

export default App;
