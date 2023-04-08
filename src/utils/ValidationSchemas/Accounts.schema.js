import * as Yup from 'yup';
import 'yup-phone';

const AccountSchema = Yup.object({
    name: Yup.string().min(3).max(25).required('Please enter a name'),
    phone: Yup.string()
        .matches(/^\d{3}\d{3}\d{4}$/, 'Phone number is not valid')
        .required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Enter an email'),
    password: Yup.string().min(6).required('Enter a password'),
    role: Yup.string().required('Select a role'),
    standard: Yup.array().min(1).required('Select standard'),
});

export default AccountSchema;
