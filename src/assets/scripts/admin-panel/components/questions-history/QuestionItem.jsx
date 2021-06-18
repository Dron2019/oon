import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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
  } = props;

  const [firstRendered, setFirstRender] = useState(false);
  const [status, setStatus] = useState(+messStatus);
  const [dropdowned, setDropdown] = useState(false);
  const [renderWithoutForm, setFormView] = useState(props.noReply);
  console.log(messStatus, 'STATUS');
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    firstRendered !== false ? store.dispatch(getSingleConsultQuestion(id)) : null;
  }, [firstRendered]);
  useEffect(() => {
    if (messages !== undefined) {
      const lastItem = messages[messages.length - 1] || [];
      setStatus(+messStatus);
      // eslint-disable-next-line no-unused-expressions
      // (lastItem && lastItem.consultID === '0')
      //   ? setStatus('await')
      //   : setStatus('answered');
    }
  }, [messages]);


  const statuses = {
    answered: <div className="question-item__status answered">
                    Отримано відповідь
                </div>,
    0: <div className="question-item__status await">
                    Немає відповіді
                </div>,
    10: <div className="question-item__status closed">
                    Завершено
                </div>,
    new: <div className="question-item__status new">
                    Нова заявка
                </div>,
  };

  function setLayoutClassNames() {
    let output = `question-item ${props.userType}`;
    output += dropdowned ? ' opened' : '';
    output += status === 0 ? '' : ' new-answer';
    output += status === 10 ? ' closed' : '';

    return output;
  }

  function formMessageCallback(value) {
    // const newState = Array.from(messaging);
    // newState.push(value);
    // setMessaging(newState);
    const data = {
      request_id: id,
      userId: userID,
      message: value.message,
    };
    console.log(data);
    store.dispatch(sendSingleQuestion(data));
  }
  return (
            <div className={setLayoutClassNames()}>
                {props.userType === 'psycho'
                && <div className="question-item__user-info">
                    <p>Богдан</p>
                    <div className="question-item__date-wrapper">
                        <CalendarIcon/> 14.04.2021
                    </div>
                    <div className="question-item__date-wrapper">
                        <ClockIcon/>  17:34
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
                    {messages && messages.map((part, index) => (
                            <div key={index} className={`text question-item__single-mess ${part.consultID === '0' ? 'admin' : 'user'}`}>
                                <div className="question-item__single-mess-head">
                                    <span className="fw-600 question-item__single-mess-title">
                                        {part.name}
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
                    ))}
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
