import React from 'react';

export default function(props) {
    if (props === 0) return <></>
    return (
        <svg  className="menu-messages-bell" width={18} height={20} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.3333 6.40096C14.3333 4.96853 13.7714 3.59478 12.7712 2.5819C11.771 1.56903 10.4145 1 9 1C7.58551 1 6.22896 1.56903 5.22876 2.5819C4.22857 3.59478 3.66667 4.96853 3.66667 6.40096C3.66667 12.7021 1 14.5024 1 14.5024H17C17 14.5024 14.3333 12.7021 14.3333 6.40096Z" fill="#FF7F41" stroke="#FF7F41" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.5378 18.103C10.3815 18.3758 10.1572 18.6023 9.88734 18.7597C9.61746 18.9171 9.31148 19 9.00003 19C8.68858 19 8.3826 18.9171 8.11271 18.7597C7.84283 18.6023 7.61853 18.3758 7.46225 18.103" stroke="#FF7F41" strokeLinecap="round" strokeLinejoin="round" />
        {/* <path d="M9.09868 5.7H9.99868V12H8.96368V6.807L7.69468 7.167L7.44268 6.285L9.09868 5.7Z" fill="white" /> */}
        <text x='6' y='12'>{props.count}</text>
        </svg>
    )
}