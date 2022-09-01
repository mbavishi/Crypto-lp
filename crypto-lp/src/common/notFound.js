import React from 'react';
import { NavLink } from 'react-router-dom';
import UserTheme from '../User/theme/userTheme';
import { t } from 'i18next';

const NotFound = () => {
    return (
        <>
            <UserTheme>
                <div className='row vh-100'>
                    <div className='col-6 mx-auto text-center my-auto text-uppercase'>
                        <div className="not-found mb-5">
                            <h1>{t("text_not_found")}</h1>
                        </div>
                        <NavLink to="/">
                            <button className='btn-primary'>
                                {t("text_back_to_home")}
                            </button>
                        </NavLink>
                    </div>
                </div>
            </UserTheme>
        </>
    )
}

export default NotFound