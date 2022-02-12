import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css'
import Container from "./Container";

import GTable from "./Table";
import ActionButton from "./Container/ActionsButton";
import Fetch from "./Common/Fetch";
import {Chinese} from "./Common";
import {RangeTime} from "./Query/Time";

ReactDOM.render(
  <React.StrictMode>
      <Chinese>
          <Container>
              <RangeTime start="startTime" end="endTime" />
              <ActionButton components={["fetch"]} text="测试" />
              <GTable datasource="datasource">
                  <Fetch url="/list" name="fetch-list" responseName="datasource" component="fetch" />
                  {/*<Bind component="fetch" after="fetch-list" name="converter-list" executor={async ctx => ({datasource: ctx.response, response: undefined})} />*/}
              </GTable>
          </Container>
      </Chinese>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
