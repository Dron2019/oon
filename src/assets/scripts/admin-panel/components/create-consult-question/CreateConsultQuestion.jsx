import React from 'react';
import { Formik, Field,Form,FormikProps  } from 'formik';
import {Link, useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import routes from '../../routes/routes.jsx';


import WorkConsultation from '../work-consultation/WorkConsultation.jsx';
export default function(props) {
    return (
        <>
            <div className="page-title text-violet uppercased">
                Створити запитання
            </div>
            <WorkConsultation title={false}/>
        </>
    )
}