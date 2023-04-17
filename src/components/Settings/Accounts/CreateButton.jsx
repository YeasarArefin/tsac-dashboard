import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import useAuth from '../../../utils/hooks/useAuth';

const CreateButton = ({ saveLoading }) => {
    const { firebaseError } = useAuth();

    return (
        <div>
            {!saveLoading ? (
                <div>
                    {firebaseError === 'Firebase: Error (auth/email-already-in-use).' &&
                        (<div className="text-red-600 pb-3">
                            * This email is already registered
                        </div>)(
                            firebaseError !== 'Firebase: Error (auth/email-already-in-use).' && (
                                <h1 className="text-red-600 pb-3">* {firebaseError}</h1>
                            )
                        )}
                    <button
                        type="submit"
                        className="p-2 w-full border bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    >
                        Create Account
                    </button>
                </div>
            ) : (
                <button
                    disabled
                    type="submit"
                    className="p-2 w-full border bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 flex justify-center cursor-not-allowed opacity-50"
                >
                    <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
                </button>
            )}
        </div>
    );
};

export default CreateButton;
