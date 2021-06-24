import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import store from '../../stores/userDataStore/index.jsx';

import QuestionItem from '../questions-history/QuestionItem.jsx';
import EmptyQuestions from '../EmptyQuestions/EmptyQuestion.jsx';
import { getOnlineConsultQuestions, getSingleOnlineConsultQuestion, sendSingleOnlineConsultQuestion } from '../../stores/onlineConsultQuestionsStore/actions_onlineConsultQuestionsStore.jsx';

export default function OnlineConsultQuestionsHistory() {
  const errorMessage = useSelector(state => state.loginStatusReducer.error);
  const messages = useSelector(state => state.onlineConsultQuestionsStore);
  const userID = useSelector(state => state.loginStatusReducer.id);
  const userType = useSelector(state => state.loginStatusReducer.role);
  useEffect(() => {
    store.dispatch(getOnlineConsultQuestions());
  }, []);
  return (
    <div className="question-history-wrapper">
        <div className="page-title text-violet uppercased">
            Історія запитань
        </div>
        {messages.map((message, index) => (
          <QuestionItem
            getSingleOnlineConsultQuestion={getSingleOnlineConsultQuestion}
            sendSingleOnlineConsultQuestion={sendSingleOnlineConsultQuestion}
            key={index}
            {...message}
            userID={userID}
            userType={userType}/>
        ))}
        {messages.length === 0 && <EmptyQuestions/>}
        {errorMessage && <div className="el-for-alerts">{errorMessage}</div>}
    </div>
  );
}
