import os
import json
import random
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Allow requests from any domain
CORS(app, resources={r"/*": {"origins": "*"}})

# Load periodic table data from data.json
with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Ensure "elements" exists in JSON
if "elements" not in data or not isinstance(data["elements"], list):
    raise ValueError("Invalid data.json format! Expected a dictionary with an 'elements' list.")

periodic_table = data["elements"]

@app.route('/api', methods=['GET'])
def get_element():
    """Handles API requests for periodic table elements."""
    symbol = request.args.get('symbol')
    name = request.args.get('name')
    number = request.args.get('number')
    summary_only = request.args.get('summaryOnly', '').lower() == 'true'
    get_all = request.args.get('all', '').lower() == 'true'
    random_element = request.args.get('random', '').lower() == 'true'

    # Get all elements
    if get_all:
        return jsonify(periodic_table)

    # Get a random element's summary
    if random_element:
        random_elem = random.choice(periodic_table)
        return jsonify({"summary": random_elem["summary"]}) if summary_only else jsonify(random_elem)

    # Convert number to integer if provided
    if number:
        try:
            number = int(number)
        except ValueError:
            return jsonify({"error": "Invalid atomic number format."})

    # Search for the element
    for element in periodic_table:
        if symbol and element["symbol"].lower() == symbol.lower():
            return jsonify(format_response(element, summary_only))
        if name and element["name"].lower() == name.lower():
            return jsonify(format_response(element, summary_only))
        if number and element["number"] == number:
            return jsonify(format_response(element, summary_only))

    return jsonify({"error": "Element not found!"})

def format_response(element, summary_only):
    """Formats the response, adding a footer message. Supports summary-only mode."""
    if summary_only:
        return {"summary": element["summary"]}
    
    response = element.copy()
    response["footer"] = "Made by Developer Uzair. If you see a bug or want to request something more, email: uzairdeveloper@proton.me"
    return response

# Set port from environment variable for Railway
PORT = int(os.environ.get("PORT", 5000))
app.run(host="0.0.0.0", port=PORT)
