/* eslint-disable react/prop-types */
import React from 'react';
import {
  Input,
} from 'reactstrap';
import Images from '../../assets/images';

const Search = ({ config, placeholder, value, inputKey, onChange }) => (
  <div style={{ margin: config ? config.margin : 0, position: 'relative', display: 'flex', maxWidth: 260, height: 40 }}>
    <Input
      style={{ border: config && config.border ? config.border : '0px solid transparent', height: config && config.height ? config.height : 50, borderRadius: 10, fontSize: 15, paddingRight: 40 }}
      className={config && config.className ? config.className : 'field bg_shadow_input form-control'}
      placeholder={placeholder || ''}
      value={value[inputKey]}
      onChange={(event) => onChange(inputKey, event.nativeEvent.target.value)}
    />
    <img
      style={{ position: 'absolute', top: config && config.top ? config.top : 20, right: 15 }}
      width="16"
      height="16"
      alt="search"
      src={Images.img_search_gray}
    />
  </div>
);

export default Search;
