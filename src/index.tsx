import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css'
import Container from "./Container";
import Bind from "./Container/Bind";
import Component from "./Container/Component";
import ActionButton from "./Container/ActionsButton";
import Action from "./Container/Action";

import {BorderOuterOutlined} from '@ant-design/icons'

ReactDOM.render(
  <React.StrictMode>
      <Container>
          <Component name="test" />
          <Bind component="test" name="one" before="san" executor={() => ({name: Math.random()})} />
          <Bind component="test" name="two" after="san" executor={() => ({text: Math.random()})} />
          <Bind component="test" name="san" executor={() => ({over: Math.random()})} />
          <Action>
              <ActionButton component="test" icon={<BorderOuterOutlined />} />
          </Action>
      </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
