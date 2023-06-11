import { Admin, Resource } from "react-admin";
import { UserList } from './components/User';
import restProvider from 'ra-data-simple-rest';

const dataProvider = restProvider('https://testnet.polybase.xyz/v0/collections/pk%2F0x6291a71f6e1a57cb1fa136ae1c298e017df3ae67efb6bbab7cb59316fdf9a1a09d1fa8f6075825f982ba80b3653bf330cdfb147ab3ed56bdc8bdb4eb27de4955%2FPubGoods%2FUser');
function App() {
  return (
      <Admin dataProvider={dataProvider}>
        <Resource name="records" list={UserList} />
      </Admin>
    );
  }
export default App;
