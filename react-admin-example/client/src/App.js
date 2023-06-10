import { Admin, Resource } from "react-admin";
import { UserList } from './components/User';
import restProvider from 'ra-data-simple-rest';

const dataProvider = restProvider('http://localhost:3010');
function App() {
  return (
      <Admin dataProvider={dataProvider}>
        <Resource name="users" list={UserList} />
      </Admin>
    );
  }
export default App;
