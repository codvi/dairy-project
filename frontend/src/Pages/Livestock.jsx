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
        return console.error(
          "Error fetching livestock" + JSON.stringify(error)
        );
      }
    };
    fetchLivestock();
  }, []);

  const handleSubmit = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    await axios.post("http://localhost:3000/addLivestock", newLivestock,{
        headers: { Authorization: `Bearer ${token}` },
    })
    setLivestock([...livestock, newLivestock]);
    setNewLivestock({ name: "", type: "", breed: "", birthDate: "", gender: "" });
  };

  const handleInputChange = (e) => {
    setNewLivestock({ ...newLivestock, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-green-50 min-h-screen p-8">
      <h1 className="text-2xl font-bold text-green-900 mt-2 mb-2">Livestock</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <input
            type="string"
            name="name"
            value={newLivestock.name}
            placeholder="Name"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
          <input
            type="string"
            name="breed"
            value={newLivestock.breed}
            placeholder="Breed"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
          <input
            type="string"
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
            type="string"
            name="gender"
            value={newLivestock.gender}
            placeholder="Gender"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center mt-4 mb-4">
        <button type="submit" className="rounded-lg bg-green-700 text-white p-2">Add Livestock</button>
        </div>
        
      </form>
      <div>
        <h2 className="text-2xl text-green-700 mb-4">Livestock List</h2>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {livestock.map((livestock) => (
            <li
              key={livestock._id}
              className="rounded-lg bg-white shadow-md p-4 border-l-4 border-green-700"
            >
              <p className="text-green-700">
                <strong>Name: </strong> {livestock.name}
              </p>
              <p className="text-green-700">
                <strong>Type: </strong> {livestock.type}
              </p>
              <p className="text-green-700">
                <strong>Breed: </strong> {livestock.breed}
              </p>
              <p className="text-green-700">
                <strong>Birth Date: </strong>{" "}
                {new Date(livestock.birthDate).toLocaleDateString()}
              </p>
              <p className="text-green-700">
                <strong>Gender: </strong>{" "}
                {livestock.gender}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
