import * as React from 'react';

interface IPageTemplate {
  pageNum: number,
  totalPages: number,
}

const PageTemplate = ({ pageNum, totalPages }:IPageTemplate) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '10px',
      right: '10px',
    }}
    >
      Page
      {' '}
      {pageNum}
      {' '}
      of
      {' '}
      {totalPages}
    </div>
  );
};

export default PageTemplate;
