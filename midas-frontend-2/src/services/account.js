import { Amplify, Auth } from 'aws-amplify';
import React, { createContext, useState } from 'react';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

const AccountContext = createContext();

const Account = (props) => {
  const [validUser, setValidUser] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [persona, setPersona] = useState('');

  const logout = () => {
    Auth.signOut();
    setUserEmail('');
    setUsername('');
    setName('');
    setUserId('');
    setValidUser(false);
  }

  return (
    <AccountContext.Provider value={{
      validUser,
      userEmail,
      username,
      name,
      userId,
      persona,
      setValidUser,
      setUserEmail,
      setUsername,
      setName,
      setUserId,
      setPersona,
      logout,
    }} {...props} />
  );
};

export { Account, AccountContext };
