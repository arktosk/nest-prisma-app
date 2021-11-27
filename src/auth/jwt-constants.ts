export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY,
  /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
  expiresIn: '60s',
};
