import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Link} from 'react-router-dom';
import RegisterWorkerForm from '../forms/register-worker/RegisterWorkerForm.jsx';
import RegisterClientForm from '../forms/register-client/RegisterClientForm.jsx';
export default () => (
    <div className="login-form">
        <div className="white-bg-element">
            <Tabs>
                <div className="subtitle text-violet">Ви реєструєтесь як</div>
            <TabList>
                <Tab>Користувач</Tab>
                <Tab>Соціальний працівник</Tab>
            </TabList>
        
            <TabPanel>
                <RegisterClientForm/>
            </TabPanel>
            <TabPanel>
                <RegisterWorkerForm></RegisterWorkerForm>
            </TabPanel>
            </Tabs>
        </div>
        <div className="white-bg-element">
            <Link to="/login" className="button-std button-std--violet"> Ви вже зарєстровані</Link>
        </div>
    </div>
  );