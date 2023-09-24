from flask import Flask, render_template, request, jsonify
import  openai
openai.api_key = "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"



app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/get", methods=["GET", "POST"])
def chat():
    msg = request.form["msg"]
    input = msg
    return get_Chat_response(input)


def get_Chat_response(text):
    response = openai.Completion.create(engine="gpt-3.5-turbo-instruct" , prompt=input , max_tokens=50)
    return response["choices"][0]["text"]


    

if __name__ == '__main__':
    app.run(debug=True)