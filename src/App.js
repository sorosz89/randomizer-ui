import './App.css';
import PersonList from './components/randomizer';
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md" style={{ backgroundColor: '#121212', color: '#00FF7F', minHeight: '100vh', padding: '20px' }}>
      <div id="root" style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
        <header className="App-header">
          <PersonList />
        </header>
      </div>
    </Container>
  );
}

export default App;
