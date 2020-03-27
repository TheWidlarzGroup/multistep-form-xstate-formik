import React, {useEffect, useState} from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import {getUser, updateUser} from '../data/Api';
import {UserData} from '../types/UserData.types';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const {navigate} = useNavigation();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const fetchData = async () => {
    setUser(user ? await getUser({...user}) : await getUser());
  };

  const updateData = async () => {
    if (user) {
      setUser(await updateUser({...user, name: 'Kathy'}));
    }
  };

  const goNext = () => navigate('FormName');

  return (
    <Layout style={styles.container}>
      <Text category="h1">Form App</Text>
      <Button
        size="large"
        appearance="ghost"
        status="basic"
        onPress={fetchData}>
        Get user
      </Button>
      <Button
        size="large"
        appearance="ghost"
        status="success"
        onPress={updateData}>
        Update user
      </Button>
      <Button size="large" appearance="ghost" status="primary" onPress={goNext}>
        Form Name
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
