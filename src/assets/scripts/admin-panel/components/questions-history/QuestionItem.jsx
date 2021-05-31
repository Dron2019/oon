import React, {useState} from 'react';

import {CalendarIcon, ClockIcon} from '../icons/Icons.jsx';

export default function(props) {
    let [status, setStatus] = useState('');
    let [dropdowned, setDropdown] = useState(false);
    let statuses = {
        answered: 'answered',
        await: 'await',
    }
    let messaging = [
        {time:'14:20', date: '03.18.2021', name:'Консультант Марина', side:'admin', mess: 'Hello' },
        {time:'15:55', date: '03.18.2021', name:'Сергій', side:'client', mess: 'Hello you too' },
        {time:'16:05', date: '03.18.2021', name:'Консультант Марина', side:'admin', mess: 'How are you?' },
        {time:'17:29', date: '03.18.2021', name:'Сергій', side:'client', mess: 'I`m fine, thank you. Have a nice day' },
        {time:'18:03', date: '03.18.2021', name:'Консультант Марина', side:'admin', mess: 'Thank you, you too' },
    ]
    return (
            <div className={dropdowned ? 'question-item opened' : 'question-item'}>
                <div 
                    className="question-item__head" 
                    onClick={()=> setDropdown(!dropdowned)}>
                    <div className="question-item__title">
                        На мене напав мій кіт. Що мені робити?
                    </div>
                    <div className="question-item__status await">
                        Немає відповіді
                    </div>
                    <div 
                        className="question-item__birdy"
                    >

                    </div>
                </div>
                <div className="question-item__body">
                    {messaging.map(part=>{
                        return (
                            <div className={'text question-item__single-mess ' + part.side}>
                                <div className="question-item__single-mess-head">
                                    <span className="fw-600">
                                        {part.name}
                                    </span>
                                    <CalendarIcon/> {part.date} 
                                    <ClockIcon/>  {part.time}
                                </div>
                                <div className="question-item__single-mess-text">
                                    {part.mess} 
                                </div>
                                
                            </div>
                        )
                    })}
                </div>
            </div>
            // <div className="question-item new-answer">
            //     <div className="question-item__head">
            //         <div className="question-item__title">
            //             На мене напав мій кіт. Що мені робити?
            //         </div>
            //         <div className="question-item__status answered">
            //             Отримано відповідь
            //         </div>
            //         <div className="question-item__birdy"></div>
            //     </div>
            //     <div className="question-item__body"></div>
            // </div>
    )
}