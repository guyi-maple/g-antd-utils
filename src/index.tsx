import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css'
import Container from "./Container";

import GTable from "./Table";
import ActionButton from "./Container/ActionsButton";
import Bind from "./Container/Bind";

ReactDOM.render(
  <React.StrictMode>
      <Container>
          <GTable datasource="datasource">
              <ActionButton components={["fetch"]} text="测试" />
          </GTable>
          <Bind component="fetch" name="fetch" executor={() => ({datasource: [{id: Math.random()}]})} />
      </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
