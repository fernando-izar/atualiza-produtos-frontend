import React, { useState } from "react";
import "./App.css";
import { Tabs, Card } from "antd";
import { Products } from "./components/Products";
import { Packs } from "./components/Packs";

function App() {
  const [key, setKey] = useState("1");

  return (
    <Card title="Atualização de preços">
      <Tabs onChange={(key) => setKey(key)}>
        <Tabs.TabPane tab="Tabela de Preços" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Pacotes" key="2">
          <Packs key={key} />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}

export default App;
