import { compareSync } from 'bcryptjs';

const comparePassword = (password:string, hash:string) => {
  const compare = compareSync(password, hash);
  return compare;
};

export default comparePassword;
