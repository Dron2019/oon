import React from 'react';
import { useSelector } from 'react-redux';

export default function ErrorMessage(props) {
  const messageColor = useSelector(state => state.messageStatusStore);
  const colors = ['green', 'orange'];
  return (
        <div style={{
          backgroundColor: colors[messageColor],
        }} className="form-std__error-mes fade-in-fwd ">
            <svg width="8" height="30" viewBox="0 0 8 30" fill={colors[messageColor]} xmlns="http://www.w3.org/2000/svg">
                <path d="M4.36506 23.8749C3.23903 23.8749 2.30171
                 22.995 2.20687 21.8505L0.742898 4.01759C0.657677
                  2.98333 1.00151 1.96089 1.68983 1.19725C2.37732 0.434596 3.34817 0 4.36506 0C5.38195 0 6.3528 0.434596 7.04034 1.19725C7.72879 1.96089 8.07244 2.98333 7.98722 4.01759L6.52324 21.8505C6.42841 22.995 5.49109 23.8749 4.36506 23.8749Z" fill="white"/>
                <path d="M4.36521 25.1875C5.66841 25.1875 6.72449
                 26.2646 6.72449 27.5938C6.72449 28.9229 5.66841
                  29.9999 4.36521 29.9999C3.062 29.9999 2.00593
                   28.9229 2.00593 27.5938C2.00593 26.2646 3.062 25.1875 4.36521 25.1875Z" fill="white"/>
                </svg>
                {props.errorMessage}
        </div>
  );
}
