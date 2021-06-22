/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';


import { CalendarIcon, ClockIcon } from '../icons/Icons.jsx';
import QuestionItemForm from './QuestionItemForm.jsx';
import store from '../../stores/userDataStore/index.jsx';
import { getSingleConsultQuestion, sendSingleQuestion, closeConsultQuestion } from '../../stores/consultQuestionsStore/consult-questions-actions.jsx';

export default function QuestionItem(props) {
  const {
    id,
    messages,
    userID,
    status: messStatus,
    request_date,
    request_time,
    fName,
    concultName,
    userName,
    userType,
  } = props;


  const ref1 = useRef(null);
  const timeLine = useRef(null);

  const [firstRendered, setFirstRender] = useState(false);
  const [status, setStatus] = useState(+messStatus);
  const [dropdowned, setDropdown] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    firstRendered !== false ? store.dispatch(getSingleConsultQuestion(id)) : null;
  }, [firstRendered]);
  useEffect(() => {
    if (messages !== undefined) {
      const lastItem = messages[messages.length - 1] || [];
      setStatus(+messStatus);
    }
  }, [messages]);

  useEffect(() => {
    gsap.fromTo('.question-item', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 });
  }, []);

  const statuses = {
    answered: <div className="question-item__status answered">
                    Отримано відповідь
                </div>,
    0: <div className="question-item__status answered">
                    Нова заявка
                </div>,
    1: <div className="question-item__status await">
                    Немає відповіді
                </div>,
    2: <div className="question-item__status answered">
                    Отримано відповідь
                </div>,
    10: <div className="question-item__status closed">
                    Завершено
                </div>,
    3: <div className="question-item__status answered">
                    Повторна відповідь
                </div>,
  };

  function setLayoutClassNames() {
    let output = `question-item ${props.userType}`;
    output += dropdowned ? ' opened' : '';
    output += status === 0 ? ' new-answer' : ' ';
    output += status === 1 ? ' await' : ' ';
    output += status === 10 ? ' closed' : '';
    output += status === 3 ? '  answered' : '';

    return output;
  }

  function formMessageCallback(value) {
    const data = {
      request_id: id,
      userId: userID,
      message: value.message,
    };
    store.dispatch(sendSingleQuestion(data));
  }
  return (
            <div ref={ref1} className={setLayoutClassNames()}>
                {props.userType === 'psycho'
                && <div className="question-item__user-info">
                    <p> {concultName || userName}</p>
                    <div className="question-item__date-wrapper">
                        <CalendarIcon/> {request_date}
                    </div>
                    <div className="question-item__date-wrapper">
                        <ClockIcon/> {request_time}
                    </div>
                  </div>
                }
                <div
                    className="question-item__head"
                    onClick={() => {
                      setDropdown(!dropdowned);
                      // eslint-disable-next-line no-unused-expressions
                      firstRendered === false ? setFirstRender(true) : null;
                    }}>
                    <div className="question-item__title">
                        {props.title}
                    </div>
                    {statuses[status]}
                    <div
                        className="question-item__birdy"
                    >
                    </div>
                </div>
                <div className="question-item__body">
                    {messages && messages.map((part, index) => {
                      if (userType === 'consult') {
                        return (
                          <div key={index} className={`text question-item__single-mess ${part.consultID === '0' ? 'client' : 'admin'}`}>
                                <div className="question-item__single-mess-head">
                                    <span className="fw-600 question-item__single-mess-title">
                                        {part.consultID === '0' ? userName : concultName}
                                    </span>
                                    <div className="question-item__date-wrapper">
                                        <CalendarIcon/> {part.request_date}
                                    </div>
                                    <div className="question-item__date-wrapper">
                                        <ClockIcon/>  {part.request_time}
                                    </div>
                                </div>
                                <div className="question-item__single-mess-text">
                                    {part.text}
                                </div>

                            </div>
                        )
                      }
                      return (
                        <div key={index} className={`text question-item__single-mess ${part.consultID === '0' ? 'admin' : 'client'}`}>
                                <div className="question-item__single-mess-head">
                                    <span className="fw-600 question-item__single-mess-title">
                                        {part.consultID === '0' ? userName : concultName}
                                    </span>
                                    <div className="question-item__date-wrapper">
                                        <CalendarIcon/> {part.request_date}
                                    </div>
                                    <div className="question-item__date-wrapper">
                                        <ClockIcon/>  {part.request_time}
                                    </div>
                                </div>
                                <div className="question-item__single-mess-text">
                                    {part.text}
                                </div>

                            </div>
                      );
                    })}
                    {status !== 10
                        && <div className="gray-bg-element">
                            <QuestionItemForm
                                closeQuestion={() => store.dispatch(closeConsultQuestion(id)) }
                                userType={props.userType}
                                callback={formMessageCallback}/>
                        </div>
                    }
                </div>
            </div>
  );
}


QuestionItem.propTypes = {
  userType: PropTypes.string,
  history: PropTypes.array,
  callback: PropTypes.func,
};
