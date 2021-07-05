import React from 'react';

export default function Page404({backLink}) {
  return (
    <div className="page-part wrap-404">
      <div className="page-title text-violet">Сторінка не знайдена</div>
      <img src="/webroot/assets/images/404.svg" alt="" />
      {backLink && <div onClick={backLink} className="button-std button-std--violet small"> Повернутися назад</div>}
    </div>
  );
}
