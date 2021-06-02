import React, { useState } from 'react';

import { CalendarIcon, ClockIcon } from '../icons/Icons.jsx';
import QuestionItemForm from './QuestionItemForm.jsx';

export default function (props) {
  const [status, setStatus] = useState('closed');
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
  };

  function setLayoutClassNames() {
    let output = 'question-item';
    output += dropdowned ? ' opened' : null;
    output += status === 'await' ? null : ' new-answer';
    output += status === 'closed' ? ' closed' : null;

    return output;
  }

  function formMessageCallback(value) {
    const newState = Array.from(messaging);
    newState.push(value);
    setMessaging(newState);
  }
  return (
            <div className={setLayoutClassNames()}>
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
                                messagesHistory={messaging}
                                callback={formMessageCallback}/>
                        </div>
                    }
                </div>
            </div>
  );
}
