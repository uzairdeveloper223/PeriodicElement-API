## PeriodicElementAPI🌟

This API provides detailed information about chemical elements from the periodic table based on their name, atomic number, or symbol.

# 📢 Features:
✅ Query elements by name, atomic number, or symbol.
✅ Returns structured JSON data.
✅ Free & open-source!


---

## 🚀 Usage

# 📌 API Endpoints

# 1️⃣ Get element by name
```
https://periodicelement-api-production.up.railway.app/api?name={element_name}
```
Example:
```
https://periodicelement-api-production.up.railway.app/api?name=Hydrogen
```
# 2️⃣ Get element by atomic number
```
https://periodicelement-api-production.up.railway.app/api?number={atomic_number}
```
Example:
```
https://periodicelement-api-production.up.railway.app/api?number=1
```
# 3️⃣ Get element by symbol
```
https://periodicelement-api-production.up.railway.app/api?symbol={element_symbol}
```
Example:
```
https://periodicelement-api-production.up.railway.app/api?symbol=H
```

---

## 📡 cURL Example

You can fetch element data directly from the terminal using curl:
```bash
curl -X GET "https://periodicelement-api-production.up.railway.app/api?name=Hydrogen"
```

---

## 📊 Response Example
```json
{
  "atomicMass": 1.008,
  "atomicNumber": 1,
  "electronicConfiguration": "1s1",
  "footer": "Made by Developer Uzair. If you see a bug or want to request something more, email: uzairdeveloper@proton.me",
  "groupBlock": "Nonmetal",
  "name": "Hydrogen",
  "period": 1,
  "purposes": [
    "Fuel in rockets",
    "Production of ammonia for fertilizers",
    "Hydrogenation of fats and oils"
  ],
  "symbol": "H",
  "yearDiscovered": 1766
}
```

---

## 🖥️ Usage in HTML

To fetch element data dynamically in an HTML page:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Periodic Element API Example</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; text-align: left; }
        button { padding: 10px 15px; background: #007bff; color: white; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <h1>🔬 Fetch Element Data</h1>
    <button onclick="fetchElementData()">Get Hydrogen Info</button>
    <pre id="result">Click the button to fetch data...</pre>

    <script>
        function fetchElementData() {
            fetch('https://periodicelement-api-production.up.railway.app/api?name=Hydrogen')
            .then(response => response.json())
            .then(data => {
                document.getElementById('result').textContent = JSON.stringify(data, null, 2);
            })
            .catch(error => console.error('Error fetching data:', error));
        }
    </script>
</body>
</html>
```
🔹 Example Output:
When you click the button, it will display Hydrogen’s data in the <pre> block.


---

## 🛠 Contributing

✅ Feel free to fork the repository & submit pull requests!
✅ Contributions are welcome!


---

## 👨‍💻 Credits

🔹 API created by **UzairDeveloper223**
🔹 Developed in **Python and JSON**
🔹 Hosted on **Railway**


---

## 📜 License

📄 This project is licensed under the MIT License. See the LICENSE file for details.

