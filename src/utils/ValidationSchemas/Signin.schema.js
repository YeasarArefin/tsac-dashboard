import * as Yup from 'yup';

const SigninSchema = Yup.object({
    email: Yup.string().email().required('Pleasae enter your email'),
    password: Yup.string().min(6).required('Please enter password'),
});
export default SigninSchema;
