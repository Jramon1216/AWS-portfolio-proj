import json
import boto3
from dotenv import load_dotenv
import os

def lambda_handler(event, context):
    # Resources
    database = boto3.resource('dynamodb')
    table = database.Table((os.getenv("DYNAMODB_TABLE_NAME")))
    user_id = event['queryStringParameters']['userID']   

    try:
        response = table.get_item(
            Key={
                'userID': user_id
            }
        )

        item = response['Item']
        
        return {
            'statusCode': 200,
            'body': json.dumps({ "data": item })
        }
    except Exception as e:
        return{
            'statusCode': 500,
            'body':json.dumps(f'Error: {str(e)}')
        }  