import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to My React App!</h1>
      <p>Hello world from frontend!</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
