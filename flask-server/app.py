# save this as app.py

import model_load
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = 'upload'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
model_load.load_artifacts()

@app.route("/predict", methods=['POST'])
def classifywaste():
    if 'file' not in request.files:
        print('No file part')

        response= jsonify(error="no File found")
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    file = request.files['file']
   
    if file.filename == '':
        print('No selected file')
        response = jsonify(error="no File found")
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    if file and allowed_file(file.filename):

        filename = secure_filename(file.filename)
        print('file {} saved'.format(file.filename))
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        predicted_value= model_load.classify_waste('upload/'+filename)
        response= jsonify(predicted_value=predicted_value)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    else:
        response =  jsonify(error="extension not supported")
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

if __name__ == "__main__":
    app.run()