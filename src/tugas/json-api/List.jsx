import { useEffect, useState } from "react";
import axios from "axios";

function List() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const res = await axios.get(
      "http://localhost:3000/contacts"
    );
    setContacts(res.data);
  };

  return (
    <div className="container mt-4">

      {/* CARD HEADER */}
      <div className="card shadow">
        <div className="card-header bg-dark text-white text-center">
          <h4>📒 Daftar Kontak</h4>
        </div>

        {/* TABLE */}
        <div className="card-body">

          <table className="table table-hover table-bordered text-center">

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Email</th>
                <th>No HP</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default List;