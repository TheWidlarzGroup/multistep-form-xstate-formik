import React from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {theme} from '../utils/Theme';

interface Props {
  goBack: () => void;
}

const Success = ({goBack}: Props) => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.text} category="h2">
        Success screen
      </Text>
      <Button appearance="ghost" status="success" onPress={goBack}>
        Let me go back and edit some stuff...
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {marginBottom: theme.spacing.value * 2},
});

export default Success;
