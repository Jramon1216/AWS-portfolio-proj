import json
import uuid
import boto3
import qrcode # imported via lambda layer
from io import BytesIO
from dotenv import load_dotenv
import os

def lambda_handler(event, context):
    try:
        # Resources
        s3 = boto3.client('s3')
        data = json.loads(event['body'])
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(os.getenv("DYNAMODB_TABLE_NAME"))    

        # Data
        firstname = data['firstName']
        lastname = data['lastName']
        email = data['email']
        user_id = str(uuid.uuid4())

        # Put user data and corresponding id into dynamodb table
        table.put_item(
            Item={
                'userID': user_id,
                'firstName': firstname,
                'lastName': lastname,
                'email': email
            }
        )

        # Create QR with URL pointing to the API Gateway
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=5
        )
        
        api_gateway_url = os.getenv("API_GATEWAY_URL_GETUSER")
        print(api_gateway_url) # print statement for testing 
        qr.add_data(api_gateway_url)
        qr.make(fit=True)
        img = qr.make_image(fill='black', back_color='white')

        buffer = BytesIO()
        img.save(buffer, 'PNG')
        buffer.seek(0)

        # Store created QR code in the S3 bucket for frontend retrieval 
        s3.put_object(
            Bucket=os.getenv("S3_BUCKET_NAME"),
            Key=f'qr_codes/{user_id}.png',
            Body=buffer,
            ContentType='image/png'
        )

        return {
            'statusCode': 200,
            'body': json.dumps('Item added and QR code generated')
        }
    
    except Exception as e: # handle exception in case the whole thing goes boom
        return {
            'statusCode': 500,
            'body':json.dumps(f'Error: {str(e)}')
        }