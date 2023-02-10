const handleClickCheckbox = (
  event,
  case_id,
  name,
  checkboxSelected,
  setCheckboxSelected
) => {
  const selectedIndex = checkboxSelected.findIndex(
    (checkedItem) => checkedItem.case_id === case_id
  );
  let newSelected = [];
  // check if a case_id not selected in checkboxSelected array, then add it to arrray
  // or delete it from array if be found
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(checkboxSelected, {
      case_id,
      name,
    });
  } else {
    newSelected = checkboxSelected.filter(
      (element) => element.case_id !== checkboxSelected[selectedIndex].case_id
    );
  }
  setCheckboxSelected(newSelected);
};

export default handleClickCheckbox;
