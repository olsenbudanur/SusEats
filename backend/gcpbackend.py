import os
import pymongo
import json
import random
import hashlib
import time

import requests

from hashlib import sha256




def MageCall(param1):
    url = "https://api.mage.ai/v1/predict"

    payload = json.dumps({
    "api_key": "REDACTED",
    "features": [
        {
        "id": param1
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






def sendsms(tonum, auctionid):


    url = "https://us-central1-aiot-fit-xlab.cloudfunctions.net/sendsms"

    payload = json.dumps({
    "receiver": tonum,
    "message": "Congratulations you have just won auction #" + auctionid +". Your payment has been processed via the blockchain. Please proceed to the restaurant ASAP to pick up your order. Thank you for using SusEats!",
    "token": "geturown damn token"
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    # print(response.text)

def hashthis(st):


    hash_object = hashlib.md5(st.encode())
    h = str(hash_object.hexdigest())
    return h



def dummy(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    if request.method == 'OPTIONS':
        # Allows GET requests from origin https://mydomain.com with
        # Authorization header
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Credentials': 'true'
        }
        return ('', 204, headers)

    # Set CORS headers for main requests
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    }

    request_json = request.get_json()



    receiver_public_key = os.environ.get('ownpublic')

    mongostr = os.environ.get('MONGOSTR')
    client = pymongo.MongoClient(mongostr)
    db = client["suseats"]


    retjson = {}

    action = request_json['action']


    
    if action == "magecall":
        param1 = request_json['userid']

        resp = MageCall(int(param1))

        retjson['restaurantids'] = resp

        return json.dumps(retjson)
    
    

    if action == "getbidsbyauction":
        col = db.bids

        data = []

        for x in col.find():
            if x['auctionid'] != request_json['auctionid']:
                continue
            ami = {}
            ami["id"] = x["id"]
            ami["userid"] = x["userid"]
            ami["auctionid"] = x["auctionid"]
            ami["auctionaddress"] = x["auctionaddress"]
            ami["uname"] = x["uname"]
            ami["uphone"] = x["uphone"]
            ami["amount"] = x["amount"]
            data.append(ami)

        retjson['bids'] = data

        return json.dumps(retjson)






    if action == "keygen":
        
        pair = Keypair.random()
        # print(f"Secret: {pair.secret}")
        # Secret: SCMDRX7A7OVRPAGXLUVRNIYTWBLCS54OV7UH2TF5URSG4B4JQMUADCYU
        # print(f"Public Key: {pair.public_key}")
        retjson['status'] = "generated"                
        retjson['secret'] = pair.secret
        retjson['public'] = pair.public_key
        

        return json.dumps(retjson)





    if action == "getuserdata":
        col = db.users
        for x in col.find():
            if int(x['id']) == int(request_json['userid']):
                name = x['name']

                address = x['address']


                retjson = {}

                # retjson['dish'] = userid
                retjson['status'] = "success"
                retjson['name'] = name
                retjson['address'] = address                
                retjson['email'] = x['email']
                retjson['phone'] = x['phone']
                retjson['cuisine'] = x['cuisine']
                retjson['publickey'] = x['publickey']
                

                return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['id'] = "-1"

        return json.dumps(retjson)


    if action == "updateuserdata":
        col = db.users
        for x in col.find():
            if int(x['id']) == int(request_json['id']):
                if 'name' in request_json:
                    col.update_one({"id": x['id']}, {"$set":{"name":request_json['name']}})
                if 'gender' in request_json:
                    col.update_one({"id": x['id']}, {"$set":{"gender":request_json['gender']}})
                if 'type' in request_json:
                    col.update_one({"id": x['id']}, {"$set":{"type":request_json['type']}})
                    
                # status = x['status']
                # diet = x['diet']
                # allergy = x['allergy']

                retjson = {}

                # retjson['dish'] = userid
                retjson['responsestatus'] = "success"
                # retjson['status'] = status
                # retjson['diet'] = diet
                # retjson['allergy'] = allergy
                

                return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['id'] = "-1"

        return json.dumps(retjson)







    if action == "notifywinner":
        bidid = request_json['winnerbidid']

        col = db.bids
        for x in col.find():
            if x['id'] == bidid:
                auctionid = x['auctionid']
                tonum = x['uphone']
                sendsms(tonum, auctionid)


                
                retjson = {}

                
                retjson['status'] = "success"
                
                

                return json.dumps(retjson)

        retjson['status'] = "fail -bid id not found"
        
        

        return json.dumps(retjson)




    if action == "getallauctions":
        col = db.auctions
        tables = []
        for x in col.find():
            table = {}

            table['auctionid'] = x['id']
            table['restaurantid'] = x['restaurantid']
            table['restaurantname'] = x['restname']
            table['cuisine'] = x['cuisine']
            table['description'] = x['description']
            table['imageurl'] = x['imageurl']
            table['expiry'] = x['expiry']
            table['address'] = x['address']

            tables.append(table)

            


        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "success"
        retjson['auctions'] = tables
        

        return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['id'] = "-1"

        return json.dumps(retjson)




    if action == "addbid" :
        maxid = 1
        col = db.bids
        for x in col.find():
            id = x["id"]
            maxid +=1
        id = str(maxid+1)

        col = db.users


        upubkey = ""
        uname = ""
        uphone = ""
        auctionaddress= ""

        for x in col.find():
            if x['id'] == request_json['userid']:
                uname = x['name']
                uphone = x['phone']
                upubkey = x['publickey']
                break
        
        col = db.auctions

        for x in col.find():
            if x['id'] == request_json['auctionid']:
                auctionaddress = x['address']
                break


        col = db.bids
        payload = {}

        uid = id 
        payload["id"] = id
        
        payload["auctionid"] = request_json['auctionid']
        payload["userid"] = request_json['userid']
        payload["auctionaddress"] = auctionaddress
        payload["uname"] = uname
        payload["uphone"] = uphone
        payload["upubkey"] = upubkey
        payload["status"] = 0
        payload["amount"] = request_json['amount']


        
        
        result=col.insert_one(payload)

        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['auctionid'] = id

        return json.dumps(retjson)



    if action == "addauction" :
        maxid = 1
        col = db.auctions
        for x in col.find():
            id = x["id"]
            maxid +=1
        id = str(maxid+1)

        col = db.restaurants

        restname = ""
        restadd = ""
        pubkey = ""

        for x in col.find():
            if x['id'] == request_json['restaurantid']:
                restname = x['name']
                restadd = x['address']
                pubkey = x['pubkey']
                break

        col = db.auctions

        payload = {}

        uid = id 
        payload["id"] = id
        
        payload["restaurantid"] = request_json['restaurantid']
        payload["address"] = request_json['address']
        payload["imageurl"] = request_json['imageurl']
        payload["cuisine"] = request_json['cuisine']
        payload["restname"] = restname
        payload["restaddress"] = restadd
        # payload["pubkey"] = pubkey
        payload["winneraddress"] = "-1"
        payload["description"] = request_json['description']
        payload["expiry"] = request_json['expiry']
        # payload["reserve"] = request_json['reserve']
        
            


        # payload["password"] = request_json['password']

        # if "age" in request_json:
        #     payload["age"] = request_json['age']
        # else:
        #     payload["age"] = "-1"
        # if "gender" in request_json:
        #     payload["gender"] = request_json['gender']
        # else:
        #     payload["gender"] = "great things happen after 2am"
        
        
        result=col.insert_one(payload)

        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['auctionid'] = id

        return json.dumps(retjson)


    if action == "registerrestaurant" :
        maxid = 1
        col = db.restaurants
        for x in col.find():
            id = x["id"]
            maxid +=1
        id = str(maxid+1)

        payload = {}

        uid = id 
        payload["id"] = id
        # payload["uid"] = request_json['uid']
        # payload["name"] = request_json['name']
        payload["name"] = request_json['name']
        payload["address"] = request_json['address']
        payload["pubkey"] = request_json['pubkey']

        payload["password"] = request_json['password']
        
        result=col.insert_one(payload)

        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['id'] = id

        return json.dumps(retjson)





    if action == "register" :
        maxid = 1
        col = db.users
        for x in col.find():
            id = x["id"]
            maxid +=1
        id = str(maxid+1)

        payload = {}

        uid = id 
        payload["id"] = id
        # payload["uid"] = request_json['uid']
        # payload["name"] = request_json['name']
        payload["name"] = request_json['name']
        payload["email"] = request_json['email']
        payload["phone"] = request_json['phone']

        payload['address'] = request_json['address']

        payload["password"] = request_json['password']

        # if "age" in request_json:
        #     payload["age"] = request_json['age']
        # else:
        #     payload["age"] = "-1"
        # if "gender" in request_json:
        #     payload["gender"] = request_json['gender']
        # else:
        #     payload["gender"] = "great things happen after 2am"
        
        payload["cuisine"] = request_json['cuisine']
        payload["publickey"] = request_json['publickey']
        
        result=col.insert_one(payload)

        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['userid'] = id

        return json.dumps(retjson)


    if action == "login":
        col = db.users
        for x in col.find():
            if x['email'] == request_json['email'] and x['password'] == request_json['password']:
                userid = x['id']
                name = x['name']
                retjson = {}

                # retjson['dish'] = userid
                retjson['status'] = "success"
                retjson['name'] = name
                retjson['userid'] = userid
                

                return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['userid'] = "-1"

        return json.dumps(retjson)




    if action == "loginrest":
        col = db.restaurants
        for x in col.find():
            if x['pubkey'] == request_json['pubkey'] and x['password'] == request_json['password']:
                restid = x['id']
                name = x['name']
                retjson = {}

                # retjson['dish'] = userid
                retjson['status'] = "success"
                retjson['name'] = name
                retjson['restid'] = restid
                

                return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['restid'] = "-1"

        return json.dumps(retjson)







    if action == "route":
        lat1 = request_json['start']['latitude']
        lng1 = request_json['start']['longitude']
        lat2 = request_json['end']['latitude']
        lng2 = request_json['end']['longitude']

        wp = getroute(lat1,lng1,lat2,lng2)

        retjson = {}
         # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['route'] = wp

        return json.dumps(retjson)
        


    if action == "routecache":
        lat1 = request_json['start']['latitude']
        lng1 = request_json['start']['longitude']
        lat2 = request_json['end']['latitude']
        lng2 = request_json['end']['longitude']

        # wp = getroute(lat1,lng1,lat2,lng2)

        wp = "[]"

        for x in col.find():
            wp = x['route']

        retjson = {}
         # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['route'] = wp

        return json.dumps(retjson)
 

    retstr = "action not done"

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return retstr
