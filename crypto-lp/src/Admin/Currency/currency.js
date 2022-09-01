import { React, useEffect } from 'react';
import AdminTheme from '../theme/AdminTheme';
import { NavLink } from 'react-router-dom';
import Title from '../../common/title';
import { t } from 'i18next';
import $ from "jquery";

const Currency = () => {
    useEffect(() => {
        TableDatatablesManaged.init();
    }, [])

    // user transaction
    var TableDatatablesManaged = (function () {
        var initTable1 = function () {
            var table = $("#currency");
            var table1 = table.DataTable({
                destroy: true,
                processing: true,
                serverSide: true,
                ajax: {
                    url: `/api/get_currency_data`,
                    type: "POST",
                    dataSrc: "get_currency_data",
                },
                columns: [
                    { data: "id" },
                    { data: "name" },
                    { data: "currency_code" },
                    { data: "contract_address" },
                    {
                        data: "status",
                        render: function (data, type, row) {
                            if (data === "1") {
                                return "<span class='btn btn-primary active-btn'>Active</span>";
                            } else if (data === "0") {
                                return "<span class='btn btn-primary inactive-btn'>Inactive</span>";
                            }
                        },
                    },
                    { data: "created_at" },
                    {
                        data: "id",
                        render: function (data, type, row) {
                            return '<a href="/currency/edit/' + data + '"><i class="fa-solid fa-pen fa-lg pointer" id="edit-btn"></i></a>'
                        }
                    },
                ],
                destroy: true,
            });
        };
        return {
            init: function () {
                if (!$().dataTable) {
                    return;
                }
                initTable1();
            },
        };
    })();
    $(document).ready(function () {
        // error throw
        $.fn.dataTableExt.sErrMode = "throw";
        TableDatatablesManaged.init();
    });

    return (
        <>
            <Title props={t("text_currency")} />
            <AdminTheme header={t("text_currency")}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                    <div className="col-bg">
                        {/* title */}
                        <div className="d-flex justify-content-between">
                            <h4 className="statistics-title">{t("text_currency")}</h4>
                            {/* add button */}
                            <button className='btn btn-primary btn-add float-end'>
                                <NavLink to="/currency/add">
                                    {t("text_add")}
                                </NavLink>
                            </button>
                        </div>
                        {/* datatable */}
                        <div className="table-responsive table-scrollable mt-4">
                            <table id="currency" className="table marketing-values mt-1">
                                {/* table head */}
                                <thead>
                                    <tr>
                                        <th>{t("text_sr_no")}</th>
                                        <th>{t("text_name")}</th>
                                        <th>{t("text_currency_code")}</th>
                                        <th>{t("text_contract_address")}</th>
                                        <th>{t("text_status")}</th>
                                        <th>{t("text_date")}</th>
                                        <th>{t("text_action")}</th>
                                    </tr>
                                </thead>
                                {/* table body */}
                                <tbody></tbody>
                                {/* table foot */}
                                <tfoot>
                                    <tr>
                                        <th>{t("text_sr_no")}</th>
                                        <th>{t("text_name")}</th>
                                        <th>{t("text_currency_code")}</th>
                                        <th>{t("text_contract_address")}</th>
                                        <th>{t("text_status")}</th>
                                        <th>{t("text_date")}</th>
                                        <th>{t("text_action")}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </AdminTheme>
        </>
    )
}

export default Currency