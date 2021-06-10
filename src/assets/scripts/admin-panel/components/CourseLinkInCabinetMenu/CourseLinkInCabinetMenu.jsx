import React from 'react';

export default function CourseLinkInCabinetMenu(props) {
  return (
    <a {...props} className="outer-course-block">
      <svg width="96" height="91" viewBox="0 10 96 91" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M71.1818 87.251C53.9733 80.6704 39.1676 69.0214 28.7226 53.8444C18.2776 38.6675 12.6854 20.6777 12.6854 2.2539" stroke="#FF7F41" stroke-width="8"/>
        <path d="M76.875 74.4644C61.9797 69.0805 49.1072 59.2341 40.0118 46.2676C30.9165 33.3011 26.041 17.8453 26.0498 2.00693" stroke="#FF7F41" stroke-width="4"/>
      </svg>
      <div className="fw-600 text-violet">онлайн курс</div>
      <p>Комплексний підхід до вирішення проблеми насильства щодо жінок та дівчат в Україні»</p>
    </a>
  );
}
