
import React from 'react';
import WorkConsultation from '../components/work-consultation/WorkConsultation.jsx';
import CreateConsultQuestion from '../components/create-consult-question/CreateConsultQuestion.jsx';
import QuestionsHistory from '../components/questions-history/QuestionsHistory.jsx';
import OnlineConsultationRequest from '../components/online-consultation-request/OnlineConsultationRequest.jsx';
import ProfileEditor from '../components/profileEditor/profileEditor.jsx';
import FAQ from '../components/faq/faq.jsx';
import UserCV from '../components/UserCV/UserCVs.jsx';
import CreateCV from '../components/CreateCV/CreateCV.jsx';
import PsychoQuestionCreate from '../components/PsychoQuestionCreate/PsychoQuestionCreate.jsx';
import OnlineConsultQuestionsHistory from '../components/OnlineConsultQuestionsHistory/OnlineConsultQuestionsHistory.jsx';

export default [
  {
    title: '', exact: true, route: '/', component: <WorkConsultation/>,
  },
  {
    title: '', exact: true, route: '/cabinet', component: <WorkConsultation/>,
  },
  {
    title: '', exact: false, route: '/cabinet/work-consultation', component: <WorkConsultation/>,
  },
  {
    title: '', exact: false, route: '/cabinet/createConsultQuestion', component: <CreateConsultQuestion/>,
  },
  {
    title: '', exact: false, route: '/cabinet/questionsHistory', component: <QuestionsHistory/>,
  },
  {
    title: '', exact: false, route: '/cabinet/onlineConsultationRequest', component: <OnlineConsultationRequest/>,
  },
  {
    title: '', exact: false, route: '/cabinet/profileEditor', component: <ProfileEditor/>,
  },
  {
    title: '', exact: false, route: '/cabinet/faq', component: <FAQ/>,
  },
  {
    title: '', exact: false, route: '/cabinet/user-cv', component: <UserCV/>,
  },
  {
    title: '', exact: false, route: '/cabinet/create-cv', component: <CreateCV/>,
  },
  {
    title: '', exact: false, route: '/cabinet/psychoQuestionCreate', component: <PsychoQuestionCreate/>,
  },
  {
    title: '', exact: false, route: '/cabinet/onlineConsultQuestionsHistory', component: <OnlineConsultQuestionsHistory/>,
  },
];
