import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import QuestionItem from './QuestionItem.jsx';
import ErrorMessage from '../error-message/ErrorMessage.jsx';
import store from '../../stores/userDataStore/index.jsx';
import { getConsultQuestions } from '../../stores/consultQuestionsStore/consult-questions-actions.jsx';

export default function QuestionsHistory(props) {
  const errorMessage = useSelector(state => state.loginStatusReducer.error);
  const messages = useSelector(state => state.consultQuestionsStore);
  const userID = useSelector(state => state.loginStatusReducer.id);
  console.log(messages);
  const userType = 'psycho';
  useEffect(() => {
    store.dispatch(getConsultQuestions());
  }, []);
  return (
        <div className="question-history-wrapper">
            <div className="page-title text-violet uppercased">
                Історія запитань
            </div>
            {messages.map((message, index) => (
              <QuestionItem key={index} {...message} userID={userID} userType={userType}/>
            ))}
            {/* <QuestionItem userType={userType}/>
            <QuestionItem userType={userType} history={[
              {
                time: '14:20', date: '03.18.2021', name:
                'Консультант Марина', side: 'admin', mess: 'Hello',
              },
              {
                time: '15:55', date: '03.18.2021',
                name: 'Сергій', side: 'client', mess: 'Hello you too',
              },
            ]}/> */}
            {errorMessage && <div className="el-for-alerts">{errorMessage}</div>}
        </div>
  );
}
