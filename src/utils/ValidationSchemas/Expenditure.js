import * as Yup from 'yup';

const ExpenditureSchema = Yup.object({
    amount: Yup.number().min(1).required('Give an amount'),
    description: Yup.string().min(2).required('Give a description'),
});
export default ExpenditureSchema;
