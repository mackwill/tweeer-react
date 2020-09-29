import React, { ReactElement, ChangeEvent, FormEvent, MouseEvent } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

interface IProps {
  open: true | false;
  handleClose: (e: MouseEvent) => void;
  onChange: (e: ChangeEvent) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errMessage: string;
}
const Login = (props: IProps): ReactElement => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={props.onSubmit}>
          <DialogTitle id="form-dialog-title">
            Login To Your Account!
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              type="username"
              name="username"
              fullWidth
              onChange={props.onChange}
            />
            <TextField
              margin="dense"
              id="name"
              label="Password"
              type="password"
              name="password"
              fullWidth
              onChange={props.onChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Login;
