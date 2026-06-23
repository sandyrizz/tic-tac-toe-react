import List from "./List";

function App() {
  return (
    <div className="bg-light min-vh-100">
      <div className="text-center py-4">
        <h2 className="fw-bold">React JSON API</h2>
        <p className="text-muted">
          Integrasi React + Axios + JSON Server
        </p>
      </div>

      <List />
    </div>
  );
}

export default App;