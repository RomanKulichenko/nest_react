import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';

function App() {
  return (
  <Admin dataProvider={restProvider('http://localhost:6000/api')}>

  </Admin>
  )
}

export default App;
