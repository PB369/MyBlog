const { S3Client, PutObjectCommand, GetObjectCommand} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const generateGetURL = async (fileName) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
    }

    const command = new GetObjectCommand(params);
    return await getSignedUrl(s3, command, { expiresIn: 60 * 3 });
}

const generatePutURL = async (fileName, fileType) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        ContentType: fileType,
    }

    const command = new PutObjectCommand(params);
    return await getSignedUrl(s3, command, { expiresIn: 60 * 3 });
}

module.exports = { generateGetURL, generatePutURL }