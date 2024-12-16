import React, { useState, useEffect } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [telephone, setTelephone] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchData = () => {
    fetch("https://json-api.uz/api/project/ozodbek-todo-list/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !telephone) {
      alert("iltimos ikala joyniham toldiring");
      return;
    }

    fetch("https://json-api.uz/api/project/ozodbek-todo-list/products")
      .then((response) => response.json())
      .then((data) => {
        const existingUser = data.data.find(
          (item) => item.username === username
        );

        if (existingUser) {
          setError("bu username allaqachon mavjud");
        } else {
          const newUser = { username, telephone };
          fetch("https://json-api.uz/api/project/ozodbek-todo-list/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((response) => response.json())
            .then(() => {
              setSuccessMessage("Tasdiqdan o'tildi!");
              setError("");
              setUsername("");
              setTelephone("");
              fetchData();
            })
            .catch((error) => {
              console.error("Error adding user:", error);
              setError("Error adding user.");
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-lg mb-8 text-center text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-4">
          Ovoz Berish va Mukofot Olish
        </h2>
        <p className="mt-2 text-lg">
          <strong>Ishtirok eting va yutib oling!</strong>
          <br />
          <a
            href="https://t.me/Yil_Maktabi2024_bot"
            className="text-yellow-300 underline"
          >
            Botga kirib
          </a>
          Fargʻona viloyati, Fargʻona shahri, 45-umumtalim maktabiga ovoz
          bering. Ovoz berganingizdan so'ng, formani to'ldirib yuboring va
          tasdiqlovchi skrinshotni{" "}
          <a
            href="https://t.me/Mukh4mmadov"
            className="text-yellow-300 underline"
          >
            @Mukh4mmadov
          </a>
          ga yuboring!
        </p>
        <p className="mt-4 text-lg">
          <strong>Eslatma:</strong> Ovoz berish 2024-yil 22-dekabrda tugaydi.
          Yutganlardan biriga 100,000 so'm mukofot beriladi!
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        {/* Ogohlantirish xabari */}
        <p className="text-red-600 text-sm mt-4">
          <strong>Diqqat!</strong> Formani noto'g'ri to'ldirish yoki soxta
          ma'lumot berish jinoiy javobgarlikka olib kelishi mumkin. Iltimos,
          ma'lumotlarni to'g'ri kiriting.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Telegram username!!!"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Telephone
            </label>
            <input
              type="number"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ovoz berishda foydalanilgan nomer"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Tasdiqlash
          </button>
        </form>

        {error && (
          <div className="bg-red-100 p-4 rounded-md mt-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 p-4 rounded-md mt-4">
            <p className="text-green-600">{successMessage}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center">
                <p className="text-xl font-semibold text-blue-500">
                  Username: {item.username}
                </p>
                <p className="text-gray-600">Telephone: {item.telephone}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Malumot yoq</p>
        )}
      </div>
    </div>
  );
}

export default App;
