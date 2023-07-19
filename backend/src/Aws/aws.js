const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.ACCESS_ID_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
});

let uploadFile = async (file) => {
  return new Promise(function (resolve, reject) {
    let s3 = new AWS.S3({ apiVersion: "2006-03-01" });

    let uploadParams = {
      ACL: "public-read",
      Bucket: "classroom-training-bucket",
      Key: "RupamStore/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      //    console.log(data)
      console.log("file uploaded succesfully");
      return resolve(data.Location);
    });
  });
};

module.exports = { uploadFile };
