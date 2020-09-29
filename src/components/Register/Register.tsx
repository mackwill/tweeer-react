import React, {
  FormEvent,
  MouseEvent,
  ChangeEvent,
  ReactElement,
  useState,
} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CustomAlert from "../CustomAlert";

interface IProps {
  open: true | false;
  handleClose: (e: MouseEvent) => void;
  onChange: (e: ChangeEvent) => void;
  submitRegisterData: (newUser: object) => Promise<void>;
  errMessage: string;
}
const Register = (props: IProps): ReactElement => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegisterSubmit = (e: any) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setErrorMessage("Your passwords do not match");
      return;
    }

    return props
      .submitRegisterData({
        username,
        firstName,
        lastName,
        email,
        password,
      })
      .then(() => props.handleClose);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleRegisterSubmit}>
          <DialogTitle id="form-dialog-title">
            Sign Up So You Can Start Tweeting!
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="First Name"
              type="text"
              name="firstName"
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
            />
            <TextField
              required
              margin="dense"
              id="name"
              label="Last Name"
              type="text"
              name="lastName"
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
            />
            <TextField
              required
              margin="dense"
              id="name"
              label="Email"
              type="email"
              name="email"
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <TextField
              required
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
              required
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
            <TextField
              required
              margin="dense"
              id="name"
              label="Confirm Password"
              type="password"
              name="passwordConfirmation"
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordConfirmation(e.target.value)
              }
            />
          </DialogContent>
          <CustomAlert errMessage={props.errMessage} />

          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Register
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default Register;
