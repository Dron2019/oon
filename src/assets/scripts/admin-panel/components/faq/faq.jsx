/* exported */
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import QuestionItem from '../questions-history/QuestionItem.jsx';
import 'react-accessible-accordion/dist/fancy-example.css';

function getFaqQuestions() {
  return [
    { title: 'Як записатися на вебінар?', content: 'Домашнє та гендерно зумовлене насильство - проблема, з якою стикається надто багато людей в нашій країні. Фонд ООН у галузі народонаселення разом із партнерами створив кампанію “Розірви коло”, яка вже багато років допомагає усім, хто постраждав від насильства, отримати інформацію та розірвати це коло. ' },
    { title: 'Консультант не коректно відповідає', content: 'Домашнє та гендерно зумовлене насильство - проблема, з якою стикається надто багато людей в нашій країні. Фонд ООН у галузі народонаселення разом із партнерами створив кампанію “Розірви коло”, яка вже багато років допомагає усім, хто постраждав від насильства, отримати інформацію та розірвати це коло. ' },
    { title: 'Як редагувати профіль?', content: 'Домашнє та гендерно зумовлене насильство - проблема, з якою стикається надто багато людей в нашій країні. Фонд ООН у галузі народонаселення разом із партнерами створив кампанію “Розірви коло”, яка вже багато років допомагає усім, хто постраждав від насильства, отримати інформацію та розірвати це коло. ' },
  ];
}

export default function faq() {
  const questions = getFaqQuestions();
  return (
        <div className="faq-wrapper">
            <div className="page-title text-violet">Часті запитання (FAQ)</div>
            <QuestionItem noReply={true}/>
            <Accordion>
                {questions.map(singleQuestion => (
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="subtitle-small text-violet">
                                    {singleQuestion.title}
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                {singleQuestion.content}
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))
                }
            </Accordion>
        </div>
  );
}
