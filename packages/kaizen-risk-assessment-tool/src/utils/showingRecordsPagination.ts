const showingRecordsPagination = (totalCount, page, rowsPerPage) => {
  let recordFrom = 0;
  let recordTo = 0;

  if(totalCount < 1) {
    recordFrom = 0;
  } else recordFrom = (page - 1) * rowsPerPage + 1 ;

  if(page * rowsPerPage < totalCount) {
    recordTo = page * rowsPerPage;
  } else recordTo = totalCount;

  return `Showing ${recordFrom} - ${recordTo} of ${totalCount} records`;
};

export default showingRecordsPagination;