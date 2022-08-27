import { React, useEffect } from 'react';
import AdminTheme from '../theme/AdminTheme';
import Title from '../../common/title';
import { t } from 'i18next';

const WalletUpdate = () => {
    const $ = window.$;

    useEffect(() => {
        TableDatatablesManaged.init();
    }, [])

    //receive status  user transaction
    var TableDatatablesManaged = (function () {
        var initTable1 = function () {
            var table = $("#wallet");
            var table1 = table.DataTable({
                destroy: true,
                processing: true,
                serverSide: true,
                ajax: {
                    url: `/api/transaction_data/0`,
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
                    { data: "transaction_id" },
                    { data: "wallet_address" },
                    { data: "from_amount" },
                    { data: "from_currency" },
                    {
                        data: "received_status",
                        render: function (data, type, row) {
                            if (data === "0") {
                                return "<span class='btn btn-primary active-btn'>pending</span>";
                            } else if (data === "1") {
                                return "<span class='btn btn-primary active-btn'>received</span>";
                            } else if (data === "2") {
                                return "<span class='btn btn-warning active-btn'>rejected</span>";
                            }
                        },
                    },
                    { data: "to_rate" },
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
            <Title props={t("text_wallet_update")} />
            <AdminTheme header={t("text_wallet_update")}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                    <div className="col-bg">
                        <div className="d-flex">
                            <div>
                                <h4 className="statistics-title">{t("text_wallet_update")}</h4>
                            </div>
                        </div>
                        {/* datatable */}
                        <div className="table-responsive table-scrollable mt-4">
                            <table id="wallet" className="table marketing-values mt-1">
                                <thead>
                                    <tr>
                                        <th>{t("text_sr_no")}</th>
                                        <th>{t("text_member_id")}</th>
                                        <th>{t("text_old_values")}</th>
                                        <th>{t("text_new_values")}</th>
                                        <th>{t("text_member_ip_address")}</th>
                                        <th>{t("text_changed_by")}</th>
                                        <th>{t("text_date")}</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                                <tfoot>
                                    <tr>
                                        <th>{t("text_sr_no")}</th>
                                        <th>{t("text_member_id")}</th>
                                        <th>{t("text_old_values")}</th>
                                        <th>{t("text_new_values")}</th>
                                        <th>{t("text_member_ip_address")}</th>
                                        <th>{t("text_changed_by")}</th>
                                        <th>{t("text_date")}</th>
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

export default WalletUpdate;

// hy
// crypto - lp ma badhu thay gyu chhe
// currency valu new module add kryu and not found nu page pn add kri didhu chhe
// dataTable ma je problem hto e pn solved