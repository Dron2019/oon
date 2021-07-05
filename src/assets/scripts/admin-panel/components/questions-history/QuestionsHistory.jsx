import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import QuestionItem from './QuestionItem.jsx';
import EmptyQuestions from '../EmptyQuestions/EmptyQuestion.jsx';
import store from '../../stores/userDataStore/index.jsx';
import { getConsultQuestions } from '../../stores/consultQuestionsStore/consult-questions-actions.jsx';

export default function QuestionsHistory(props) {
  const errorMessage = useSelector(state => state.loginStatusReducer.error);
  const messages = useSelector(state => state.consultQuestionsStore);
  const userID = useSelector(state => state.loginStatusReducer.id);
  const userType = useSelector(state => state.loginStatusReducer.role);
  const formMessageColor = useSelector(state => state.messageStatusStore);
  const messageColors = ['green', 'orange'];
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
            {messages.length === 0 && <EmptyQuestions/>}
            {errorMessage && <div className="el-for-alerts" style={
              { backgroundColor: messageColors[formMessageColor] }
            }>
              {errorMessage}
            </div>}
        </div>
  );
}
