import React, { useState } from "react";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";

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
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Select Request React
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={2}
        style={{ marginTop: "80px" }}
      >
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Example error and retry
          </Typography>

          <SelectRequest
            placeholder="Estados"
            url="https://servicodados.ibge.gov.br/api/v1/localidades/estados"
            configOptions={configOptions}
            onChange={handleChange}
            handleError={handleError}
          />

          <Typography
            variant="body2"
            gutterBottom
            style={{ marginTop: "15px" }}
          >
            <strong>Selected value:</strong> {valueRequest}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Example error and retry
          </Typography>

          <SelectRequest
            placeholder="Estados"
            url="https://servicodados.ibge.gov.br/api/v1/localidades/estadoss"
            configOptions={configOptions}
            onChange={handleChange}
            handleError={handleError}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Examples;
