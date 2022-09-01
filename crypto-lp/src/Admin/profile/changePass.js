import React from 'react';
import PassUpdate from './passUpdate';
import AdminTheme from '../theme/AdminTheme';

const ChangePass = () => {
    return (
        <>
            <AdminTheme>
                <div className='col-6 mx-auto'>
                    <PassUpdate />
                </div>
            </AdminTheme>
        </>
    )
}

export default ChangePass;