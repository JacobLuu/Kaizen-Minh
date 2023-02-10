import React from 'react';
import moment from 'moment';

const convertTimestamp = (input) => {
  const today = moment().unix();
  const time = today - input;
  if (time < 0) {
    return (
      <div>
        <span>00</span> years <span>00</span> months
      </div>
    );
  }
  const numYears = Math.floor(time / (86400 * 30.44 * 12));
  const numMonths = Math.floor(time / (86400 * 30.44)) - numYears * 12;
  return (
    <span>
      <span>{numYears || '00'}</span> years <span>{numMonths || '00'}</span>{' '}
      months
    </span>
  );
};

export default convertTimestamp;
