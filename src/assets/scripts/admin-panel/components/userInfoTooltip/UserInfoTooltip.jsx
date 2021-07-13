import React from 'react';
import ReactTooltip from 'react-tooltip';
const userInfotitles = {
  age:'Вік', 
  childs:'Кількість дітей', 
  education:'Освіта', 
  email:'E-mail', 
  familyStatus:'Сімейни статус', 
  fathername_r:'По-батькові', 
  mainphone:'Телефон', 
  name_r:'Ім\'я', 
  surname_r:'Прізвище',
};
export default function UserInfoTooltip(props){
  return (
    <ReactTooltip 
      id={props.id}
      place="left" 
      delayUpdate={1000} 
      effect="solid" 
      clickable 
      className="create-cv-tooltip create-cv-tooltip--white-bg"
      arrowColor="rgba(62, 12, 41, 0.1)"
      >
      <table>
        <tbody>
          <tr borderCollapse="3" className="user-info-head-row">
            <td colspan="3" className="subtitle-samll text-violet fw-800 question-item__title">Інформація про <br/>користувача / користувачку</td>
          </tr>
        {Object.entries(props.data).map((dataItem) => (
          <tr className="text-black ">
          <td className="fw-800">{userInfotitles[dataItem[0]]}:</td>
          <td>  </td>
          <td>{dataItem[1]}</td>
        </tr>
        ))}
          
        </tbody>
      </table>
      
      {/* <table>
      <tbody>
        <tr className="text-violet fw-500">
          <td>І"мя</td>
          <td>  </td>
          <td>Сергій</td>
        </tr>
        <tr className="text-violet fw-500">
          <td>І"мя</td>
          <td>  </td>
          <td>Сергій</td>
        </tr>
        <tr className="text-violet fw-500">
          <td>І"мя</td>
          <td>  </td>
          <td>Сергій</td>
        </tr>
        <tr className="text-violet fw-500">
          <td>І"мя</td>
          <td>  </td>
          <td>Сергій</td>
        </tr>
        <tr className="text-violet fw-500">
          <td>І"мя</td>
          <td>  </td>
          <td>Сергій</td>
        </tr>
        <tr className="text-violet fw-500">
          <td>І"мя</td>
          <td>  </td>
          <td>Сергій</td>
        </tr>
        </tbody>
      </table> */}
    </ReactTooltip>
  )
}