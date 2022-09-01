import { React, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { t } from 'i18next';
import $ from "jquery";

const TranHistory = () => {
    const params = useParams();

    useEffect(() => {
        TableDatatablesManaged.init();
    }, [])

    //receive status  user transaction
    var TableDatatablesManaged = (function () {
        var initTable1 = function () {
            var table = $("#history");
            var table1 = table.DataTable({
                destroy: true,
                processing: true,
                serverSide: true,
                ajax: {
                    url: `/api/user_deposit/${params.id}`,
                    type: "POST",
                    dataSrc: "get_user_trans_data",
                },
                columns: [
                    {
                        data: null,
                        sortable: false,
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    { data: "transaction_id" },
                    { data: "wallet_address" },
                    { data: "from_amount" },
                    { data: "from_rate" },
                    { data: "to_amount" },
                    { data: "to_rate" },
                    { data: "created_at" },
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
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pt-5">
                <div className="col-bg">
                    {/* title */}
                    <div className="d-flex">
                        <div>
                            <h4 className="statistics-title">{t("text_transaction_history")}</h4>
                        </div>
                    </div>
                    {/* datatable */}
                    <div className="table-responsive table-scrollable mt-4">
                        <table id="history" className="table marketing-values mt-1">
                            {/* table head */}
                            <thead>
                                <tr>
                                    <th>{t("text_sr_no")}</th>
                                    <th>{t("text_transaction_id")}</th>
                                    <th>{t("text_wallet_address")}</th>
                                    <th>{t("text_from_amount")}</th>
                                    <th>{t("text_from_rate")}</th>
                                    <th>{t("text_to_amount")}</th>
                                    <th>{t("text_to_rate")}</th>
                                    <th>{t("text_date")}</th>
                                </tr>
                            </thead>
                            {/* table body */}
                            <tbody></tbody>
                            {/* table foot */}
                            <tfoot>
                                <tr>
                                    <th>{t("text_sr_no")}</th>
                                    <th>{t("text_transaction_id")}</th>
                                    <th>{t("text_wallet_address")}</th>
                                    <th>{t("text_from_amount")}</th>
                                    <th>{t("text_from_rate")}</th>
                                    <th>{t("text_to_amount")}</th>
                                    <th>{t("text_to_rate")}</th>
                                    <th>{t("text_date")}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TranHistory;