from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/generate-triangle", methods=["POST"])
def generate_triangle():
    number = int(request.json["number"])
    result = generate_triangle_logic(number)
    return jsonify({"triangle": result})


def generate_triangle_logic(number):
    number_str = str(number)
    length = len(number_str)
    lines = []
    index = 0

    for i in range(1, length + 1):
        if index + 1 <= length:
            lines.append(number_str[index:index + i])
            index += i

    return "\n".join(lines)


@app.route('/generate-odds', methods=['POST'])
def generate_odds():
    number = int(request.json['number'])
    result = generate_odds_logic(number)
    return jsonify({'odds': result})


def generate_odds_logic(number):
    return ", ".join([str(i) for i in range(1, number + 1, 2)])


@app.route('/generate-primes', methods=['POST'])
def generate_primes():
    number = int(request.json['number'])
    result = generate_primes_logic(number)
    return jsonify({'primes': result})


def generate_primes_logic(number):
    primes = []
    for num in range(2, number + 1):
        if all(num % i != 0 for i in range(2, int(num ** 0.5) + 1)):
            primes.append(num)
    return ", ".join(map(str, primes))


if __name__ == '__main__':
    app.run(debug=True)
