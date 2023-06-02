import * as Yup from 'yup';

const ExpenditureSchema = Yup.object({
    amount: Yup.number().min(1).required('Give an amount'),
    title: Yup.string().min(3).required('Give a title'),
});
export default ExpenditureSchema;
