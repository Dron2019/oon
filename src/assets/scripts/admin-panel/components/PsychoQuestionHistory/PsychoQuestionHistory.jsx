import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import store from '../../stores/userDataStore/index.jsx';
import {
  getPsychoQuestions,
  getSinglePsychConsultQuestion,
  closePsychQuestion,
  recoverPsychConversation,
  sendSinglePsychQuestion,
} from '../../stores/psychoQuestionsStore/actions_psychoQuestionsStore.jsx';
import QuestionItem from '../questions-history/QuestionItem.jsx';
import EmptyQuestions from '../EmptyQuestions/EmptyQuestion.jsx';

export default function PsychoQuestionHistory() {
  const errorMessage = useSelector(state => state.loginStatusReducer.error);
  const messages = useSelector(state => state.psychoQuestionsStore);
  const userID = useSelector(state => state.loginStatusReducer.id);
  const userType = useSelector(state => state.loginStatusReducer.role);
  console.log(messages);
  useEffect(() => {
    store.dispatch(getPsychoQuestions());
  }, []);

  return (
    <div className="psych-questions-wrapper">
      <div className="page-title text-violet">Історія запитань</div>
      {messages.map((message, index) => (
          <QuestionItem
          getSinglePsychConsultQuestion={getSinglePsychConsultQuestion}
          sendSinglePsychQuestion={sendSinglePsychQuestion}
            closePsychQuestion={closePsychQuestion}
            recoverPsychConversation={recoverPsychConversation}
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
