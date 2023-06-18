from datetime import datetime
import json
import requests
from flask import Flask, render_template
from flask_mqtt import Mqtt
from pymongo import MongoClient
app = Flask(__name__, template_folder='templates')

# Cấu hình kết nối tới broker
app.config['MQTT_BROKER_URL'] = 'mqtt3.thingspeak.com'
app.config['MQTT_BROKER_PORT'] = 1883
app.config["MQTT_TRANSPORT"] = "TCP"
app.config['MQTT_USERNAME'] = 'FDkHMSQlKCARAgYnMRgdGRI'
app.config['MQTT_CLIENT_ID'] = 'FDkHMSQlKCARAgYnMRgdGRI'
app.config['MQTT_PASSWORD'] = 'p6pV+gh6TRtB7KTq1VYVFI6s'
app.config['MQTT_KEEPALIVE'] = 60
app.config['MQTT_CLEAN_SESSION'] = True
app.config['MQTT_REFRESH_TIME'] = 5.0 # refresh time in seconds
# Khởi tạo đối tượng MQTT
mqtt = Mqtt(app)
mqtt.init_app(app)
topic1 = "channels/2188986/subscribe/fields/field1"

# Khởi tạo biến kết nối tới MongoDB
USERNAME = 'UIT20522097'
PASSWORD = '8M1JCE8eK49FikF5'
URL = f'mongodb+srv://UIT20522097:{PASSWORD}@uit20522097.yizbhkk.mongodb.net/?retryWrites=true&w=majority'
client = MongoClient(URL)
db = client['UIT20522097']


def insert_data(data):
    now = datetime.now()
    collection = db['temperature']
    document = {
        "temperature": data,
        "time": f"{now.hour}:{now.minute}:{now.second} {now.day}/{now.month}/{now.year}"
    }
    # Chèn dữ liệu vào collection
    result = collection.insert_one(document)
    if result.inserted_id:
        print('Data inserted successfully')
    else:
        print('Failed to insert data')

def get_data(number_of_data=20):
        # URL của endpoint hoặc API
    url = f'https://api.thingspeak.com/channels/2188986/feeds.json?results={number_of_data}'

    # Thực hiện yêu cầu GET để lấy dữ liệu từ server
    response = requests.get(url)

    # Kiểm tra mã trạng thái của phản hồi
    if response.status_code == 200:  # Mã trạng thái 200 đại diện cho thành công
        # Lấy dữ liệu từ phản hồi dưới dạng JSON
        data = response.json()

        # Xử lý dữ liệu theo nhu cầu của bạn
        # Ví dụ: lấy giá trị của trường "field1" trong dữ liệu
        field1_values = [feed['field1'] for feed in data['feeds']]

        # In ra giá trị của trường "field1"
        print(field1_values)
        return field1_values
    else:
        return get_data()

@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    print('Connected to MQTT broker')
    mqtt.subscribe(topic1)
    print("Subscribed to topic: " + topic1)

@mqtt.on_message()
def handle_message(client, userdata, message):
    topic = message.topic
    payload = message.payload.decode('utf-8')
    print(f'Received message: {payload} on topic: {topic}')
    # Xử lý dữ liệu nhận được ở đây
    insert_data(float(payload))




@app.route('/')
def index():
    return render_template('index.html')

""" @app.route('/chart', methods=['GET'])
def chart():
    data = get_data()
    return data

@app.route('/temperaturenow', methods=['GET'])
def temperaturenow():
    data = get_data(1)
    return data """

###################################################################################
if __name__ == '__main__':
    app.run(host="192.168.0.23" ,port=3001, debug=True)

###################################################################################



