import React from 'react';

import EmptyCV from '../EmptyCV/EmptyCV.jsx';

export default function CreateCV() {
  return (
    <div className="create-cv-werapper">
      <div className="page-title text-violet">
        Створити резюме
      </div>
      <EmptyCV/>
    </div>
  );
}
