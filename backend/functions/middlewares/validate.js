const validator = require('validator').default;

exports.validateSignUp = (req, res, next) => {
    const { email, password, confirm, handle } = req.body;
    const errors = {};

    if (!email) errors.email = 'Must not be empty';
    else if (!validator.isEmail(email)) errors.email = 'Email is invalid';

    if (!password) errors.password = 'Must not be empty';
    else if (!validator.equals(password, confirm))
        errors.password = 'Password must match';

    if (!confirm) errors.confirm = 'Must not be empty';
    else if (!validator.equals(password, confirm))
        errors.confirm = 'Password must match';

    if (!handle) errors.handle = 'Must not be empty';
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);
    return next();
};

exports.validateSignIn = (req, res, next) => {
    const { email, password } = req.body;
    const errors = {};

    if (!email) errors.email = 'Must not be empty';
    if (!password) errors.password = 'Must not be empty';
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);
    return next();
};
