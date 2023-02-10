/* eslint-disable no-param-reassign */
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { SKELETON_LOADING_TYPE } from '../../constants/common';
import {PieChartContainer, BarChartContainer } from './styles';

export interface ISkeletonLoading {
  loadingType: string;
  rowPerPage?: number;
  cellPerRow?: number;
}

const SkeletonLoading = (props: ISkeletonLoading) => {
  const { loadingType, rowPerPage, cellPerRow } = props;
  const arrayRange = (start, len) => {
    // to create a sequence array from parameter start to parameter len
    let arr = new Array(len);
    for (let i = 0; i < len; i+=1, start+=1) {
      arr[i] = start;
    }
    return arr;
  };
  if (loadingType === SKELETON_LOADING_TYPE.TABLE) {
    return (
      <TableBody>
        {arrayRange(0, rowPerPage)?.map((row) => <TableRow key={row}>
          {arrayRange(0, cellPerRow)?.map((cell) => <TableCell key={cell} className="wrapper_row_text">
            <Skeleton style={{ width: '100%' }} />
          </TableCell>)}
        </TableRow>)}
      </TableBody>
    );
  };
  if (loadingType === SKELETON_LOADING_TYPE.PIE_CHART) {
    return (
      <PieChartContainer>
        <div className='pie'>
          <Skeleton variant='circle' style={{ width: '80%', height: '80%' }} />
        </div>
        <div className='annotation'>
          <Skeleton variant='rect' style={{ width: '100%', height: '35px' }} />
          <Skeleton variant='rect' style={{ width: '100%', height: '35px' }} />
          <Skeleton variant='rect' style={{ width: '100%', height: '35px' }} />
          <Skeleton variant='rect' style={{ width: '100%', height: '35px' }} />
        </div>
      </PieChartContainer>
    );
  };
  if (loadingType === SKELETON_LOADING_TYPE.BAR_CHART) {
    return (
      <BarChartContainer>
        {arrayRange(0, rowPerPage)?.map((row) =>
          <div key={row.id} className='bar-chart-row'>
            <div className='left-row'>
              <div className='avatar'>
                <Skeleton variant='circle' style={{ width: '100%', height: '100%' }} />
              </div>
              <div className='name'><Skeleton style={{ width: '100%' }} /></div>
            </div>
            <div className='progress'>
              <Skeleton style={{ width: '75%' }} />
              <Skeleton style={{ width: '105px', minWidth: '105px' }} />
            </div>
          </div>
        )}
      </BarChartContainer>
    );
  };
}

export default SkeletonLoading;
