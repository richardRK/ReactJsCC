import React from "react";

import PropTypes from "prop-types";

const Forms = ({ values, handleChange }) => {
  //   console.log(values);
  //   console.log(handleChange);

  return (
    <div>
      <>
        <input name="email" value={values.email} onChange={handleChange} />
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </>
    </div>
  );
};

Forms.defaultProps = {
  color: "steelblue",
};

Forms.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};
export default Forms;
