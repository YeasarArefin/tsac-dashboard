import * as Yup from 'yup';

const AccountSchema = Yup.object({
    name: Yup.string().min(3).max(25).required('Please enter a name'),
    phone: Yup.string().min(10).max(10).required('Please enter your number'),
    email: Yup.string().email('Invalid email').required('Enter an email'),
    password: Yup.string().min(6).required('Enter a password'),
    role: Yup.string().required('Select a role'),
    standard: Yup.array().min(1).required('Select standard'),
});

export default AccountSchema;
