import React from 'react';
import QuestionItem from './QuestionItem.jsx';


export default function(props) {
    return (
        <div className="question-history-wrapper">
            <div className="page-title text-violet uppercased">
                Історія запитань
            </div>
            <QuestionItem/>
            <QuestionItem history={[
                {time:'14:20', date: '03.18.2021', name:'Консультант Марина', side:'admin', mess: 'Hello' },
                {time:'15:55', date: '03.18.2021', name:'Сергій', side:'client', mess: 'Hello you too' },
            ]}/>
        </div>
    )
}