import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { CalendarIcon, ClockIcon } from '../icons/Icons.jsx';
import QuestionItemForm from './QuestionItemForm.jsx';

export default function QuestionItem(props) {
  const [status, setStatus] = useState('await');
  const [dropdowned, setDropdown] = useState(false);
  const [renderWithoutForm, setFormView] = useState(props.noReply);
  const initMessages = props.history || [
    {
      time: '14:20', date: '03.18.2021', name: 'Консультант Марина', side: 'admin', mess: 'Hello',
    },
    {
      time: '15:55', date: '03.18.2021', name: 'Сергій', side: 'client', mess: 'Hello you too',
    },
    {
      time: '16:05', date: '03.18.2021', name: 'Консультант Марина', side: 'admin', mess: 'How are you?',
    },
    {
      time: '17:29', date: '03.18.2021', name: 'Сергій', side: 'client', mess: 'I`m fine, thank you. Have a nice day',
    },
    {
      time: '18:03', date: '03.18.2021', name: 'Консультант Марина', side: 'admin', mess: 'Thank you, you too',
    },
  ];
  const [messaging, setMessaging] = useState(initMessages);
  const statuses = {
    answered: <div className="question-item__status answered">
                    Отримано відповідь
                </div>,
    await: <div className="question-item__status await">
                    Немає відповіді
                </div>,
    closed: <div className="question-item__status closed">
                    Завершено
                </div>,
    new: <div className="question-item__status new">
                    Нова заявка
                </div>,
  };

  function setLayoutClassNames() {
    let output = `question-item ${props.userType}`;
    output += dropdowned ? ' opened' : '';
    output += status === 'await' ? '' : ' new-answer';
    output += status === 'closed' ? ' closed' : '';

    return output;
  }

  function formMessageCallback(value) {
    const newState = Array.from(messaging);
    newState.push(value);
    setMessaging(newState);
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
                <input type="radio" onChange={evt => setStatus(evt.target.value)} name="test-status-switch" value="closed" />
                <input type="radio" onChange={evt => setStatus(evt.target.value)} name="test-status-switch" value="new-answer" />
                <input type="radio" onChange={evt => setStatus(evt.target.value)} name="test-status-switch" value="await" />
                <div
                    className="question-item__head"
                    onClick={() => setDropdown(!dropdowned)}>

                    <div className="question-item__title">
                        На мене напав мій кіт. Що мені робити?
                    </div>
                    {statuses[status]}
                    <div
                        className="question-item__birdy"
                    >
                    </div>
                </div>
                <div className="question-item__body">
                    {messaging.map(part => (
                            <div className={`text question-item__single-mess ${part.side}`}>
                                <div className="question-item__single-mess-head">
                                    <span className="fw-600 question-item__single-mess-title">
                                        {part.name}
                                    </span>
                                    <div className="question-item__date-wrapper">
                                        <CalendarIcon/> {part.date}
                                    </div>
                                    <div className="question-item__date-wrapper">
                                        <ClockIcon/>  {part.time}
                                    </div>
                                </div>
                                <div className="question-item__single-mess-text">
                                    {part.mess}
                                </div>

                            </div>
                    ))}
                    {!renderWithoutForm
                        && <div className="gray-bg-element">
                            <QuestionItemForm
                                userType={props.userType}
                                messagesHistory={messaging}
                                callback={formMessageCallback}/>
                        </div>
                    }
                </div>
            </div>
  );
}


QuestionItem.PropTypes = {
  userType: PropTypes.string,
  history: PropTypes.array,
  callback: PropTypes.func,
};
