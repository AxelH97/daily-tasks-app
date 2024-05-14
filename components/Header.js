import * as React from 'react';
// import { Appbar } from 'react-native-paper';

<h1>StopWatch</h1>

const MyHeader = () => {

  return (
    <Appbar.Header style={{backgroundColor:'black'}}>
      <Appbar.Content title="Stopwatch" style={{ alignItems: 'center'}}/>
    </Appbar.Header>
  );
};

export default MyHeader;