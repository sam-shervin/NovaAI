from flask import Flask, request, jsonify, json
from langchain_community.llms import Ollama
app = Flask(__name__)


@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/<input_text>', methods=['GET'])
def process_text(input_text):
    input_text = input_text.replace('%20', ' ')
    input_text += "     GIVE ME A SCHEDULE WITH TIMINGS FOR EACH DAY AS MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY AND SATURDAY, WITH APPROPRIATE TRADE OFFS SO IT IMPROVES MY PRODUCTIVITY AS WELL AS MY HEALTH. GIVE ALL THE TEXTS STRICTLY IN JSON FORMAT SO IT WILL BE EASIER FOR ME TO SEND IT THROUGH AN API"
    print(input_text)
    llm = Ollama(model="llama2:7b")
    response = llm(input_text)
    start = response.find('{')
    end = response.rfind('}')

# Slice the string to get the dictionary part
    response = response[start:end+1]

    return jsonify(json.loads(response))

if __name__ == '__main__':
    app.run(debug=False, port=3001)