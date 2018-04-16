mvar Minio = require('minio');

var minioClient = new Minio.Client({
    endPoint: 'minio-service.minio.svc',
    port: 9000,
    secure: true,
    accessKey: 'minio',
    secretKey: 'minio123'
});

console.log('here');

var done = false;

minioClient.makeBucket('mybucket', 'us-east-1', function(err) {
  console.log('In the make bucket callback');
  
  if (err) {
    console.log('Error creating bucket.', err);
    return;
  }
  console.log('Bucket created successfully in "us-east-1".');

  console.log('in create bucket callback, trying a putObject');

  var buffer = 'Hello World';

  minioClient.putObject('mybucket', 'hello-file', buffer, function(err, etag) {
    console.log(err, etag); // err should be null

    var size = 0;
    console.log('in put callback');

    minioClient.getObject('mybucket', 'hello-file', function(err, dataStream) {
      if (err) {
        console.log(err);
        return;
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

      console.log('all good in the hood');

      done = true;
      
    });
  });
});

while (done == false) {
}












