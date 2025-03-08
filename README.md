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
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
        }
        h1 {
            color: #007bff;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        button {
            padding: 10px 15px;
            background: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-size: 16px;
        }
        button:hover {
            background: #0056b3;
        }
        #result {
            margin-top: 20px;
            text-align: left;
            background: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            font-size: 14px;
            word-wrap: break-word;
        }
        table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background: #007bff;
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔬 Periodic Element API</h1>
        <button onclick="fetchElementData()">Get Hydrogen Info</button>
        <div id="result">Click the button to fetch data...</div>
    </div>

    <script>
        function fetchElementData() {
            fetch('https://periodicelement-api-production.up.railway.app/api?name=Hydrogen')
            .then(response => response.json())
            .then(data => {
                let output = `
                    <h2>${data.name} (${data.symbol})</h2>
                    <table>
                        <tr><th>Atomic Number</th><td>${data.atomicNumber}</td></tr>
                        <tr><th>Atomic Mass</th><td>${data.atomicMass}</td></tr>
                        <tr><th>Electron Configuration</th><td>${data.electronicConfiguration}</td></tr>
                        <tr><th>Group</th><td>${data.groupBlock}</td></tr>
                        <tr><th>Period</th><td>${data.period}</td></tr>
                        <tr><th>Year Discovered</th><td>${data.yearDiscovered}</td></tr>
                        <tr><th>Purposes</th><td>${data.purposes.join(', ')}</td></tr>
                        <tr><th>Footer</th><td>${data.footer}</td></tr>
                    </table>
                `;
                document.getElementById('result').innerHTML = output;
            })
            .catch(error => {
                document.getElementById('result').innerHTML = `<p style="color: red;">Error fetching data!</p>`;
                console.error('Error fetching data:', error);
            });
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

