import React from "react";
import "./App.css";
import { Tabs, Card } from "antd";
import { Products } from "./components/Products";
import { Packs } from "./components/Packs";

function App() {
  return (
    <Card title="Atualização de preços">
      <Tabs>
        <Tabs.TabPane tab="Tabela de Preços" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Pacotes" key="2">
          <Packs />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}

export default App;
