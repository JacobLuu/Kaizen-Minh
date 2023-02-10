import React, { Component, Fragment } from 'react';
import {
  UncontrolledDropdown,
  NavbarToggler,
} from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import { Popover } from 'antd';
import { isMobile } from 'react-device-detect';
import Images from '../../assets/images';
import './index.css';

interface Iprops {
  onMenu: any;
}

interface IState {
  name: String;
}
class DefaultHeader extends Component<Iprops, IState> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  // d-none d-md-block d-sm-block d-xs-block
  render() {
    const { name } = this.state;
    const { onMenu } = this.props;
    return (
      <Fragment>
        <div className="flex_row" style={{ width: 230 }}>
          <NavbarToggler className={!isMobile ? '' : ''} onClick={(e) => onMenu(e)}>
            <span className="navbar-toggler-icon" />
          </NavbarToggler>
          <img
            src={Images.img_logo_header}
            style={{ margin: 'auto' }}
            alt="logo"
            width="200"
          />
        </div>
        <div className="mr-4">
          <UncontrolledDropdown direction="down">
            <Popover
              placement="bottomRight"
              trigger="click"
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              content={<div className="cursor_pointer" style={{ color: 'black', fontWeight: 'normal', margin: '0px 10px' }} onClick={this.toggle} role="button" tabIndex={0}>Logout</div>}
            >
              <div className="flex_row cursor_pointer">
                <Typography component="div" style={{ margin: 'auto', fontWeight: 'bold', color: '#42B3E6' }}>
                  {name}
                </Typography>
                <img
                  src={Images.img_down_blue}
                  style={{ margin: 'auto 10px' }}
                  alt="down"
                  width="13"
                  height="9"
                />
              </div>
            </Popover>
          </UncontrolledDropdown>
        </div>
      </Fragment>
    );
  }
}

export default DefaultHeader;
