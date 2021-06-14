/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';

function filledFieldsCount(data) {
  let result = 0;
  Object.values(data).forEach((el) => {
    if (el.value && el.value.length > 0) {
      result += 1;
    }
  });
  return result;
}


function setArcRadius(endDegree) {
  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians)),
    };
  }

  // sector
  const opts = {
    cx: 190 / 2,
    cy: 190 / 2,
    radius: 190 / 2,
    start_angle: 0,
    end_angle: Math.min(359.9, endDegree),
  };

  const start = polarToCartesian(opts.cx, opts.cy, opts.radius, opts.end_angle);
  const end = polarToCartesian(opts.cx, opts.cy, opts.radius, opts.start_angle);
  const largeArcFlag = opts.end_angle - opts.start_angle <= 180 ? '0' : '1';

  const d = [
    'M', start.x, start.y,
    'A', opts.radius, opts.radius, 0, largeArcFlag, 0, end.x, end.y,
    'L', opts.cx, opts.cy,
    'Z',
  ].join(' ');

  // document.getElementById('sector').setAttribute('d', d);
  // document.getElementById('sector_d_attr').innerHTML = d;
  return d;
}
function setBorderArcRadius(endDegree, radius = 95, thickness = 10) {
  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians)),
    };
  }

  // arc

  const opts = {
    cx: 190 / 2,
    cy: 190 / 2,
    radius,
    start_angle: 0,
    end_angle: Math.min(359.9, endDegree),
    thickness,
  };

  const start = polarToCartesian(opts.cx, opts.cy, opts.radius, opts.end_angle);
  const end = polarToCartesian(opts.cx, opts.cy, opts.radius, opts.start_angle);
  const largeArcFlag = opts.end_angle - opts.start_angle <= 180 ? '0' : '1';

  const cutout_radius = opts.radius - opts.thickness;
  const start2 = polarToCartesian(opts.cx, opts.cy, cutout_radius, opts.end_angle);
  const end2 = polarToCartesian(opts.cx, opts.cy, cutout_radius, opts.start_angle);


  const d = [
    'M', start.x, start.y,
    'A', opts.radius, opts.radius, 0, largeArcFlag, 0, end.x, end.y,
    'L', opts.cx, opts.cy,
    'Z',

    'M', start2.x, start2.y,
    'A', cutout_radius, cutout_radius, 0, largeArcFlag, 0, end2.x, end2.y,
    'L', opts.cx, opts.cy,
    'Z',
  ].join(' ');
  return d;
}

function countFilledFields(dataObject) {
  const oneFraction = 100 / dataObject.length;
  let result = 0;
  Object.values(dataObject).forEach((el) => {
    if (el.value && el.value.length > 0) {
      result += oneFraction;
    }
  });
  return result;
}

export default function ProfileEditorCounter(props) {
  const [circleCords, setCircleCords] = useState('');
  const [borderCords, setBorderCords] = useState('');
  const [borderCordsInnerBorder, setBorderCordsInnerBorder] = useState('');
  const { profileEditorFields } = props;
  const [countedFields, setCountedFields] = useState(countFilledFields(profileEditorFields));
  useEffect(() => {
    setCountedFields(countFilledFields(profileEditorFields));
    // eslint-disable-next-line max-len
    const fieldsLength = profileEditorFields.length;
    const degreeValue = ((filledFieldsCount(profileEditorFields) * 360).toFixed() / (fieldsLength));
    setCircleCords(setArcRadius(degreeValue));
    setBorderCords(setBorderArcRadius(degreeValue));
    setBorderCordsInnerBorder(setBorderArcRadius(degreeValue, 75, 5));
  }, [profileEditorFields]);
  return (
    <div className="white-bg-element with-padding profile-editor-wrapper__left">
        <div className="text-violet subtitle-small fw-600">Ваш профіль заповнено на:</div>
        <div className="profile-filling-count-wrapper">
          <svg width="190" height="190" viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path id="arc" fill="var(--color-gray)" d={circleCords} stroke="none" fillRule="evenodd" />
              <path fill="var(--color-violet)" d={borderCords} stroke="none" fillRule="evenodd" />
              <path fill="var(--color-violet)" d={borderCordsInnerBorder} stroke="none" fillRule="evenodd" />
          </svg>
          <div className="profile-filling-count-wrapper__value">
            {countedFields.toFixed()}%
          </div>
        </div>
        {
          (countedFields > 90)
            ? <div className="text ">Ви отримали доступ до повного функціоналу особистого кабінету</div>
            : <div className="text ">Для отримання повного доступу заповніть дані профіля</div>
        }
    </div>
  );
}
