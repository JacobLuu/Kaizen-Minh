import moment from 'moment';
import Cookies from 'universal-cookie';
import { consentCookieExpiry, stateKaizenKeyword } from '../constants/common';

const cookieControlConfig = {
  apiKey: process.env.REACT_APP_COOKIE_CONTROL_API_KEY,
  product: 'COMMUNITY',
  initialState: 'closed',
  statement: {
    description: 'For more information visit our Privacy Policy',
    name: '',
    url: '',
    updated: '',
  },
  rejectButton: false,
  acceptButton: false,
  necessaryCookies: [
    '_ga',
    '_hjAbsoluteSessionInProgress',
    '_hjFirstSeen',
    '_gid',
    '_hjSession*',
  ],
  text: {
    title: 'This site uses cookies.',
    intro:
      'We use cookies to deliver our online services as set out in our Privacy Policy.',
  },
  position: 'LEFT',
  theme: 'LIGHT',
};

function getCookieControlSettingInCookie() {
  const cookies = new Cookies();
  return cookies.get('CookieControl');
}

export function checkIfOptionsTurnedOn(originCookieControlConfig) {
  const cookieControlState = getCookieControlSettingInCookie();

  let isKaizenCookieOptIn = false;

  if (
    cookieControlState?.optionalCookies?.[stateKaizenKeyword] === 'accepted'
  ) {
    // to turn on the option on UI
    // eslint-disable-next-line no-param-reassign
    originCookieControlConfig.optionalCookies[0].lawfulBasis =
      'legitimate interest';
    isKaizenCookieOptIn = true;
  } else {
    // to turn off the option on UI
    // eslint-disable-next-line no-param-reassign
    delete originCookieControlConfig.optionalCookies[0].lawfulBasis;
  }

  return {
    isKaizenCookieOptIn,
  };
}

export function isConsentExpired() {
  const cookieControlState = getCookieControlSettingInCookie();
  if (cookieControlState && consentCookieExpiry) {
    const consentDateInUnix = cookieControlState.consentDate / 1000;
    const consentDateInMomentFormat = moment.unix(consentDateInUnix);
    const expiryDate = consentDateInMomentFormat.add(
      consentCookieExpiry,
      'days'
    );
    return moment().isAfter(expiryDate);
  }
  // if there is yet have no CookieControl, set the panel to open
  return true;
}

export default cookieControlConfig;
