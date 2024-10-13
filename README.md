#PeriodicElementAPI

This API provides information about chemical elements from the periodic table based on their name, atomic number, or symbol. The API returns data such as the element's atomic mass, group, period, electronic configuration, and common uses.

##Features

Query elements by name, atomic number, or symbol.

Returns detailed information in JSON format.

Free and open-source.


#Usage

##API Endpoints

1. Get element by name:
```
GET http://api-uzair.rf.gd/PeriodicElement/api.php?name={element_name}
```
Example:
``
GET http://api-uzair.rf.gd/PeriodicElement/api.php?name=Hydrogen
```

2. Get element by atomic number:
```
GET http://api-uzair.rf.gd/PeriodicElement/api.php?number={atomic_number}
```
Example:
```
GET http://api-uzair.rf.gd/PeriodicElement/api.php?number=1
```

3. Get element by symbol:
```
GET http://api-uzair.rf.gd/PeriodicElement/api.php?symbol={element_symbol}
```
Example:
```
GET http://api-uzair.rf.gd/PeriodicElement/api.php?symbol=H
```


Response Example
```json
{
    "name": "Hydrogen",
    "symbol": "H",
    "atomicNumber": 1,
    "atomicMass": 1.008,
    "groupBlock": "Nonmetal",
    "period": 1,
    "electronicConfiguration": "1s1",
    "yearDiscovered": 1766,
    "purposes": [
        "Fuel in rockets",
        "Production of ammonia for fertilizers",
        "Hydrogenation of fats and oils"
    ]
}
```
##Usage in HTML

To fetch element data using this API in an HTML page, you can use the following JavaScript example:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Periodic Element API Example</title>
</head>
<body>
    <h1>Fetch Element Data</h1>
    <button onclick="fetchElementData()">Get Hydrogen Info</button>
    <pre id="result"></pre>

    <script>
        function fetchElementData() {
            fetch('http://api-uzair.rf.gd/PeriodicElement/api.php?name=Hydrogen')
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
Example Output:

When you click the button, it will display Hydrogen's data in the <pre> block in a formatted JSON structure.

##Contributing

Feel free to fork the repository and submit pull requests. Contributions are welcome!

#Credits

API created by UzairDeveloper223

Made using PHP.

Hosted on InfinityFree.


#License

This project is licensed under the MIT License. See the [LICENSE] file for details.

