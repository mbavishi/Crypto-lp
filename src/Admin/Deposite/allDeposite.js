import { React, useEffect } from 'react';
import AdminTheme from '../theme/AdminTheme';
import Title from '../../common/title';
import { t } from 'i18next';

const AllDeposite = () => {
    const $ = window.$

    useEffect(() => {
        TableDatatablesManaged.init();
    }, [])

    // user transaction
    var TableDatatablesManaged = (function () {
        var initTable1 = function () {
            var table = $("#user");
            var table1 = table.DataTable({
                destroy: true,
                processing: true,
                serverSide: true,
                ajax: {
                    url: `/api/get_transaction_data`,
                    type: "POST",
                    dataSrc: "get_transaction_data",
                },
                columns: [
                    {
                        data: "transaction_id",
                        render: function (data, type, row) {
                            return "<a href='#'>" + data + "</a>";
                        },
                    },
                    { data: "wallet_address" },
                    { data: "from_amount" },
                    { data: "from_rate" },
                    { data: "to_amount" },
                    { data: "to_rate" },
                    { data: "currency_pair" },
                    {
                        data: "received_status",
                        render: function (data, type, row) {
                            if (data === "0") {
                                return "<span class='btn btn-primary pending-btn'>Pending</span>";
                            } else if (data === "1") {
                                return "<span class='btn btn-primary active-btn'>Received</span>";
                            } else if (data === "2") {
                                return "<span class='btn btn-primary inactive-btn'>Failed</span>";
                            }
                        },
                    },
                    {
                        data: "send_status",
                        render: function (data, type, row) {
                            if (data === "0") {
                                return "<span class='btn btn-primary pending-btn'>Pending</span>";
                            } else if (data === "1") {
                                return "<span class='btn btn-primary active-btn'>Received</span>";
                            } else if (data === "2") {
                                return "<span class='btn btn-primary inactive-btn'>Failed</span>";
                            }
                        },
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
            <Title props={t("text_all_deposite")} />
            <AdminTheme header={t("text_all_deposite")}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                    <div className="col-bg">
                        {/* title */}
                        <div className="d-flex">
                            <div>
                                <h4 className="statistics-title">{t("text_all_deposite")}</h4>
                            </div>
                        </div>
                        {/* datatable */}
                        <div className="table-responsive table-scrollable mt-4">
                            <table id="user" className="table marketing-values mt-1">
                                {/* table head */}
                                <thead>
                                    <tr>
                                        <th>{t("text_transaction_id")}</th>
                                        <th>{t("text_wallet_address")}</th>
                                        <th>{t("text_from_amount")}</th>
                                        <th>{t("text_from_rate")}</th>
                                        <th>{t("text_to_amount")}</th>
                                        <th>{t("text_to_rate")}</th>
                                        <th>{t("text_currency_pair")}</th>
                                        <th>{t("text_received_status")}</th>
                                        <th>{t("text_send_status")}</th>
                                    </tr>
                                </thead>
                                {/* table body */}
                                <tbody></tbody>
                                {/* table foot */}
                                <tfoot>
                                    <tr>
                                        <th>{t("text_transaction_id")}</th>
                                        <th>{t("text_wallet_address")}</th>
                                        <th>{t("text_from_amount")}</th>
                                        <th>{t("text_from_rate")}</th>
                                        <th>{t("text_to_amount")}</th>
                                        <th>{t("text_to_rate")}</th>
                                        <th>{t("text_currency_pair")}</th>
                                        <th>{t("text_received_status")}</th>
                                        <th>{t("text_send_status")}</th>
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

export default AllDeposite;