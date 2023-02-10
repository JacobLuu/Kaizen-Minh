import React, { useEffect } from 'react';
import { Link, useLocation, Switch } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import { Typography, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { checkLastUpdatedRequest } from './reducer';
import ProtectedRoute from '../../components/ProtectedRoute';
import RiskSetup from '../RiskSetup/Loadable';
import AdvancedSettingsCorporate from '../RiskSetup/AdvancedSettingsCorporate';
import AdvancedSettingsIndividual from '../RiskSetup/AdvancedSettingsIndividual';
import UsersManagement from '../UsersManagement/UsersManagement';
import Dashboard from '../Dashboard/Loadable';
import NewCase from '../NewCase/Loadable';
import Support from '../Support';
import RiskResults from '../RiskResults/Loadable';
import DefaultPage from '../DefaultPage';
import CLIENT_PATH from '../../constants/clientPath';
import Images from '../../assets/images';
import { Wrapper, Logo, Content, UserInfo } from './styles';
import history from '../../utils/history';
import { ACCESS_TOKEN } from '../../constants/localStorage';

import {
  removeAssessmentsSettings,
  removeLastUpdated,
  removeSettings,
  removeCachedUrl,
  removeToken,
  removeUserRole,
  removeAccountInfo,
  accountInfo,
} from '../../utils/localStorage';
import { isSuperAdmin, isAdmin } from '../../utils/roles';
import getShortcutName from '../../utils/hookShortcutName';

const dashboardItem = {
  title: 'Dashboard',
  value: 0,
  path: CLIENT_PATH.DASHBOARD,
  icon: <DashboardRoundedIcon />,
};

const newCaseItem = {
  title: 'New Case',
  value: 1,
  path: CLIENT_PATH.NEW_CASE,
  icon: <AddCircleIcon />,
};

const userManagementItem = {
  title: 'User Management',
  value: 2,
  path: CLIENT_PATH.USER_MANAGEMENT,
  icon: <GroupRoundedIcon />,
};

const riskSetupItem = {
  title: 'Risk Assessment Setup',
  value: 3,
  path: CLIENT_PATH.RISK_SETUP,
  icon: <SettingsIcon />,
};

const supportItem = {
  title: 'Support',
  value: 4,
  path: CLIENT_PATH.SUPPORT,
  icon: <HelpOutlineRoundedIcon />,
};

const routes = [
  {
    path: CLIENT_PATH.RISK_SETUP,
    exact: true,
    main: () => <RiskSetup />,
  },
  {
    path: CLIENT_PATH.RISK_SETUP_SETTINGS_CORPORATE,
    exact: true,
    main: () => <AdvancedSettingsCorporate />,
  },
  {
    path: CLIENT_PATH.USER_MANAGEMENT,
    main: () => <UsersManagement />,
  },
  {
    path: CLIENT_PATH.RISK_SETUP_SETTINGS_INDIVIDUAL,
    exact: true,
    main: () => <AdvancedSettingsIndividual />,
  },
  {
    path: CLIENT_PATH.NEW_CASE,
    main: () => <NewCase />,
  },
  {
    path: CLIENT_PATH.DASHBOARD,
    exact: true,
    main: () => <Dashboard />,
  },
  {
    path: CLIENT_PATH.SUPPORT,
    main: () => <Support />,
  },
  {
    path: CLIENT_PATH.RISK_RESULTS,
    exact: true,
    main: () => <RiskResults />,
  },
  {
    path: CLIENT_PATH.ROOT,
    main: () => <DefaultPage />,
  },
];

const getMenu = () => {
  const menu = [];
  if (isSuperAdmin()) {
    menu.push(userManagementItem);
  } else if (isAdmin()) {
    menu.push(dashboardItem);
    menu.push(newCaseItem);
    menu.push(userManagementItem);
    menu.push(riskSetupItem);
    menu.push(supportItem);
  } else {
    menu.push(dashboardItem);
    menu.push(newCaseItem);
    menu.push(userManagementItem);
    menu.push(supportItem);
  }
  return menu;
};

function LayoutSidebar() {
  const intervalGetLastUpdateTime = 10 * 1000;
  const location = useLocation();
  const pathname = `/${location.pathname.split('/')[1]}`;
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeToken();
    removeAccountInfo();
    removeUserRole();
    removeCachedUrl();
    removeLastUpdated();
    removeAssessmentsSettings();
    removeSettings();
  };

  const scrollToTopRef = React.useRef(null);
  const scrollTop = () => {
    scrollToTopRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  const handleInfoCharactersLength = (str) => {
    if (str.length >= 15) return str.slice(0, 12).concat('...');
    return str;
  };

  const handleSuperAdminRoleName = (str) => {
    const words = str?.replace('_', ' ');
    return words;
  };

  const handleOnclickLogo = () => {
    if (!isSuperAdmin()) history.replace(CLIENT_PATH.DASHBOARD);
  };

  useEffect(() => {
    if (!isSuperAdmin()) {
      dispatch(checkLastUpdatedRequest());
      const interval = setInterval(() => {
        dispatch(checkLastUpdatedRequest());
      }, intervalGetLastUpdateTime);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  useEffect(() => {
    function localstorageListener() {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token == null) {
        handleLogout();
        history.replace(CLIENT_PATH.LOGIN);
      }
    }
    window.addEventListener('storage', localstorageListener, {
      once: true,
    });
    return () => {
      window.onstorage = null;
    };
  }, []);

  const SideBar = React.memo(() => {
    return (
      <List className="list">
        {getMenu().map((item) => (
          <ListItem
            selected={pathname === item.path}
            key={item.value}
            className="list-item"
            button
            component={Link}
            to={item.path}
            onClick={scrollTop}
          >
            <ListItemIcon className="list-icon">{item.icon}</ListItemIcon>
            <ListItemText className="list-text" primary={item.title} />
          </ListItem>
        ))}

        <Divider className="space" />

        <ListItem
          className="list-item"
          button
          component={Link}
          onClick={handleLogout}
          to={CLIENT_PATH.LOGIN}
        >
          <ListItemIcon className="list-icon">
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText className="list-text" primary="Logout" />
        </ListItem>
      </List>
    );
  });

  return (
    <Wrapper>
      <div className="slider">
        <Logo onClick={handleOnclickLogo}>
          <img
            src={Images.img_logo}
            style={{ margin: 'auto' }}
            alt="logo"
            width="180"
          />
        </Logo>
        <UserInfo>
          <Box className="avatar-wrapper">
            <Avatar className="avatar-icon">
              {getShortcutName(accountInfo?.name)}
            </Avatar>
          </Box>
          <Box className="detail-wrapper">
            <Typography className="account-name">
              {handleInfoCharactersLength(accountInfo?.name)}
            </Typography>
            <Typography className="info-detail">
              {handleSuperAdminRoleName(accountInfo?.roles[0])}
            </Typography>
            <Typography className="info-detail">
              {accountInfo?.organization?.name}
            </Typography>
          </Box>
        </UserInfo>
        <SideBar />
      </div>
      <div ref={scrollToTopRef} />
      <Content>
        <Switch>
          {routes.map((route) => (
            <ProtectedRoute
              key={`${route.path}_routes`}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </Switch>
      </Content>
    </Wrapper>
  );
}

export default LayoutSidebar;
