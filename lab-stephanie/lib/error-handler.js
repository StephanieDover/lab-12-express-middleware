'use strict';

module.exports = (err, req, res, next) => {
  if (err.message.toLowerCase().includes('validation failed'))
    return res.sendStatus(400);

  if (err.message.toLowerCase().includes('object failed'))
    return res.sendStatus(404);

  if (err.message.indexOf('duplicate kay') > -1) return res.sendStatus(409);

  return res.sendStatus(500);
};
