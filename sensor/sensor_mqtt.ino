#include <DHT.h>

#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>

#define DHTPIN D4     // Pino ao qual o sensor DHT11 está conectado (D0 no ESP8266)
#define DHTTYPE DHT11 // Tipo do sensor DHT11


const char* ssid = "callidus_lab";
const char* password = "c@llidus$t3ch$l@b!!";

const char* mqtt_server = "10.20.50.158";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();

  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");
      // Subscribe
      client.subscribe("esp8266/output");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void loop() {
  delay(2000);

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();

  if (now - lastMsg > 5000) {
    lastMsg = now;

    float temperatura = dht.readTemperature();
    float humidade = dht.readHumidity();

    if (!isnan(temperatura)) {
      Serial.print("Temperatura: ");
      Serial.print(temperatura);
      Serial.println(" °C");
      client.publish("esp8266/temperature", String(temperatura).c_str());

    } else {
      Serial.println("Falha na leitura do sensor DHT11 (temperatura)");
    }

    if(!isnan(humidade)) {
      Serial.print("Humidade: ");
      Serial.print(humidade);
      Serial.println("%");
      client.publish("esp8266/humidity", String(humidade).c_str());

    } else {
      Serial.println("Falha na leitura do sensor DHT11 (humidade)");
    }
  }  
}
