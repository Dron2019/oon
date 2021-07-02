import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { Link } from 'react-router-dom';
import RegisterWorkerForm from '../forms/register-worker/RegisterWorkerForm.jsx';
import RegisterConsultantForm from '../forms/register-consult/RegisterConsultantForm.jsx';

export default () => {
  const [synamicSubtitle, setDynamicSubtitle] = useState('користувачa');
  return (<div className="login-form">
                <div className="page-title text-violet" style={{ marginBottom: 0 }}>Мій кабінет</div>
                <div className="white-bg-element">
                    <Tabs>
                    <div className="login-tabs-head">
                        <div className="subtitle text-violet fw-600">Ви реєструєтесь як</div>
                        <TabList>
                            <Tab onClick={() => setDynamicSubtitle('користувачa')} >Користувач</Tab>
                            <Tab onClick={() => setDynamicSubtitle('соціального працівника')} >Соціальний працівник</Tab>
                        </TabList>
                        <div className="subtitle-small text-violet">Реєстрація {synamicSubtitle}</div>
                    </div>
                    <TabPanel>
                        <RegisterWorkerForm></RegisterWorkerForm>
                    </TabPanel>
                    <TabPanel>
                        <RegisterConsultantForm/>
                    </TabPanel>
                    </Tabs>
                </div>
                <div className="white-bg-element">
                    <Link to="/login" className="button-std button-std--violet small transparent "> Ви вже зарєстровані</Link>
                </div>
            </div>
  );
};
