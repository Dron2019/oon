
import React from 'react';
import WorkConsultation from '../components/work-consultation/WorkConsultation.jsx';
import CreateConsultQuestion from '../components/create-consult-question/CreateConsultQuestion.jsx';
import QuestionsHistory from '../components/questions-history/QuestionsHistory.jsx';
import OnlineConsultationRequest from '../components/online-consultation-request/OnlineConsultationRequest.jsx';
import ProfileEditor from '../components/profileEditor/profileEditor.jsx';
import FAQ from '../components/faq/faq.jsx';
import UserCV from '../components/UserCV/UserCVs.jsx';

export default [
  { title: '', route: '/cabinet/work-consultation', component: <WorkConsultation/> },
  { title: '', route: '/cabinet/createConsultQuestion', component: <CreateConsultQuestion/> },
  { title: '', route: '/cabinet/questionsHistory', component: <QuestionsHistory/> },
  { title: '', route: '/cabinet/onlineConsultationRequest', component: <OnlineConsultationRequest/> },
  { title: '', route: '/cabinet/profileEditor', component: <ProfileEditor/> },
  { title: '', route: '/cabinet/faq', component: <FAQ/> },
  { title: '', route: '/cabinet/user-cv', component: <UserCV/> },
];
