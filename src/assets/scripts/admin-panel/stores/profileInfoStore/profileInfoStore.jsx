import * as Yup from 'yup';
import {
  GET_PROFILE_DATA,
  SEND_PROFILE_DATA,
  SET_PROFILE_DATA,
} from '../dispatchActions.jsx';


const initState = [
  {
    title: 'Ім`я:',
    name: 'name',
    initialValue: '',
    requiredClass: 'required',
    validationSchema: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  },
  {
    title: 'По батькові:',
    name: 'fatherName',
    initialValue: '',
    requiredClass: 'required',
    validationSchema: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  },
  {
    title: 'Прізвище',
    name: 'surname',
    initialValue: '',
    requiredClass: 'required',
    validationSchema: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  },
  {
    title: 'E-mail:',
    name: 'email',
    initialValue: '',
    requiredClass: 'required',
    validationSchema: Yup.string().email('Invalid email').required('Required'),
  },
  {
    title: 'Телефон:',
    name: 'tel',
    initialValue: '',
    requiredClass: 'required',
    validationSchema: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  },
  {
    type: 'password',
    title: 'Пароль',
    name: 'password',
    initialValue: '',
    requiredClass: 'required',
    validationSchema: Yup
      .string()
      .required('Enter password'),
  },
  {
    type: 'password',
    title: 'Підтвердження паролю',
    name: 'confirmPassword',
    initialValue: '',
    requiredClass: 'required',
    validationSchema: Yup
      .string()
      .required('Confirm password')
      .when('password', {
        is: password => ((password && password.length) > 0),
        then: Yup.string().oneOf([Yup.ref('password')], "Password doesn't match"),
      }),
  },
];

export default function profileInfoReducers(state = initState, action) {
  switch (action.type) {
    case GET_PROFILE_DATA:
      return state;
    //   break;
    case SEND_PROFILE_DATA:
      return state;
    //   break;
    case SET_PROFILE_DATA:
      return action.payload;
    //   break;
    default:
      break;
  }
  return state;
}
