import { create } from 'ipfs-http-client';
import {Buffer} from 'buffer';

const projectId = '2H9PlkW4WSouTWsmpuTOFFBGwB3';

const projectSecret = '84b9d3caccfcc2ee184864d597982b70';

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
});

export async function uploadTaskToIPFS (metadata) {
  try {
    // upload image to ipfs
    await client.add(metadata)
  } catch (error) {
    console.log('Error uploading metadata: ', error)
  } 
}