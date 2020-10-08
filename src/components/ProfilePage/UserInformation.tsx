import React, { ReactElement, useState, ChangeEvent } from "react";
import { TextField, Button } from "@material-ui/core";

type TProps = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
};

const UserInformation = (props: TProps): ReactElement => {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [email, setEmail] = useState(props.email);

  return (
    <div>
      {/* <form onSubmit={handleRegisterSubmit}> */}
      <form>
        <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="First Name"
          type="text"
          name="firstName"
          fullWidth
          value={firstName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.target.value)
          }
        />
        <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="Last Name"
          type="text"
          name="lastName"
          fullWidth
          value={lastName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
        />
        <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="Email"
          type="email"
          name="email"
          fullWidth
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <Button type="submit" color="primary">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserInformation;
