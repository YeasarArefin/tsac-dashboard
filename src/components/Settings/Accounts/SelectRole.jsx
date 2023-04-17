import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

const SelectRole = ({ handleChangeRole, errors, touched }) => {
    return (
        <div>
            <div>
                <h1>Select Role</h1>
            </div>

            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="role"
                row
                onChange={handleChangeRole}
            >
                <FormControlLabel value="student" control={<Radio />} label="Student" />

                <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
            </RadioGroup>
            {errors.role && touched.role && (
                <p className="text-red-500 pt-1 pl-2">* {errors.role}</p>
            )}
        </div>
    );
};

export default SelectRole;
