const Error = (error, setAlertText) => {
    if (error.response && error.response.data) {
      if (error.response.data.content && error.response.data.content[0] === `can't be blank`) {
        setAlertText(`Say something about your plan`);
      } else if (error.response.data.title && error.response.data.title[0] === `can't be blank`) {
        setAlertText(`Title is required & should be above 3 characters`);
      } else {
        setAlertText(`Oops! Something went wrong!`);
      }
    } else {
      setAlertText(`Oops! Something went wrong!`);
    }
  };
  
  export default Error;
  