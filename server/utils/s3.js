const getS3Url = (type, s3Key, bucketName, region) => {
    if (!s3Key) return null;
    if (s3Key.startsWith('http')) return s3Key; // Already a full URL

    const typeFolderMap = {
        'member': 'media/images/committee',
        'article': 'media/images/articles',
        'minute': 'media/docs/minutes',
        'event': 'media/images/events',
        'media': 'media/images/media',
    };

    const folder = typeFolderMap[type];
    if (folder) {
        const fileName = s3Key.split('/').pop();
        return `https://${bucketName}.s3.${region}.amazonaws.com/prod/assets/${folder}/${fileName}`;
    }

    // Fallback for any other type or if s3Key is a full path
    return `https://${bucketName}.s3.${region}.amazonaws.com/${s3Key}`;
};

module.exports = { getS3Url };
