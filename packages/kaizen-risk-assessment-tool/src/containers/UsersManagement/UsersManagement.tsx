import React, { useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import Typography from '@material-ui/core/Typography';
import Organizations from './Organizations/Organizations';
import UsersList from '../UsersList/UsersList';
import { Wrapper, NavTabs, NavTab } from './styles';
import { isSuperAdmin } from '../../utils/roles';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function UsersManagement() {
  const [navTabValue, setNavTabValue] = useState(0);
  const handleChangeTabs = (e, number) => {
    setNavTabValue(number);
  };


  const USER_MANAGEMENT_TAB = {
    ORGANIZATION: 0,
    USERLIST_SUPERADMIN: 1,
    USERLIST: 0,
    }

  const superAdmintabTitle = [
    { title: 'Organisations', value: USER_MANAGEMENT_TAB.ORGANIZATION },
    { title: 'Users List', value: USER_MANAGEMENT_TAB.USERLIST_SUPERADMIN },
  ];

  const tabTitle = [
    { title: isSuperAdmin() ? 'Users List' : '', value: USER_MANAGEMENT_TAB.USERLIST },
  ];

  return (
    <>
      <Wrapper>
        <div className="wrapper_detail">
          <Typography className="wrapper_detail_title_sub">
            USER MANAGEMENT
          </Typography>
        </div>
        <NavTabs value={navTabValue} onChange={handleChangeTabs}>
          {(isSuperAdmin()
          ? superAdmintabTitle
          : tabTitle).map((items) => (
            <NavTab
              textColor="primary"
              disableRipple
              focusRipple
              disableFocusRipple={false}
              key={items.value}
              label={items.title}
            />
          ))}
        </NavTabs>

        <LoadingOverlay spinner>
          {isSuperAdmin() && (<TabPanel
            value={navTabValue} index={USER_MANAGEMENT_TAB.ORGANIZATION}>
            <Organizations />
          </TabPanel>)}

          <TabPanel
            value={navTabValue}
            index={isSuperAdmin()
            ? USER_MANAGEMENT_TAB.USERLIST_SUPERADMIN
            : USER_MANAGEMENT_TAB.USERLIST}>
            <UsersList />
          </TabPanel>
        </LoadingOverlay>
      </Wrapper>
    </>
  );
}

export default React.memo(UsersManagement);
