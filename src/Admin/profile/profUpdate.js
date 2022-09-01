import { React, useState } from 'react';
import { toast } from "react-toastify";
import { t } from 'i18next';

const ProfUpdate = () => {
    const user = JSON.parse(sessionStorage.getItem("UserData"));

    //store the admin profile data
    const [userData, setUserData] = useState({
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    });
    //handle the validation
    const [state1, setState1] = useState({
        formErrors: {},
    });

    //change the profile data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    function handleFormValidation() {
        const { first_name, last_name, email } = userData;
        let formErrors = {};
        let formIsValid = true;
        if (!first_name) {
            formIsValid = true;
            formErrors["firstNameErr"] = t("translation2:err_first_name_req");
        }
        if (!last_name) {
            formIsValid = true;
            formErrors["lastNameErr"] = t("translation2:err_last_name_req");
        }
        if (!email) {
            formIsValid = true;
            formErrors["emailErr"] = t("translation2:err_email_req");
        }
        setState1({ formErrors: formErrors });
        return formIsValid;
    }

    // update the profile data
    const handleUpdate = async (e) => {
        e.preventDefault();
        handleFormValidation()
        var response = await fetch(`/api/update_profile/${user.id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        var res_data = await response.json();
        if (res_data.status === true) {
            toast.success(res_data.message)
        }
        else {
            console.log(res_data);
        }
    };

    return (
        <>
            <div className="row adminform-row">
                <div className="col-md-10 mx-auto">
                    <p className="text-center fs-2 text-white">
                        {t("text_profile")}
                    </p>
                    <form>
                        {/* username */}
                        <div className="mb-3 mt-3">
                            <label htmlFor="username" className="form-label text-white">
                                {t("text_username")}:
                            </label>
                            <input
                                type="text"
                                className="form-control theme-input"
                                id="username"
                                placeholder="Enter username"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                readOnly={true}
                            />
                        </div>
                        {/* firstname */}
                        <div className="mb-3 mt-3">
                            <label
                                htmlFor="firstname"
                                className="form-label text-white"
                            >
                                {t("text_firstname")}:
                            </label>
                            <input
                                type="text"
                                className="form-control theme-input"
                                id="firstname"
                                placeholder="Enter firstname"
                                name="first_name"
                                value={userData.first_name}
                                onChange={handleChange}
                            />
                            <label
                                htmlFor="firstname"
                                generated="true"
                                className={
                                    "error " +
                                    (state1.formErrors.firstNameErr
                                        ? " d-block"
                                        : "d-none")
                                }
                            >
                                {state1.formErrors.firstNameErr}
                            </label>
                        </div>
                        {/* lastname */}
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label text-white">
                                {t("text_lastname")}:
                            </label>
                            <input
                                type="text"
                                className="form-control theme-input"
                                id="lastname"
                                placeholder="Enter lastname"
                                name="last_name"
                                value={userData.last_name}
                                onChange={handleChange}
                            />
                            <label
                                htmlFor="lastname"
                                generated="true"
                                className={
                                    "error " +
                                    (state1.formErrors.lastNameErr
                                        ? " d-block"
                                        : "d-none")
                                }
                            >
                                {state1.formErrors.lastNameErr}
                            </label>
                        </div>
                        {/* email */}
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label text-white">
                                {t("text_email")}:
                            </label>
                            <input
                                type="email"
                                className="form-control theme-input"
                                id="email"
                                placeholder="Email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                            <label
                                htmlFor="email"
                                generated="true"
                                className={
                                    "error " +
                                    (state1.formErrors.emailErr
                                        ? " d-block"
                                        : "d-none")
                                }
                            >
                                {state1.formErrors.emailErr}
                            </label>
                        </div>
                        {/* submit */}
                        <div className="text-center mt-5">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                onClick={handleUpdate}
                            >
                                {t("text_update")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProfUpdate