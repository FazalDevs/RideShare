# 🚗 RideShare – Carpooling Application

![MERN](https://img.shields.io/badge/MERN-Stack-blueviolet?style=for-the-badge)
![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-Nominatim-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

RideShare is a MERN-based carpooling platform designed to connect passengers and drivers traveling in the same direction.
It enables users to create rides, search for matching routes, and share journeys efficiently while reducing travel costs and carbon emissions.

---

## ✨ Features

* 🚘 **Create Ride Listings** – Drivers can list rides with pickup, destination, date, time, and cost per passenger.
* 🔍 **Search & Filter Rides** – Passengers can search rides based on source, destination, and date.
* 🗺 **Route Visualization** – Optimized routes using **Nominatim (OpenStreetMap)** for geolocation and routing.
* 👥 **Book Seats** – Reserve available seats instantly.
* 🔐 **Secure Authentication** – Protected routes with JWT-based login.

---

## 🚀 Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Geolocation & Maps:** Nominatim API (OpenStreetMap)
* **Authentication:** JWT & bcrypt

---

## 🛠 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/rideshare.git
cd rideshare
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the project root and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NOMINATIM_BASE_URL=https://nominatim.openstreetmap.org
```

### 4️⃣ Start the development server

```bash
npm run dev
```

---

## 📂 Folder Structure

```
rideshare/
│── client/          # React frontend
│── server/          # Express backend
│   ├── models/      # MongoDB schemas
│   ├── routes/      # API endpoints
│   ├── controllers/ # Business logic
│── README.md
```

---

## 📸 Screenshots

*(Add your screenshots here using markdown image tags)*

```markdown
![Home Page](./assets/homepage.png)
![Search Results](./assets/search.png)
![Route Map](./assets/route-map.png)
```

---

## 🏗 Future Enhancements

* 📍 Real-time ride tracking with live location updates
* 💬 In-app chat between drivers and passengers
* 💳 Online payments (UPI/Stripe)
* ⭐ Ratings and reviews for better reliability

---

## 🤝 Contributing

Contributions are welcome!

1. Fork this repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Added feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 💌 Contact

💼 LinkedIn: [Fazal Memon](https://www.linkedin.com/in/fazal-memon/)

---

*"Making travel affordable, efficient, and sustainable with RideShare."*
