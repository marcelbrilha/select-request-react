import React, { useState } from "react";
import { Grid, Box } from "@material-ui/core";

import SelectRequest from "../../components/SelectRequest";

const Examples = () => {
  const [valueRequest, setValueRequest] = useState("");
  const configOptions = {
    label: "sigla",
    value: "id"
  };

  const handleChange = option => {
    setValueRequest(option);
  };

  const handleError = error => {
    console.log(error);
  };

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={12} md={6}>
        <Box p={1}>
          <h1>Example Success</h1>

          <SelectRequest
            placeholder="Estados"
            url="https://servicodados.ibge.gov.br/api/v1/localidades/estados"
            configOptions={configOptions}
            onChange={handleChange}
            handleError={handleError}
          />

          <p>Selected value: {valueRequest}</p>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box p={1}>
          <h1>Example error and retry</h1>

          <SelectRequest
            placeholder="Estados"
            url="https://servicodados.ibge.gov.br/api/v1/localidades/estadoss"
            configOptions={configOptions}
            onChange={handleChange}
            handleError={handleError}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Examples;
