## PeriodicElementAPI🌟

This API provides detailed information about chemical elements from the periodic table based on their name, atomic number, or symbol.

# 📢 Features:
✅ Query elements by name, atomic number, or symbol.
✅ Returns structured JSON data.
✅ Free & open-source!
✅ **NEW**: Now hosted on Cloudflare Workers for lightning-fast global performance!

---

## 🔍 Search for an Element

# 1️⃣ Search by Name

URL:
```
https://periodic-elements-api.periodic-elements-api.workers.dev/api?name=hydrogen
```
🔹 Returns full data of Hydrogen.

# 2️⃣ Search by Symbol

URL:
```
https://periodic-elements-api.periodic-elements-api.workers.dev/api?symbol=H
```
🔹 Returns full data of Hydrogen.

# 3️⃣ Search by Atomic Number

URL:
```
https://periodic-elements-api.periodic-elements-api.workers.dev/api?number=1
```
🔹 Returns full data of Hydrogen.

# 4️⃣ Summary Only for an Element

URL:
```
https://periodic-elements-api.periodic-elements-api.workers.dev/api?name=hydrogen&summaryOnly=true
```
🔹 Returns only the summary of Hydrogen.

---

# 📜 Get All Elements

URL:
```
https://periodic-elements-api.periodic-elements-api.workers.dev/api?all=true
```
🔹 Returns all elements in the database.

---

## 🎲 Random Element Features

# 5️⃣ Get a Random Element

URL:
```
https://periodic-elements-api.periodic-elements-api.workers.dev/api?random=true
```
🔹 Returns a random element from the database.

# 6️⃣ Get Summary of a Random Element

URL:
```
https://periodic-elements-api.periodic-elements-api.workers.dev/api?random=true&summaryOnly=true
```
🔹 Returns only the summary of a random element.

---

## 🔔 Example Responses

# ✅ Full Element Data
```json
{
    "name": "Hydrogen",
    "appearance": "colorless gas",
    "atomic_mass": 1.008,
    "boil": 20.271,
    "category": "diatomic nonmetal",
    "density": 0.08988,
    "discovered_by": "Henry Cavendish",
    "melt": 13.99,
    "molar_heat": 28.836,
    "named_by": "Antoine Lavoisier",
    "number": 1,
    "period": 1,
    "phase": "Gas",
    "source": "https://en.wikipedia.org/wiki/Hydrogen",
    "spectral_img": "https://upload.wikimedia.org/wikipedia/commons/e/e4/Hydrogen_Spectra.jpg",
    "summary": "Hydrogen is a chemical element with symbol H and atomic number 1. It is the lightest element in the periodic table.",
    "symbol": "H",
    "xpos": 1,
    "ypos": 1,
    "shells": [1],
    "electron_configuration": "1s1",
    "electron_affinity": 72.769,
    "electronegativity_pauling": 2.2,
    "ionization_energies": [1312],
    "cpk-hex": "ffffff",
    "footer": "Made by Developer Uzair. If you see a bug or want to request something more, email: uzairdeveloper@proton.me"
}
```

---

# ✅ Summary Only Response
```json
{
    "summary": "Hydrogen is a chemical element with symbol H and atomic number 1. It is the lightest element in the periodic table."
}
```

---

## 🔴 Error Handling

❌ Invalid Atomic Number

URL:
```
https://periodic-elements-api.periodic-elements-api.workers.dev/api?number=abc
```
🔹 Response:
```json
{
    "error": "Invalid atomic number format."
}
```

# ❌ Element Not Found

URL:
```
https://periodic-elements-api.periodic-elements-api.workers.dev/api?name=unknown_element
```
🔹 Response:
```json
{
    "error": "Element not found!"
}
```

---

## 📡 cURL Example

You can fetch element data directly from the terminal using curl:
```bash
curl -X GET "https://periodic-elements-api.periodic-elements-api.workers.dev/api?name=Hydrogen"
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
    <title>Periodic Element API</title>
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
            margin: 5px;
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
        input {
            padding: 10px;
            font-size: 16px;
            width: 70%;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔬 Periodic Element API</h1>
        <p><strong>⚡ Powered by Cloudflare Workers for lightning-fast global performance!</strong></p>
        <input type="text" id="elementInput" placeholder="Enter element name or symbol...">
        <button onclick="fetchElement()">Search</button>
        <button onclick="fetchRandomElement()">Get Random Element</button>
        <div id="result">Enter an element name or click a button...</div>
    </div>

    <script>
        const API_BASE = 'https://periodic-elements-api.periodic-elements-api.workers.dev/api';

        function fetchElement() {
            let element = document.getElementById("elementInput").value.trim();
            if (!element) {
                document.getElementById("result").innerHTML = `<p style="color: red;">Please enter an element name or symbol.</p>`;
                return;
            }

            // Try to fetch by name first, then by symbol if not found
            fetch(`${API_BASE}?name=${element}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    // Try by symbol if name search failed
                    return fetch(`${API_BASE}?symbol=${element}`).then(res => res.json());
                }
                return data;
            })
            .then(data => displayElementData(data))
            .catch(error => showError(error));
        }

        function fetchRandomElement() {
            fetch(`${API_BASE}?random=true`)
            .then(response => response.json())
            .then(data => displayElementData(data))
            .catch(error => showError(error));
        }

        function displayElementData(data) {
            if (data.error) {
                document.getElementById('result').innerHTML = `<p style="color: red;">${data.error}</p>`;
                return;
            }

            let output = `
                <h2>${data.name} (${data.symbol})</h2>
                <table>
                    <tr><th>Atomic Number</th><td>${data.number}</td></tr>
                    <tr><th>Atomic Mass</th><td>${data.atomic_mass}</td></tr>
                    <tr><th>Electron Configuration</th><td>${data.electron_configuration}</td></tr>
                    <tr><th>Category</th><td>${data.category}</td></tr>
                    <tr><th>Period</th><td>${data.period}</td></tr>
                    <tr><th>Density</th><td>${data.density ? data.density + " g/cm³" : "N/A"}</td></tr>
                    <tr><th>Melting Point</th><td>${data.melt ? data.melt + " K" : "N/A"}</td></tr>
                    <tr><th>Boiling Point</th><td>${data.boil ? data.boil + " K" : "N/A"}</td></tr>
                    <tr><th>Summary</th><td>${data.summary}</td></tr>
                    <tr><th>Discovered By</th><td>${data.discovered_by || "Unknown"}</td></tr>
                    <tr><th>More Info</th><td><a href="${data.source}" target="_blank">Wikipedia</a></td></tr>
                </table>
                <p style="font-size: 12px; color: #666; margin-top: 15px;">${data.footer}</p>
            `;
            document.getElementById('result').innerHTML = output;
        }

        function showError(error) {
            document.getElementById('result').innerHTML = `<p style="color: red;">Error fetching data! Please try again.</p>`;
            console.error('Error fetching data:', error);
        }
    </script>
</body>
</html>
```

---

## 🚀 API Performance Benefits

### ⚡ **Cloudflare Workers Advantages:**
- **Global Edge Network**: API responses served from 200+ locations worldwide
- **No Cold Starts**: Always-on performance, no waiting for server wake-up
- **99.9% Uptime SLA**: Much more reliable than traditional hosting
- **Built-in DDoS Protection**: Enterprise-grade security included
- **Free Tier**: 100,000 requests per day at no cost

### 📊 **Performance Comparison:**
| Feature | Railway (Previous) | Cloudflare Workers (New) |
|---------|-------------------|--------------------------|
| Global CDN | ❌ | ✅ |
| Cold Starts | ⚠️ Yes | ✅ None |
| Free Tier | ⚠️ Limited Trial | ✅ 100k requests/day |
| Response Time | ~200-500ms | ~50-100ms |
| Uptime | ~95% | 99.9% SLA |

---

## 🛠 Contributing

✅ Feel free to fork the repository & submit pull requests!
✅ Contributions are welcome!

---

## 👨‍💻 Credits

🔹 API created by **Developer Uzair** (uzairdeveloper@proton.me)
🔹 Originally developed in **Python/Flask**
🔹 **NEW**: Migrated to **JavaScript/Cloudflare Workers** for better performance
🔹 Hosted on **Cloudflare Workers** global edge network

---

## 🌐 Your Other Projects

Check out more projects by Developer Uzair:
- 🌍 **ChatX**: [chatx-orcin.vercel.app](https://chatx-orcin.vercel.app/)
- ❔ **Mystery Mart** : [Mystery Mart](https://mystery-mart-app.vercel.app)
- 📸 **FireGram**: [Firegram](https://firegram-social-app.vercel.app/)
- ℹ️ **Info Hub**: [info-here.rf.gd](https://info-here.rf.gd)
- 🔧 **Tools**: [for-myuse.infinityfreeapp.com](https://for-myuse.infinityfreeapp.com)

---

## 📜 License

📄 This project is licensed under the MIT License. See the LICENSE file for details.

---

## 📞 Support & Contact

- 📧 **Email**: uzairdeveloper@proton.me
- 🐛 **Bug Reports**: Found a bug? Email us!
- 💡 **Feature Requests**: Have an idea? We'd love to hear it!
- ⭐ **Rate Limiting**: Free tier includes 100,000 requests per day

---

*🚀 Powered by Cloudflare Workers for lightning-fast global performance!*
