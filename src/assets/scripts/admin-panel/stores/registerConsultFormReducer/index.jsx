import GET_CONSULT_REGISTER_FIELDS from '../dispatchActions.jsx';
import * as Yup from 'yup';
const registerInputs = [
    {title:'Ім`я:',name:'name', initialValue: '', requiredClass: 'required', 
        validationSchema: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    },
    {title:'По батькові:',name:'fatherName',initialValue: '', requiredClass: 'required',
        validationSchema: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    },
    {
        title:'Прізвище',name:'surname',initialValue: '', requiredClass: 'required',
        validationSchema: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    },
    {   
        title:'E-mail:',name:'email',initialValue: '', requiredClass: 'required',
        validationSchema: Yup.string().email('Invalid email').required('Required'),
    },
    {title:'Телефон:',name:'tel',initialValue: '', requiredClass: 'required',
        validationSchema: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    },
    {type: 'password',title:'Пароль',name:'password',initialValue: '', requiredClass: 'required',
        validationSchema: Yup
            .string()
            .required("Enter password"),
    },
    {type: 'password',title:'Підтвердження паролю',name:'confirmPassword', initialValue: '', requiredClass: 'required',
        validationSchema:  Yup
            .string()
            .required("Confirm password")
            .when("password", {
                is: password => (password && password.length > 0 ? true : false),
                then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match")
                })
    },
];

export default function registerConsultFormReducer(state = registerInputs, action) {
    switch (action.type) {
        case GET_CONSULT_REGISTER_FIELDS:
        return state;
    }
    return state;
}