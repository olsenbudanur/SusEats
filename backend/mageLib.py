import requests
import json


def MageCall(param1, param2):
    url = "https://api.mage.ai/v1/predict"

    payload = json.dumps({
    "api_key": "MBhHDft3bLlyww5J0CnNiFsyPSSxnKfRXI8D3Iqh",
    "features": [
        {
        "id": param1
        },
        {
        "id": param2
        }
    ],
    "include_features": False,
    "model": "recommendations_rank_1646591694022",
    "version": "1"
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)
    
    js = json.loads(response.text)
    
    return js[0]['prediction']
