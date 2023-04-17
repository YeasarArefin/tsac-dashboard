/* eslint-disable no-prototype-builtins */
import React from 'react';

const TeacherDetails = ({ role, values, setFieldValue, errors, touched, standards, subjects }) => {
    // const selectedTeacherSubject = standards?.map((standard) =>
    //     subjects[standard]?.map((sub) => <h1>{sub}</h1>)
    // );

    return (
        <div>
            {role === 'teacher' && (
                <div className="grid grid-cols-3">
                    <div className="col-span-1">
                        {standards.map((standardName) => (
                            <div key={standardName} className="flex gap-x-2 items-center">
                                <input
                                    className="form-checkbox h-4 w-4"
                                    type="checkbox"
                                    name="standard"
                                    value={standardName}
                                    checked={values.standard.includes(standardName)}
                                    onChange={(event) => {
                                        const isChecked = event.target.checked;
                                        if (isChecked) {
                                            setFieldValue('standard', [
                                                ...values.standard,
                                                standardName,
                                            ]);
                                        } else {
                                            setFieldValue(
                                                'standard',
                                                values.standard.filter(
                                                    (value) => value !== standardName
                                                )
                                            );
                                        }
                                    }}
                                />
                                <span>{standardName}</span>
                            </div>
                        ))}

                        {errors.standard && touched.standard && (
                            <p className="text-red-500 pt-1 pl-2">* {errors.standard}</p>
                        )}
                    </div>

                    <div className="flex gap-x-5 col-span-2">
                        {values.standard?.map((standard) => (
                            <div key={standard}>
                                <h2 className="font-bold">{standard}</h2>
                                {subjects[standard]?.map((subject) => (
                                    <div key={subject.name} className="flex gap-x-2 items-center">
                                        <input
                                            className="form-checkbox h-4 w-4"
                                            type="checkbox"
                                            name="subjects"
                                            value={subject.name}
                                            checked={values.subjects.includes(subject.name)}
                                            onChange={(event) => {
                                                const isChecked = event.target.checked;
                                                if (isChecked) {
                                                    setFieldValue('subjects', [
                                                        ...values.subjects,
                                                        subject.name,
                                                    ]);
                                                } else {
                                                    setFieldValue(
                                                        'subjects',
                                                        values.subjects.filter(
                                                            (value) => value !== subject.name
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                        <span className="capitalize">{subject.name}</span>
                                    </div>

                                    // <div key={subject.name}>
                                    //     <p>{subject.name}</p>
                                    // </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherDetails;
