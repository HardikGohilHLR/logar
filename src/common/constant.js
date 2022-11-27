// Constants

export const ERROR_MESSAGES = {
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Invalid Credentials',
    'auth/email-already-exists': 'User already exists',
    'auth/email-already-in-use': 'User already exists',
    'auth/too-many-requests': 'Too many requests, Please try again after some time',
}

export const PASSWORD_VALIDATION = {
    // required: 'Please Enter your password.',
    minlength: 'Must Contain 8 Characters',
    lowercase: 'Must Contain One Lowercase Character',
    uppercase: 'Must Contain One Uppercase Character',
    number: 'Must Contain One Number Character',
    special: 'Must Contain One Special Character',
}