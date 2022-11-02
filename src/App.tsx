import { agent } from './veramo/setup'
import { GreenbugOuttermost } from './components/GreenbugOuttermost';

function App() {
  const did = localStorage.getItem('did')
  console.log("did: ", did)
  if (!did) {
    return (
      <button onClick={async () => {
        console.log("agent: ", agent)
        const id = await agent.didManagerCreate({ kms: 'local' })
        // console.log("id: ", id)
        localStorage.setItem('did', id.did)
      }}>
        CREATE BURNER
      </button>
    )
  }
  else {
    return (
      <div className="App">
        <GreenbugOuttermost />
      </div>
    );
  }
}

export default App;
