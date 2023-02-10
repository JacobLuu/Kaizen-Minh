import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export const convertTimeToStartOfDay = (unixTimestamp) => {
  return moment(unixTimestamp).startOf('day').unix()
};