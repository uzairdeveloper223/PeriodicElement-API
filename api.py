from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Load periodic table data from data.json
with open("data.json", "r", encoding="utf-8") as file:
    periodic_table = json.load(file)

@app.route('/api', methods=['GET'])
def get_element():
    symbol = request.args.get('symbol')
    name = request.args.get('name')
    number = request.args.get('number')

    # Convert number to integer if provided
    if number:
        try:
            number = int(number)
        except ValueError:
            return jsonify({"error": "Invalid atomic number format."})

    # Search for the element
    for element in periodic_table:
        if symbol and element["symbol"].lower() == symbol.lower():
            return jsonify(format_response(element))
        if name and element["name"].lower() == name.lower():
            return jsonify(format_response(element))
        if number and element["atomicNumber"] == number:
            return jsonify(format_response(element))

    return jsonify({"error": "Element not found!"})

def format_response(element):
    """Adds footer message to response."""
    response = element.copy()
    response["footer"] = "Made by Developer Uzair with help of ChatGPT. If you see a bug or want to request something more, email: uzairdeveloper@proton.me"
    return response

if __name__ == '__main__':
    app.run(debug=True)