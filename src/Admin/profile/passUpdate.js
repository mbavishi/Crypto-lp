import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { t } from 'i18next';

const PassUpdate = () => {
    const user = JSON.parse(sessionStorage.getItem("UserData"));
    const navigate = useNavigate()

    const [psdData, setPsdData] = useState({
        old_password: "",
        new_password: "",
        c_password: "",
    });

    //handle the validation
    const [state1, setState1] = useState({
        formErrors: {},
    });

    //handle the password
    const handlePassword = (e) => {
        const { name, value } = e.target;
        setPsdData({
            ...psdData,
            [name]: value,
        });
    };

    function handleFormValidation() {
        const { old_password, new_password, c_password } = psdData;
        let formErrors = {};
        let formIsValid = false;
        if (!old_password) {
            formIsValid = true;
            formErrors["oldpassErr"] = t("translation2:err_old_password_req");
        }
        if (!new_password) {
            formIsValid = true;
            formErrors["newpassErr"] = t("translation2:err_new_password_req");
        }
        if (new_password && new_password.length < 6) {
            formIsValid = true;
            formErrors["newpassErr"] = t("translation2:err_password_min");
        }
        if (!c_password) {
            formIsValid = true;
            formErrors["confpassErr"] = t("translation2:err_c_passowrd_req");
        }
        if (c_password && c_password.length < 6) {
            formIsValid = true;
            formErrors["confpassErr"] = t("translation2:err_password_min");
        }
        if (
            new_password &&
            new_password > 6 &&
            c_password &&
            c_password.length > 6 &&
            new_password != c_password
        ) {
            formIsValid = true;
            formErrors["confpassErr"] = t("translation2:err_c_passowrd_equal");
        }
        setState1({ formErrors: formErrors });
        return formIsValid;
    }

    // update the profile data
    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = handleFormValidation();
        if (!error) {
            var response = await fetch(`/api/change_pass/${user.id}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(psdData),
            });
            var res_data = await response.json();
            if (res_data.status == true) {
                toast.success(res_data.message)
            }
            else {
                toast.error(res_data.message)
            }
        }
    };

    return (
        <>
            {/* change password */}
            <div className="adminform-row mt-5">
                <div className="col-md-10 mx-auto">
                    <p className="text-center fs-2 text-white">
                        {t("text_change_password")}
                    </p>
                    <form>
                        {/* old password */}
                        <div className="mb-3 mt-3">
                            <input
                                type="password"
                                className="form-control theme-input"
                                id="old_password"
                                placeholder="Old Password"
                                name="old_password"
                                value={psdData.old_password}
                                onChange={handlePassword}
                            />
                            <label
                                htmlFor="old_password"
                                generated="true"
                                className={
                                    "error " +
                                    (state1.formErrors.oldpassErr
                                        ? " d-block"
                                        : "d-none")
                                }
                            >
                                {state1.formErrors.oldpassErr}
                            </label>
                        </div>
                        {/* new password */}
                        <div className="mb-3 mt-3">
                            <input
                                type="password"
                                className="form-control theme-input"
                                id="new_password"
                                placeholder="New Password"
                                name="new_password"
                                value={psdData.new_password}
                                onChange={handlePassword}
                            />
                            <label
                                htmlFor="new_password"
                                generated="true"
                                className={
                                    "error " +
                                    (state1.formErrors.newpassErr
                                        ? " d-block"
                                        : "d-none")
                                }
                            >
                                {state1.formErrors.newpassErr}
                            </label>
                        </div>
                        {/* confirm password */}
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control theme-input"
                                id="c_password"
                                placeholder="Confirm Password"
                                name="c_password"
                                value={psdData.c_password}
                                onChange={handlePassword}
                            />
                            <label
                                htmlFor="c_password"
                                generated="true"
                                className={
                                    "error " +
                                    (state1.formErrors.confpassErr
                                        ? " d-block"
                                        : "d-none")
                                }
                            >
                                {state1.formErrors.confpassErr}
                            </label>
                        </div>
                        {/* submit */}
                        <div className="text-center mt-5">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                {t("text_update")}
                            </button>
                            <button
                                onClick={() => navigate(-1)}
                                className="btn btn-primary cancel-btn ms-3"
                                type="button"
                            >
                                {t("text_cancel")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PassUpdate