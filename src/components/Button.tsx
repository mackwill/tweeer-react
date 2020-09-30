import React, { ReactElement } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

interface IProps {
  btnType: "button" | "reset" | "submit" | undefined;
  message: string;
}
const ContainedButtons = (props: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button type={props.btnType} variant="contained" color="primary">
        {props.message}
      </Button>
    </div>
  );
};

export default ContainedButtons;
