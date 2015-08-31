from flask import Flask
app = Flask(__name__)

@app.route('/')
def api_root():
    return 'This is Might, the API for Sorcery'

if __name__ == '__main__':
    app.run()