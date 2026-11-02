# Periodic Element API

A fast, free, open-source REST API for looking up chemical elements by **name**, **symbol**, or **atomic number**. Returns clean structured JSON and runs on Cloudflare Workers' global edge network.

**Base URL**

```
https://periodic.uzairmugakh90.workers.dev/api
```

---

## Features

- Query by name, symbol, or atomic number
- Full element data or summary-only responses
- Random element endpoint
- Full dataset dump in one request
- Structured JSON with consistent error responses
- Hosted on Cloudflare Workers: no cold starts, low latency worldwide
- MIT licensed

---

## Endpoints

All endpoints are `GET` requests on `/api` and take query parameters.

| Purpose | Query | Example |
|---|---|---|
| By name | `name=<element>` | `/api?name=hydrogen` |
| By symbol | `symbol=<symbol>` | `/api?symbol=H` |
| By atomic number | `number=<n>` | `/api?number=1` |
| Summary only | add `summaryOnly=true` | `/api?name=hydrogen&summaryOnly=true` |
| All elements | `all=true` | `/api?all=true` |
| Random element | `random=true` | `/api?random=true` |
| Random summary | `random=true&summaryOnly=true` | `/api?random=true&summaryOnly=true` |

### Quick start with cURL

```bash
curl "https://periodic.uzairmugakh90.workers.dev/api?name=hydrogen"
```

---

## Response Format

### Full element data

```json
{
  "name": "Hydrogen",
  "symbol": "H",
  "number": 1,
  "appearance": "colorless gas",
  "atomic_mass": 1.008,
  "boil": 20.271,
  "melt": 13.99,
  "density": 0.08988,
  "molar_heat": 28.836,
  "category": "diatomic nonmetal",
  "phase": "Gas",
  "period": 1,
  "xpos": 1,
  "ypos": 1,
  "shells": [1],
  "electron_configuration": "1s1",
  "electron_affinity": 72.769,
  "electronegativity_pauling": 2.2,
  "ionization_energies": [1312],
  "cpk-hex": "ffffff",
  "discovered_by": "Henry Cavendish",
  "named_by": "Antoine Lavoisier",
  "summary": "Hydrogen is a chemical element with symbol H and atomic number 1. It is the lightest element in the periodic table.",
  "source": "https://en.wikipedia.org/wiki/Hydrogen",
  "spectral_img": "https://upload.wikimedia.org/wikipedia/commons/e/e4/Hydrogen_Spectra.jpg"
}
```

### Summary only

```json
{
  "summary": "Hydrogen is a chemical element with symbol H and atomic number 1. It is the lightest element in the periodic table."
}
```

### Errors

| Case | Request | Response |
|---|---|---|
| Invalid atomic number | `/api?number=abc` | `{ "error": "Invalid atomic number format." }` |
| Unknown element | `/api?name=unknown_element` | `{ "error": "Element not found!" }` |

---

## Usage Examples

### JavaScript

```js
const API_BASE = "https://periodic.uzairmugakh90.workers.dev/api";

async function getElement(query) {
  // Try by name first, fall back to symbol
  let res = await fetch(`${API_BASE}?name=${encodeURIComponent(query)}`);
  let data = await res.json();

  if (data.error) {
    res = await fetch(`${API_BASE}?symbol=${encodeURIComponent(query)}`);
    data = await res.json();
  }
  return data;
}

getElement("oxygen").then(console.log);
```

### Python

```python
import requests

API = "https://periodic.uzairmugakh90.workers.dev/api"

r = requests.get(API, params={"number": 6})
print(r.json()["name"])  # Carbon
```

### Bash

```bash
curl -s "https://periodic.uzairmugakh90.workers.dev/api?random=true&summaryOnly=true" | jq -r .summary
```

---

## Why Cloudflare Workers?

- **Global edge network:** responses served from locations worldwide
- **No cold starts:** always ready, no server wake-up delay
- **Built-in DDoS protection**
- **Generous free tier:** 100,000 requests per day on the free plan

The API was originally written in Python/Flask on Railway and later rewritten in JavaScript for Cloudflare Workers, cutting typical response times from roughly 200-500ms to 50-100ms.

---

## Contributing

Contributions are welcome. Fork the repo, make your changes, and open a pull request. For bugs or feature requests, open an issue or email me.

---

## About the Author

**Uzair Mughal** is a full-stack developer, penetration tester, and web security engineer who builds Android apps (Kotlin, Jetpack Compose) and Linux apps, and works with Next.js, Firebase, and blockchain tech.

- GitHub: [@uzairdeveloper223](https://github.com/uzairdeveloper223)
- Website: [uzair.is-a.dev](https://uzair.is-a.dev)
- LinkedIn: [uzairmughal001](https://www.linkedin.com/in/uzairmughal001)
- Email: [contact@uzair.is-a.dev](mailto:contact@uzair.is-a.dev)

---

## License

Released under the [MIT License](LICENSE).
