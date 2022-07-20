const { body, validationResult } = require('express-validator');


const RegisterValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('firstName', 'Укажите имя').isLength({ min: 3 }),
    body('surName', 'Укажите фамилию').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
  ];

  const mistakes = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
  }

  module.exports = {RegisterValidation, mistakes};