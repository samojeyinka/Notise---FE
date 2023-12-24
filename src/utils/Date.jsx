// const formatDate = (dateString) => {
//     const options = { month: 'short', day: 'numeric' };
//     return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
//   };
  
//   export default formatDate;
  
const formatDate = (dateString) => {
  try {
    const options = { month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Handle invalid date string
      return 'Invalid Date';
    }
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch (error) {
    console.error(error);
    return 'Error formatting date';
  }
};

export default formatDate;
