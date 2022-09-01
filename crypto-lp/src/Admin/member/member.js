import { React, useEffect } from 'react';
import AdminTheme from '../theme/AdminTheme';
import Title from '../../common/title';
import { t } from 'i18next';
import $ from "jquery";

const Member = () => {
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
                    url: `/api/get_user_data`,
                    type: "POST",
                    dataSrc: "get_member_data",
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
                    { data: "created_at" },
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
                    {
                        data: "user_id",
                        render: function (data, type, row) {
                            return '<a href="/member/view/' + data + '"><i class="fa fa-eye fa-lg pointer" id="view-btn"></i><a/>'
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
            <Title props={t("text_member")} />
            <AdminTheme header={t("text_member")}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                    <div className="col-bg">
                        {/* title */}
                        <div className="d-flex">
                            <div>
                                <h4 className="statistics-title">{t("text_member_manager")}</h4>
                            </div>
                        </div>
                        {/* datatable */}
                        <div className="table-responsive table-scrollable mt-4">
                            <table id="wallet" className="table marketing-values mt-1">
                                {/* table head */}
                                <thead>
                                    <tr>
                                        <th>{t("text_sr_no")}</th>
                                        <th>{t("text_wallet_address")}</th>
                                        <th>{t("text_date")}</th>
                                        <th>{t("text_status")}</th>
                                        <th>{t("text_action")}</th>
                                    </tr>
                                </thead>
                                {/* table body */}
                                <tbody></tbody>
                                {/* table foot */}
                                <tfoot>
                                    <tr>
                                        <th>{t("text_sr_no")}</th>
                                        <th>{t("text_wallet_address")}</th>
                                        <th>{t("text_date")}</th>
                                        <th>{t("text_status")}</th>
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

export default Member;