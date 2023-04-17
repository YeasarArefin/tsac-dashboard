import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const StudentDetils = ({
    role,
    studentStandard,
    handleStudentStandardChange,
    errors,
    values,
    touched,
    standards,
    subjects,
    setFieldValue,
}) => {
    const selectedStudentSubject = subjects[values.standard[0]]?.map(({ name, fee }) => (
        <div className="flex items-center gap-x-2">
            <input
                className="form-checkbox h-4 w-4"
                type="checkbox"
                name="subjects"
                value={name}
                checked={values.subjects.includes(name)}
                onChange={(event) => {
                    const isChecked = event.target.checked;
                    if (isChecked) {
                        setFieldValue('subjects', [...values.subjects, name]);
                    } else {
                        setFieldValue(
                            'subjects',
                            values.subjects.filter((value) => value !== name)
                        );
                    }
                }}
            />
            <span className="capitalize">
                {name} - {fee}&#2547;
            </span>
        </div>
    ));

    return (
        <div>
            {role === 'student' && (
                <div className="flex flex-col gap-y-3">
                    <div>
                        <FormControl sx={{ width: 1 }} size="small">
                            <InputLabel id="demo-select-small">Standard</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={studentStandard}
                                onChange={handleStudentStandardChange}
                                label="Standard"
                                sx={{ width: 1 }}
                            >
                                {standards.map((standard) => (
                                    <MenuItem key={standard} value={standard}>
                                        {standard}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {errors.standard && touched.standard && (
                            <p className="text-red-500 pt-1 pl-2">* {errors.standard}</p>
                        )}
                    </div>

                    <div>{selectedStudentSubject}</div>
                </div>
            )}
        </div>
    );
};

export default StudentDetils;
