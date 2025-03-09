import os
import json
import random
import difflib
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Allow requests from any domain
CORS(app, resources={r"/*": {"origins": "*"}})

# Load periodic table data from data.json
try:
    with open("data.json", "r", encoding="utf-8") as file:
        periodic_table = json.load(file)
except FileNotFoundError:
    print("Error: data.json file not found.")
    periodic_table = []

@app.route('/api', methods=['GET'], strict_slashes=False)
def get_element():
    """Handles requests for elements, filtering, and listing."""
    symbol = request.args.get('symbol')
    name = request.args.get('name')
    number = request.args.get('number')
    summary_only = request.args.get('summaryOnly', 'false').lower() == 'true'
    get_all = request.args.get('all', 'false').lower() == 'true'
    get_random = request.args.get('random', 'false').lower() == 'true'
    category = request.args.get('category')
    phase = request.args.get('phase')
    discovered_by = request.args.get('discovered_by')
    atomic_range = request.args.get('range')

    # Return all elements if 'all=true'
    if get_all:
        return jsonify([format_response(el, summary_only) for el in periodic_table])

    # Return a random element (summaryOnly applied if requested)
    if get_random:
        random_element = random.choice(periodic_table)
        return jsonify(format_response(random_element, summary_only))

    # Convert number to integer if provided
    if number:
        try:
            number = int(number)
        except ValueError:
            return jsonify(error_response("Invalid atomic number format.")), 400

    # Normalize inputs for case-insensitive matching
    symbol = symbol.lower() if symbol else None
    name = name.lower() if name else None
    category = category.lower() if category else None
    phase = phase.lower() if phase else None
    discovered_by = discovered_by.lower() if discovered_by else None

    # Filter elements by query parameters
    filtered_elements = periodic_table
    if category:
        filtered_elements = [el for el in filtered_elements if el.get("category", "").lower() == category]
    if phase:
        filtered_elements = [el for el in filtered_elements if el.get("phase", "").lower() == phase]
    if discovered_by:
        filtered_elements = [el for el in filtered_elements if el.get("discovered_by", "").lower() == discovered_by]

    # Handle atomic number range filtering
    if atomic_range:
        try:
            start, end = map(int, atomic_range.split('-'))
            filtered_elements = [el for el in filtered_elements if start <= el["number"] <= end]
        except ValueError:
            return jsonify(error_response("Invalid range format. Use 'range=start-end'.")), 400

    # If filters are applied, return matching elements
    if category or phase or discovered_by or atomic_range:
        if filtered_elements:
            return jsonify([format_response(el, summary_only) for el in filtered_elements])
        return jsonify(error_response("No elements match your filter criteria.")), 404

    # Search for a single element by name, symbol, or number
    best_match = None
    for element in periodic_table:
        if symbol and element["symbol"].lower() == symbol:
            best_match = element
            break
        if name and element["name"].lower() == name:
            best_match = element
            break
        if number and element["number"] == number:
            best_match = element
            break

    # Use fuzzy matching if an exact match isn't found
    if not best_match and name:
        names_list = [el["name"].lower() for el in periodic_table]
        close_matches = difflib.get_close_matches(name, names_list, n=1, cutoff=0.7)
        if close_matches:
            best_match = next(el for el in periodic_table if el["name"].lower() == close_matches[0])

    if best_match:
        return jsonify(format_response(best_match, summary_only))

    return jsonify(error_response("Element not found!")), 404

def format_response(element, summary_only=False):
    """Formats response based on summaryOnly flag."""
    response = {"footer": "Made by Developer Uzair. If you see a bug or want to request something more, email: uzairdeveloper@proton.me"}
    
    if summary_only:
        response["summary"] = element.get("summary", "Summary not available.")
    else:
        response.update(element)

    return response

def error_response(message):
    """Formats error messages consistently."""
    return {
        "error": message,
        "footer": "Contact Developer Uzair for help at: uzairdeveloper@proton.me"
    }

# Log API requests
@app.before_request
def log_request():
    print(f"Received {request.method} request on {request.path} with params {request.args}")

# Set port from environment variable for Railway
PORT = int(os.environ.get("PORT", 5000))
app.run(host="0.0.0.0", port=PORT, debug=True)
