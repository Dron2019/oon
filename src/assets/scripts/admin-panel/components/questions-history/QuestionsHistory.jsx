import React from 'react';
import QuestionItem from './QuestionItem.jsx';
export default function(props) {
    return (
        <div className="question-history-wrapper">
            <div className="page-title text-violet uppercased">
                Історія запитань
            </div>
            <div className="question-item">
                <div className="question-item__head">
                    <div className="question-item__title">
                        На мене напав мій кіт. Що мені робити?
                    </div>
                    <div className="question-item__status await">
                        Немає відповіді
                    </div>
                    <div className="question-item__birdy"></div>
                </div>
                <div className="question-item__body"></div>
            </div>
            <div className="question-item new-answer">
                <div className="question-item__head">
                    <div className="question-item__title">
                        На мене напав мій кіт. Що мені робити?
                    </div>
                    <div className="question-item__status answered">
                        Отримано відповідь
                    </div>
                    <div className="question-item__birdy"></div>
                </div>
                <div className="question-item__body"></div>
            </div>
            <QuestionItem/>
        </div>
    )
}