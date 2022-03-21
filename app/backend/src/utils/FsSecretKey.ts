import * as fs from 'fs';

const FsSecretKey = () => {
  const secretKey = fs.readFileSync('jwt.evaluation.key', 'utf-8');
  return secretKey;
};

export default FsSecretKey;
