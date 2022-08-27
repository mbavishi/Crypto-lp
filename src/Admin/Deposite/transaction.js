import React, { useEffect } from "react";
import AdminTheme from "../theme/AdminTheme";
import Title from "../../common/title";
import { t } from "i18next";

const Transaction = () => {
    const $ = window.$;
    const path = window.location.pathname;
    var status;
    var name;
    if (path == "/transaction/pending") {
        status = 0;
        name = "Pending";
    }
    else if (path == "/transaction/approved") {
        status = 1;
        name = "Approved";
    }
    else if (path == "/transaction/failed") {
        status = 2;
        name = "Failed"
    }
    else {
        console.log("error");
    }

    useEffect(() => {
        TableDatatablesManaged.init();
    }, [path])

    //receive status  user transaction
    var TableDatatablesManaged = (function () {
        var initTable1 = function () {
            var table = $(`#${name}`);
            var table1 = table.DataTable({
                destroy: true,
                processing: true,
                serverSide: true,
                ajax: {
                    url: `/api/transaction_data/${status}`,
                    type: "POST",
                    dataSrc: "transaction_data",
                },
                columns: [
                    {
                        data: null,
                        sortable: false,
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    { data: "wallet_address" },
                    { data: "from_amount" },
                    { data: "from_rate" },
                    { data: "to_amount" },
                    { data: "to_rate" },
                    { data: "to_rate" },
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
                ],
                Destroy: true,
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
            <Title props={name} />
            <AdminTheme header={name}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                    <div className="col-bg">
                        {/* title */}
                        <div className="d-flex">
                            <div>
                                <h4 className="statistics-title">{name}</h4>
                            </div>
                        </div>
                        {/* datatable */}
                        <div className="table-responsive table-scrollable mt-4">
                            <table id={name} className="table marketing-values mt-1">
                                {/* table head */}
                                <thead>
                                    <tr>
                                        <th>{t("text_sr_no")}</th>
                                        <th>{t("text_wallet_address")}</th>
                                        <th>{t("text_from_amount")}</th>
                                        <th>{t("text_from_rate")}</th>
                                        <th>{t("text_to_amount")}</th>
                                        <th>{t("text_to_rate")}</th>
                                        <th>{t("text_date")}</th>
                                        <th>{t("text_status")}</th>
                                    </tr>
                                </thead>
                                {/* table body */}
                                <tbody></tbody>
                                {/* table foot */}
                                <tfoot>
                                    <tr>
                                        <th>{t("text_sr_no")}</th>
                                        <th>{t("text_wallet_address")}</th>
                                        <th>{t("text_from_amount")}</th>
                                        <th>{t("text_from_rate")}</th>
                                        <th>{t("text_to_amount")}</th>
                                        <th>{t("text_to_rate")}</th>
                                        <th>{t("text_date")}</th>
                                        <th>{t("text_status")}</th>
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

export default Transaction;