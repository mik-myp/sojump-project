import crypto from 'crypto';

const md5 = password => {
  return crypto
    .createHash('md5')
    .update('ep' + password)
    .digest('hex');
};

export default md5;
