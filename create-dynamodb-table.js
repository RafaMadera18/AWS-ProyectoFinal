import 'dotenv/config';

console.log('ENV TEST:', {
  region: process.env.AWS_REGION,
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY,
  token: process.env.AWS_SESSION_TOKEN,
});

import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
});

const params = {
  TableName: 'sesiones-alumnos',
  KeySchema: [
    { AttributeName: 'sessionString', KeyType: 'HASH' }, // Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: 'sessionString', AttributeType: 'S' },
  ],
  BillingMode: 'PAY_PER_REQUEST', // On-demand billing
};

async function createTable() {
  try {
    const command = new CreateTableCommand(params);
    const response = await client.send(command);
    console.log(
      'Tabla creada exitosamente:',
      response.TableDescription.TableName,
    );
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log('La tabla ya existe');
    } else {
      console.error('Error al crear la tabla:', error);
    }
  }
}

createTable();
