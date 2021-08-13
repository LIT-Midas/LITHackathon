import { Amplify, Auth } from 'aws-amplify';
import React, { createContext, useState } from 'react';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

const AccountContext = createContext();

const Account = (props) => {
  const [validUser, setValidUser] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');

  const logout = () => {
    Auth.signOut();
    setUserEmail('');
    setUsername('');
    setValidUser(false);
  }

  return (
    <AccountContext.Provider value={{
      validUser,
      userEmail,
      username,
      setValidUser,
      setUserEmail,
      setUsername,
      logout
    }} {...props} />
  );
};

export { Account, AccountContext };
