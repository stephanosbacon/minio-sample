var Minio = require('minio');

var minioClient = new Minio.Client({
    endPoint: 'minio-service.minio.svc',
    port: 9000,
    secure: true,
    accessKey: 'minio',
    secretKey: 'minio123'
});

minioClient.makeBucket('mybucket', 'us-east-1', function(err) {
  if (err) {
    console.log('Error creating bucket.', err);
    return;
  }
  console.log('Bucket created successfully in "us-east-1".');
});

var buffer = 'Hello World';

minioClient.putObject('mybucket', 'hello-file', buffer, function(err, etag) {
  return console.log(err, etag); // err should be null
});

var size = 0;

minioClient.getObject('mybucket', 'photo.jpg', function(err, dataStream) {
  if (err) {
    return console.log(err);
  }
  dataStream.on('data', function(chunk) {
    size += chunk.length;
  });
  
  dataStream.on('end', function() {
    console.log('End. Total size = ' + size);
  });
  
  dataStream.on('error', function(err) {
    console.log(err);
  });

  return console.log('all good in the hood');
  
});










