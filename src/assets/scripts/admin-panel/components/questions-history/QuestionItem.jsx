/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import Linkify from 'react-linkify';
import { useSelector } from 'react-redux';

import { CalendarIcon, ClockIcon, UserIcon } from '../icons/Icons.jsx';
import QuestionItemForm from './QuestionItemForm.jsx';
import UserInfoTooltip from '../userInfoTooltip/UserInfoTooltip.jsx';
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
    hideForm,
    showUserInfoIcon,
    anonymous
  } = props;

  const errorMessage = useSelector(state => state.loginStatusReducer.error);
  const ref1 = useRef(null);
  const timeLine = useRef(null);

  const [firstRendered, setFirstRender] = useState(false);
  const [statusOfMessage, setStatus] = useState(+status);
  const [dropdowned, setDropdown] = useState(false);
  const [isRead, setIsRead] = useState(true);
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    if (firstRendered !== false) {
      if (props.getSingleOnlineConsultQuestion) {
        store.dispatch(props.getSingleOnlineConsultQuestion(id));
      } else if (props.getSinglePsychConsultQuestion) {
        store.dispatch(props.getSinglePsychConsultQuestion(id));
      } else if (props.getSingleFaqQuestion) {
        store.dispatch(props.getSingleFaqQuestion(id));
      } else {
        store.dispatch(getSingleConsultQuestion(id));
      }
    }
    // firstRendered !== false ?  : null;
  }, [firstRendered]);
  useEffect(() => {
    if (messages !== undefined) {
      const lastItem = messages[messages.length - 1] || [];
      setStatus(+status);
    }
  }, [messages]);

  useEffect(() => {
    gsap.fromTo('.question-item', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 });
    console.log(props.anonymous, 'ANNNNNN');
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
    output += props.userType !== 'consult' ? 'no-title' : '';

    return output;
  }
  function getUserInfo() {
    const {age, childs, education, email, familyStatus, fathername_r, mainphone, name_r, surname_r} = props;
    const array = {age, childs, education, email, familyStatus, fathername_r, mainphone, name_r, surname_r};
    return array;
  }
  function formMessageCallback(value) {
    const data = {
      request_id: id,
      userId: userID,
      message: value.message,
    };
    if (props.sendSingleOnlineConsultQuestion) {
      store.dispatch(props.sendSingleOnlineConsultQuestion(data));
    } else if (props.sendSinglePsychQuestion) {
      store.dispatch(props.sendSinglePsychQuestion(data));
    } else {
      store.dispatch(sendSingleQuestion(data));
    }
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

                    
                    {showUserInfoIcon && anonymous === '0' &&
                      <>
                        <UserIcon clickable data-tip={getUserInfo()}/>
                        <UserInfoTooltip data={getUserInfo()} />
                      </>
                    }
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
                                  <Linkify
                                    componentDecorator={(decoratedHref, decoratedText, key) => (
                                        <a target="blank" href={decoratedHref} key={key}>
                                          {decoratedText}
                                        </a>
                                    )}>{part.text}</Linkify>
                                </div>
                            </div>
                        );
                      }
                      if (part.questType === 'faq_admin') {
                        return (
                          <div key={index} className={`text question-item__single-mess ${index === 0 ? 'admin' : 'client'}`}>
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
                            >
                                <Linkify
                                  componentDecorator={(decoratedHref, decoratedText, key) => (
                                      <a target="blank" href={decoratedHref} key={key}>
                                        {decoratedText}
                                      </a>
                                  )}>{part.text}</Linkify>
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
                                    >
                                    <Linkify
                                      componentDecorator={(decoratedHref, decoratedText, key) => (
                                          <a target="blank" href={decoratedHref} key={key}>
                                            {decoratedText}
                                          </a>
                                      )}>{part.text}</Linkify>
                                </div>

                            </div>
                      );
                    })}
                    {statusOfMessage !== 10 && !hideForm
                        && <div className="gray-bg-element">
                            <QuestionItemForm
                                errorMessage={errorMessage}
                                closeQuestion={() => {
                                  if (props.closeOnlineConsultQuestion) {
                                    store.dispatch(props.closeOnlineConsultQuestion(id));
                                  } else if (props.closePsychQuestion) {
                                    store.dispatch(props.closePsychQuestion(id));
                                  } else {
                                    store.dispatch(closeConsultQuestion(id));
                                  }
                                }}
                                userType={props.userType}
                                callback={formMessageCallback}/>
                        </div>
                    }
                    {statusOfMessage === 10 && <div onClick={() => {
                      if (props.recoverOnlineConsultConversation) {
                        store.dispatch(props.recoverOnlineConsultConversation(id));
                      } else if (props.recoverPsychConversation) {
                        store.dispatch(props.recoverPsychConversation(id));
                      } else {
                        store.dispatch(recoverConversation(id));
                      }
                    }} className="  mt-10 button-std button-std--violet small restore-dialog-button">Відновити діалог</div>
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
