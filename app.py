from flask import Flask, render_template,request, jsonify
import  openai
from logging import FileHandler,WARNING
from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    AIMessage,
    HumanMessage,
    SystemMessage
)

chat = ChatOpenAI(openai_api_key="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")

app = Flask(__name__, template_folder = 'templates')

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/get", methods=["GET", "POST"])
def bot():
    userInput =request.form['msg'] 
    input = userInput
    return get_Chat_response(input)

def get_Chat_response(text):
    #  response = openai.Completion.create(engine="gpt-3.5-turbo-instruct" , prompt=text , max_tokens=100)
    #  return response["choices"][0]["text"]
    message = [
    SystemMessage(content="You are a helpful assistant that answers questions related to the mining and coal industry of india and acts related to coals and mining in india ONLY and if question related to any other topic is asked you simply respond with 'I can only answer questions related to Ministry of Coals and Mining of India and its policies'.generate the answer in bullet points.limit your responses to under 25 words "),
    HumanMessage(content=text)]
    output = chat(messages=message)
    return output.content
   
    
    

if __name__ == '__main__':
    app.run(debug=True)
