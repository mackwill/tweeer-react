import React, { ReactElement, ChangeEvent, FormEvent, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

interface IProps {
  open: true | false;
  handleClose: () => void;
  onChange: (e: ChangeEvent) => void;
  submitLoginData: (username: string, password: string) => Promise<void>;
  errMessage: string;
}
const Login = (props: IProps): ReactElement => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e: FormEvent): void => {
    e.preventDefault();
    Promise.resolve(props.submitLoginData(username, password)).then(() =>
      props.handleClose()
    );
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleLoginSubmit}>
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
            <TextField
              margin="dense"
              id="name"
              label="Password"
              type="password"
              name="password"
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
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
