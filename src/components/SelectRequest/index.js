import React, { PureComponent } from "react";
import { CircularProgress, Icon } from "@material-ui/core";
import PropTypes from "prop-types";
import Select from "react-select";
import axios from "axios";

import "./style.css";

export default class SelectRequest extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      retry: false,
      loading: false,
      errorIcon: false,
      options: []
    };
  }

  componentDidMount() {
    this.request();
  }

  request() {
    this.setState({ loading: true });

    axios
      .get(this.props.url)
      .then(response => {
        const data = response.data;
        this.setState({ loading: false });

        if (data && Array.isArray(data)) {
          this.mapOptions(data);
        } else {
          this.setState({ errorIcon: true });
          this.props.handleError(Error("Invalid response data"));
        }
      })
      .catch(error => {
        console.log(`Error in select request: ${error}`);
        this.setState({ loading: false, errorIcon: true });
        this.props.handleError(error);
      });
  }

  mapOptions(data) {
    const { label, value } = this.props.configOptions;

    const options = data
      .sort((a, b) => String(a[label]).localeCompare(String(b[label])))
      .map(options => {
        return {
          label: options[label],
          value: options[value]
        };
      });

    this.setState({ options });
  }

  handleChange = option => {
    this.setState({ value: option });
    this.props.onChange(option.value);
  };

  render() {
    return (
      <div className="container">
        <Select
          value={this.state.value}
          onChange={this.handleChange}
          options={this.state.options}
          placeholder={this.props.placeholder}
          isDisabled={this.props.isDisabled}
          isSearchable={this.props.isSearchable}
        />

        {this.state.loading && <CircularProgress className="progress" />}
        {this.state.errorIcon && (
          <Icon className="errorIcon" onClick={() => this.request()}>
            error
          </Icon>
        )}
      </div>
    );
  }
}

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
