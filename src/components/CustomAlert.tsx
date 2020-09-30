import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    margin: "auto",
  },
}));

interface IProps {
  errMessage: string | null;
}
const CustomAlert = (props: IProps): ReactElement => {
  const classes = useStyles();

  let errDisplay = "none";

  if (props.errMessage) errDisplay = "block";

  return (
    <Box className={classes.root} display={errDisplay}>
      <Alert severity="error">{props.errMessage}</Alert>
    </Box>
  );
};

export default CustomAlert;
