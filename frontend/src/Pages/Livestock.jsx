import { useEffect, useState } from "react";
import axios from "axios";

export default function Livestock() {
  const [livestock, setLivestock] = useState([]);
  const [newLivestock, setNewLivestock] = useState({
    name: "",
    type: "",
    breed: "",
    birthDate: "",
    gender: "",
  });
  const [editingLivestock, setEditingLivestock] = useState({});

  useEffect(() => {
    const fetchLivestock = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("http://localhost:3000/getlivestock", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLivestock(response.data);
      } catch (error) {
        console.error("Error fetching livestock", error);
      }
    };
    fetchLivestock();
  }, []);

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/addLivestock",
      newLivestock,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setLivestock([...livestock, response.data]);
    setNewLivestock({
      name: "",
      type: "",
      breed: "",
      birthDate: "",
      gender: "",
    });
  };

  const handleInputChange = (e) => {
    setNewLivestock({ ...newLivestock, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditingLivestock({ ...editingLivestock, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    await axios.post(
      `http://localhost:3000/updateLivestock/${editingLivestock._id}`,
      editingLivestock,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setLivestock(
      livestock.map((item) =>
        item._id === editingLivestock._id ? editingLivestock : item
      )
    );
    setEditingLivestock({});
  };

  const deleteLivestock = async (livestock) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/deleteLivestock/${livestock._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLivestock(livestock.filter((item) => item._id !== livestock._id));
  };

  return (
    <div className="bg-green-50 min-h-screen p-8">
      <h1 className="text-2xl font-bold text-green-900 mt-2 mb-2">Livestock</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <input
            type="text"
            name="name"
            value={newLivestock.name}
            placeholder="Name"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="breed"
            value={newLivestock.breed}
            placeholder="Breed"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="type"
            value={newLivestock.type}
            placeholder="Animal"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="birthDate"
            value={newLivestock.birthDate}
            placeholder="Birth Date"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="gender"
            value={newLivestock.gender}
            placeholder="Gender"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center mt-4 mb-4">
          <button
            type="submit"
            className="rounded-lg bg-green-700 text-white p-2"
          >
            Add Livestock
          </button>
        </div>
      </form>
      <div>
        <h2 className="text-2xl text-green-700 mb-4 font-bold">Livestock List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {livestock.map((item) => (
            <div
              key={item._id}
              className="rounded-lg bg-white shadow-md p-4 border-l-4 border-green-700"
            >
              {editingLivestock && editingLivestock._id === item._id ? (
                <form className="flex flex-col space-y-2" onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={editingLivestock.name}
                    placeholder="Name"
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    onChange={handleEditInputChange}
                  />
                  <input
                    type="text"
                    name="type"
                    value={editingLivestock.type}
                    placeholder="Animal"
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    onChange={handleEditInputChange}
                  />
                  <input
                    type="text"
                    name="breed"
                    value={editingLivestock.breed}
                    placeholder="Breed"
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    onChange={handleEditInputChange}
                  />
                  <input
                    type="date"
                    name="birthDate"
                    value={editingLivestock.birthDate.split('T')[0]}
                    placeholder="Birth Date"
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    onChange={handleEditInputChange}
                  />
                  <input
                    type="text"
                    name="gender"
                    value={editingLivestock.gender}
                    placeholder="Gender"
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    onChange={handleEditInputChange}
                  />
                  <div className="flex justify-center gap-3">
                    <button
                      type="submit"
                      className="border py-2 px-3 bg-green-500 hover:bg-green-600 rounded-lg text-white"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="border py-2 px-3 bg-red-500 hover:bg-red-600 rounded-lg text-white"
                      onClick={() => setEditingLivestock({})}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-green-700">
                    <strong>Name: </strong> {item.name}
                  </p>
                  <p className="text-green-700">
                    <strong>Type: </strong> {item.type}
                  </p>
                  <p className="text-green-700">
                    <strong>Breed: </strong> {item.breed}
                  </p>
                  <p className="text-green-700">
                    <strong>Birth Date: </strong>{" "}
                    {new Date(item.birthDate).toLocaleDateString()}
                  </p>
                  <p className="text-green-700">
                    <strong>Gender: </strong> {item.gender}
                  </p>
                  <div className="mt-3 flex gap-3">
                    <button
                      className="border py-2 px-3 bg-yellow-300 hover:bg-yellow-400 rounded-lg mb-1"
                      onClick={() => setEditingLivestock(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="border py-2 px-3 bg-red-400 hover:bg-red-600 rounded-lg"
                      onClick={() => deleteLivestock(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
