/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';


import { CalendarIcon, ClockIcon } from '../icons/Icons.jsx';
import QuestionItemForm from './QuestionItemForm.jsx';
import store from '../../stores/userDataStore/index.jsx';
import {
  getSingleConsultQuestion,
  sendSingleQuestion,
  closeConsultQuestion,
  recoverConversation,
} from '../../stores/consultQuestionsStore/consult-questions-actions.jsx';

export default function QuestionItem(props) {
  const {
    id,
    messages,
    userID,
    status,
    request_date,
    request_time,
    fName,
    consultName,
    userName,
    userType,
    is_read,
  } = props;


  const ref1 = useRef(null);
  const timeLine = useRef(null);

  const [firstRendered, setFirstRender] = useState(false);
  const [statusOfMessage, setStatus] = useState(+status);
  const [dropdowned, setDropdown] = useState(false);
  const [isRead, setIsRead] = useState(true);
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    firstRendered !== false ? store.dispatch(getSingleConsultQuestion(id)) : null;
  }, [firstRendered]);
  useEffect(() => {
    if (messages !== undefined) {
      const lastItem = messages[messages.length - 1] || [];
      setStatus(+status);
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
    3: <div className="question-item__status await">
                    Немає відповіді
                </div>,
  };
  const consultStatuses = {
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
                    Надіслано відповідь
                </div>,
    10: <div className="question-item__status closed">
                    Завершено
                </div>,
    3: <div className="question-item__status await">
                    Чекає відповіді
                </div>,
  };

  function setLayoutClassNames() {
    let output = `question-item ${props.userType}`;
    output += dropdowned ? ' opened' : '';
    output += status === 0 ? ' new-answer' : ' ';
    output += status === 1 ? ' await' : ' ';
    output += status === 10 ? ' closed' : '';
    output += status === 2 ? ' new-answer' : '';
    output += status === 3 ? '  answered' : '';
    output += (+is_read === 0 && props.userType !== 'consult') ? 'new-answer' : '';

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
            <div data-is_read={is_read} ref={ref1} className={setLayoutClassNames()}>
                {props.userType === 'consult'
                && <div className="question-item__user-info">
                    <p> {consultName || userName}</p>
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
                    {props.userType === 'consult' ? consultStatuses[statusOfMessage] : statuses[statusOfMessage]}
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
                                        {part.consultID === '0' ? userName : consultName}
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
                      }
                      return (
                        <div key={index} className={`text question-item__single-mess ${part.consultID === '0' ? 'admin' : 'client'}`}>
                                <div className="question-item__single-mess-head">
                                    <span className="fw-600 question-item__single-mess-title">
                                        {part.consultID === '0' ? userName : consultName}
                                    </span>
                                    <div className="question-item__date-wrapper">
                                        <CalendarIcon/> {part.request_date}
                                    </div>
                                    <div className="question-item__date-wrapper">
                                        <ClockIcon/>  {part.request_time}
                                    </div>
                                </div>
                                <div className="question-item__single-mess-text"
                                    dangerouslySetInnerHTML={{ __html: part.text.replace(/\b(https?\:\/\/\S+)/mg, '<a target="_blank" href="$1">$1</a>') }}>
                                    {/* {part.text.replace(
                                      /\b(https?\:\/\/\S+)/mg,
                                      '<a href="$1">$1</a>'
                                    )} */}
                                </div>

                            </div>
                      );
                    })}
                    {statusOfMessage !== 10
                        && <div className="gray-bg-element">
                            <QuestionItemForm
                                closeQuestion={() => store.dispatch(closeConsultQuestion(id)) }
                                userType={props.userType}
                                callback={formMessageCallback}/>
                        </div>
                    }
                    {statusOfMessage === 10 && <div onClick={() => {
                      store.dispatch(recoverConversation(id));
                    }} className="  mt-10 button-std button-std--violet small">Відновити діалог</div>
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
