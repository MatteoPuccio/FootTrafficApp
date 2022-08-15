import React, { useEffect, useState } from 'react';
import BottomNavigation from './src/navigation/BottomNavigation';
import './src/constants/translations/IMLocalize';
import SignInScreen from './src/screens/SignInScreen';
import EncryptedStorage from 'react-native-encrypted-storage';
import { doLogin, doLoginToken } from './src/api/login';
import { getItemEncrypted } from './src/utils/common';
import { ActivityIndicator } from 'react-native-paper';


function App() {

  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tryLoginUsingToken = async () => {
      let token = await getItemEncrypted('@access_token');
      console.log("Token: " + JSON.stringify(token));
      if (token != null) {
        doLoginToken(token, setAccessToken);
      }
      setLoading(false);
    }

    tryLoginUsingToken();
  }, []);


  if (loading)
    return (<ActivityIndicator size='large' style={{ alignSelf: 'center' }} />);

  if (accessToken == null) {
    console.log("access token: " + accessToken);
    return (
      <SignInScreen setAccessToken={setAccessToken} />
    )
  }
  return (
    <BottomNavigation accessToken={accessToken} />
  );

};


export default App;
