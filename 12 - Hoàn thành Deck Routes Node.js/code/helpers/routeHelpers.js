const Joi = require('joi');

const validateBody = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body)

    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error)
    } else {
      if (!req.value) req.value = {}
      if (!req.value['params']) req.value.params = {}
      req.value.body = validatorResult.value
      next()
    }
  }
}


const validateParam = (schema, name) => {
  return (req, res, next) => {
    // console.log(schema, name);
    console.log('params...', req.params[name]);
    const validatorResult = schema.validate({ param: req.params[name] })
    console.log('result...', validatorResult);

    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error)
    } else {
      console.log('1...', req.value);
      if (!req.value) req.value = {}
      console.log('2...', req.value.params);
      if (!req.value['params']) req.value.params = {}
      console.log('3...', req.value);

      req.value.params[name] = req.params[name]
      console.log('req value:', req.value);
      next()
    }
  }
}

const schemas = {
  deckSchema: Joi.object().keys({
    name: Joi.string().min(6).required(),
    description: Joi.string().min(10).required()
  }),

  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),

  userSchema: Joi.object().keys({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required()
  }),

  userOptionalSchema: Joi.object().keys({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    email: Joi.string().email()
  }),

  newDeckSchema: Joi.object().keys({
    name: Joi.string().min(6).required(),
    description: Joi.string().min(10).required(),
    owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),

  deckOptionalSchema: Joi.object().keys({
    name: Joi.string().min(6),
    description: Joi.string().min(10),
    owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
  })

}

module.exports = {
  validateParam,
  validateBody,
  schemas
}