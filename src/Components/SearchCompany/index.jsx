import React from "react";
import PropTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const SearchCompany = ({ companies, onChange, company }) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="company-select">Empresa</InputLabel>
      <Select
        value={company ? company.id : ""}
        onChange={event => onChange(event)}
      >
        <MenuItem>Todas</MenuItem>
        {companies.map(company => {
          return (
            <MenuItem key={company.id} value={company.id}>
              {company.identifier} - {company.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

SearchCompany.propTypes = {
  companies: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  company: PropTypes.object
};

export default SearchCompany;
