import React, {useState} from 'react';

import {CalendarIcon, ClockIcon} from '../icons/Icons.jsx';
import QuestionItemForm from './QuestionItemForm.jsx';
export default function(props) {
    let [status, setStatus] = useState('answered');
    let [dropdowned, setDropdown] = useState(true);

    let [messaging, setMessaging] = useState([
        {time:'14:20', date: '03.18.2021', name:'Консультант Марина', side:'admin', mess: 'Hello' },
        {time:'15:55', date: '03.18.2021', name:'Сергій', side:'client', mess: 'Hello you too' },
        {time:'16:05', date: '03.18.2021', name:'Консультант Марина', side:'admin', mess: 'How are you?' },
        {time:'17:29', date: '03.18.2021', name:'Сергій', side:'client', mess: 'I`m fine, thank you. Have a nice day' },
        {time:'18:03', date: '03.18.2021', name:'Консультант Марина', side:'admin', mess: 'Thank you, you too' },
    ]);
    let statuses = {
        answered: <div className="question-item__status answered">
                    Отримано відповідь
                </div>,
        await: <div className="question-item__status await">
                    Немає відповіді
                </div>,
    }
    // let messaging = [
    //     {time:'14:20', date: '03.18.2021', name:'Консультант Марина', side:'admin', mess: 'Hello' },
    //     {time:'15:55', date: '03.18.2021', name:'Сергій', side:'client', mess: 'Hello you too' },
    //     {time:'16:05', date: '03.18.2021', name:'Консультант Марина', side:'admin', mess: 'How are you?' },
    //     {time:'17:29', date: '03.18.2021', name:'Сергій', side:'client', mess: 'I`m fine, thank you. Have a nice day' },
    //     {time:'18:03', date: '03.18.2021', name:'Консультант Марина', side:'admin', mess: 'Thank you, you too' },
    // ]


    function setLayoutClassNames(){
        let output = 'question-item';
        dropdowned ? output+= ' opened' : null;
        status === 'await' ? null : output+= ' new-answer';
        return output; 
    }

    function formMessageCallback(value) {
        let newState = Array.from(messaging);
        newState.push(value); 
        setMessaging(newState);
        console.log(value);
    }
    return (
            <div className={setLayoutClassNames()}>
                <div 
                    className="question-item__head" 
                    onClick={()=> setDropdown(!dropdowned)}>
                    
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
                    {messaging.map(part=>{
                        return (
                            <div className={'text question-item__single-mess ' + part.side}>
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
                        )
                    })}
                    <div className="gray-bg-element">
                        <QuestionItemForm 
                            messagesHistory={messaging} 
                            callback={formMessageCallback}/>
                    </div>
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