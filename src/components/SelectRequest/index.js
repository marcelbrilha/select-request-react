import React, { useState, useEffect, memo } from "react";
import { debounce } from "lodash";
import { CircularProgress, Icon, Tooltip } from "@material-ui/core";
import PropTypes from "prop-types";
import Select from "react-select";
import axios from "axios";

import Style, { customStyles } from "./style";

const SelectRequest = ({
  url,
  configOptions,
  onChange,
  handleError,
  placeholder,
  isDisabled = false,
  isSearchable = true
}) => {
  const [value, setValue] = useState();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorIcon, setErrorIcon] = useState(false);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    const mapOptions = data => {
      const { label, value } = configOptions;

      return data
        .sort((a, b) => String(a[label]).localeCompare(String(b[label])))
        .map(options => {
          return {
            label: options[label],
            value: options[value]
          };
        });
    };

    const load = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(url);
        setLoading(false);

        if (data && Array.isArray(data)) {
          const options = mapOptions(data);
          setOptions(options);
        } else {
          setErrorIcon(true);
          handleError(Error("Invalid response data"));
        }
      } catch (error) {
        console.log(`Error in select request: ${error}`);
        setLoading(false);
        setErrorIcon(true);
        handleError(error);
      }
    };

    load();
  }, [configOptions, handleError, url, retry]);

  const handleChange = option => {
    setValue(option);
    onChange(option.value);
  };

  const classes = Style();

  return (
    <div className={classes.container}>
      <Select
        value={value}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        styles={customStyles}
      />

      {loading && <CircularProgress className={classes.progress} />}
      {errorIcon && (
        <Tooltip title="Retry" placement="bottom">
          <Icon
            className={classes.errorIcon}
            onClick={debounce(() => setRetry(!retry), 1000)}
          >
            error
          </Icon>
        </Tooltip>
      )}
    </div>
  );
};

SelectRequest.propTypes = {
  url: PropTypes.string.isRequired,
  configOptions: PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isSearchable: PropTypes.bool
};

export default memo(SelectRequest, (prevProps, nextProps) => {
  if (
    prevProps.configOptions.label !== nextProps.configOptions.label ||
    prevProps.configOptions.value !== nextProps.configOptions.value
  ) {
    return false;
  }

  return true;
});
