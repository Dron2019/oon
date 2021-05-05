import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Link} from 'react-router-dom';
import RegisterWorkerForm from '../forms/register-worker/RegisterWorkerForm.jsx';
import RegisterConsultantForm from '../forms/register-consult/RegisterConsultantForm.jsx';
export default () => (
    <div className="login-form">
        <div className="white-bg-element">
            <Tabs>
            <div className="login-tabs-head">
                <div className="subtitle text-violet fw-600">Ви реєструєтесь як</div>
                <TabList>
                    <Tab>Користувач</Tab>
                    <Tab>Соціальний працівник</Tab>
                </TabList>
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
            <Link to="/login" className="button-std button-std--violet small"> Ви вже зарєстровані</Link>
        </div>
    </div>
  );