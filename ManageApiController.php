<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Cache;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;
use PHPMailer\PHPMailer\PHPMailer;

class ManageApiController extends Controller
{

    public function __construct()
    {
        Cache::flush();
        header("Pragma: no-cache");
        header("Cache-Control: no-cache");
        header("Expires: 0");

        $this->base_url = env('APP_URL');
        $this->currency_image_array = array(100 => 100, 30 => 30);

        $data = DB::table('lp_settings')
            ->get();

        foreach ($data as $row) {
            $this->system_config[$row->lp_settings_name] = $row->lp_settings_value;
        }

        $this->timezone = $this->system_config['timezone'];
    }

    public function getConfigTableData()
    {
        $data['config_table'] = DB::table('lp_settings')->get();
        echo json_encode($data, JSON_UNESCAPED_UNICODE);exit;

    }

    public function Generate_otp($len)
    {
        $r_str = "";
        $chars = "0123456789";
        do {
            $r_str = '';
            for ($i = 0; $i < $len; $i++) {
                $r_str .= substr($chars, rand(0, strlen($chars)), 1);
            }
        } while (strlen($r_str) != $len);
        return $r_str;
    }

    public function generateUniqueFilePrefix()
    {
        list($usec, $sec) = explode(" ", microtime());
        list($trash, $usec) = explode(".", $usec);
        return (date("YmdHis") . substr(($sec + $usec), -10) . '_');
    }

    public function getCurrencyData()
    {
        $data['currency_data'] = DB::table('lp_currency')
            ->where('status', '1')
            ->get();

        echo json_encode($data, JSON_UNESCAPED_UNICODE);exit;
    }

    public function getMemberData(Request $request)
    {
        $columns = array(
            1 => 'user_id',
            2 => 'wallet_address',
            3 => 'created_at',
            4 => 'status',
        );

        $search_txt = $request->input('search');
        $search = $search_txt['value'];

        $start = $request->input('start');

        $length = $request->input('length');

        $draw = $request->input('draw');

        $order_txt = $request->input('order');

        if (isset($order_txt) && !empty($order_txt[0]['column'])) {
            $order = $columns[$order_txt[0]['column']];
        } else {
            $order = $columns[4];
        }

        $sort_txt = $request->input('order');
        $sort = $sort_txt[0]['dir'];

        $total = DB::table('lp_users')
            ->select(DB::raw('COUNT(user_id) as total'))->get();

        $data['recordsTotal'] = $total[0]->total;

        $filterData = DB::table('lp_users')
            ->select(DB::raw('COUNT(user_id) as total'))->get();

        $data['recordsFiltered'] = $filterData[0]->total;

        $query = DB::table('lp_users')
            ->select('user_id', 'wallet_address', 'status', 'created_at');

        if (!empty($search)) {
            $query->where('user_id', 'LIKE', "%{$search}%")
                ->orWhere('wallet_address', 'LIKE', "{$search}")
                ->orWhere('status', 'LIKE', "{$search}")
                ->orWhere('created_at', 'LIKE', "{$search}");
        }

        $query->orderBy($order, $sort)->skip($start)->take($length);

        $data['get_member_data'] = $query->get();

        echo json_encode($data, JSON_UNESCAPED_UNICODE);exit;
    }

    public function userTransactionData(Request $request, $user_id)
    {
        $columns = array(
            1 => 'tr.transaction_id',
            2 => 'tr.wallet_address',
            3 => 'tr.from_amount',
            4 => 'tr.from_currency',
            5 => 'tr.from_rate',
            6 => 'tr.to_amount',
            7 => 'tr.to_currency',
            8 => 'tr.to_rate',
            9 => 'tr.currency_pair',
            10 => 'tr.received_status',
            11 => 'tr.send_status',
            12 => 'tr.created_at',
        );

        $search_txt = $request->input('search');
        $search = $search_txt['value'];

        $start = $request->input('start');

        $length = $request->input('length');

        $draw = $request->input('draw');

        $order_txt = $request->input('order');

        if (isset($order_txt) && !empty($order_txt[0]['column'])) {
            $order = $columns[$order_txt[0]['column']];
        } else {
            $order = $columns[12];
        }

        $sort_txt = $request->input('order');
        $sort = $sort_txt[0]['dir'];

        $total = DB::table('lp_transaction as tr')
            ->where('u.user_id', $user_id)
            ->join('lp_users as u', 'u.wallet_address', '=', 'tr.wallet_address')
            ->select(DB::raw('COUNT(transaction_id) as total'))
            ->get();

        $data['recordsTotal'] = $total[0]->total;

        $filtereData = DB::table('lp_transaction as tr')
            ->where('u.user_id', $user_id)
            ->leftjoin('lp_users as u', 'u.wallet_address', '=', 'tr.wallet_address')
            ->select(DB::raw('COUNT(transaction_id) as total'))
            ->get();

        $data['recordsFiltered'] = $filtereData[0]->total;

        $query = DB::table('lp_transaction as tr')
            ->where('u.user_id', $user_id)
            ->join('lp_users as u', 'u.wallet_address', '=', 'tr.wallet_address')
            ->select('tr.transaction_id', 'tr.wallet_address', 'tr.from_amount', 'tr.from_currency', 'tr.from_rate', 'tr.to_amount', 'tr.to_currency', 'tr.to_rate', 'tr.currency_pair', 'tr.received_status', 'tr.send_status');

        if (!empty($search)) {
            $query->where('tr.wallet_address', 'LIKE', "%{$search}%")
                ->orWhere('tr.from_amount', 'LIKE', "{$search}")
                ->orWhere('tr.from_currency', 'LIKE', "{$search}")
                ->orWhere('tr.from_rate', 'LIKE', "{$search}")
                ->orWhere('tr.to_amount', 'L`IKE', "{$search}")
                ->orWhere('tr.to_currency', 'LIKE', "{$search}")
                ->orWhere('tr.to_rate', 'LIKE', "{$search}")
                ->orWhere('tr.currency_pair', 'LIKE', "{$search}")
                ->orWhere('tr.received_status', 'LIKE', "{$search}")
                ->orWhere('tr.send_status', 'LIKE', "{$search}")
                ->orWhere('tr.created_at', 'LIKE', "{$search}");

        }

        $query->orderBy($order, $sort)->skip($start)->take($length);

        $data['get_user_trans_data'] = $query->get();

        echo json_encode($data, JSON_UNESCAPED_UNICODE);exit;

    }

    public function changePassword(Request $request, $admin_id)
    {
        $admin = DB::table('lp_admin')->where('id', $admin_id)->get();

        $validator = validator::make($request->all(), [
            'old_password' => "required",
            'new_password' => 'required',
            'c_password' => 'required|same:new_password|different:old_password',
        ], [
            'old_password.required' => trans('message.err_old_password_req'),
            'new_password.required' => trans('message.err_new_password_req'),
            'c_password.required' => trans('message.err_cpassword_req'),
            'c_password.same' => trans('message.err_pass_cpass_not_same'),
            'c_password.different' => trans('message.err_npassword_oldpass_same'),
        ]);

        if ($validator->fails()) {
            $array['status'] = false;
            $array['title'] = 'Errors!';
            $array['message'] = $validator->errors()->first();
            echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
        }

        if (md5($request->old_password) != $admin[0]->password) {
            $array['status'] = false;
            $array['title'] = 'Error!';
            $array['message'] = trans('message.err_old_pass_wrong');
            echo json_encode($array, JSON_UNESCAPED_UNICODE);
            exit;
        }

        $update_pass = [
            'password' => md5($request->input('new_password')),
        ];

        $data['password_update'] = DB::table('lp_admin')->where('id', $admin_id)->update($update_pass);
        $array['status'] = true;
        $array['title'] = 'Success!';
        $array['message'] = trans('message.text_pass_succ_update');
        echo json_encode($array, JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function updateProfileData(Request $request, $admin_id)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
        ], [
            'first_name.required' => trans('message.err_first_name_req'),
            'last_name.required' => trans('message.err_last_name_req'),
            'email.required' => trans('message.err_email_req'),
            'email.email' => trans('message.err_valid_email'),
        ]);

        if ($validator->fails()) {
            $array['status'] = false;
            $array['title'] = 'Errors!';
            $array['message'] = $validator->errors()->first();
            echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
        }

        $profile = [
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'updated_at' => Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'), 'UTC')->setTimezone($this->timezone)->format('Y-m-d H:i:s'),
        ];

        $data['update_profile'] = DB::table('lp_admin')->where('id', $admin_id)->update($profile);

        $array['status'] = true;
        $array['title'] = 'Success!';
        $array['message'] = trans('message.text_profile_succ_update');
        echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;

    }

    public function getAllTransactionByStatus(Request $request, $received_status)
    {
        $columns = array(
            1 => 'transaction_id',
            2 => 'wallet_address',
            3 => 'from_amount',
            4 => 'from_currency',
            5 => 'from_rate',
            6 => 'to_amount',
            7 => 'to_currency',
            8 => 'to_rate',
            9 => 'currency_pair',
            10 => 'from_currency_id',
            11 => 'received_status',
            12 => 'created_at',
        );

        $search_txt = $request->input('search');
        $search = $search_txt['value'];

        $start = $request->input('start');

        $length = $request->input('length');

        $draw = $request->input('draw');

        $order_txt = $request->input('order');

        if (isset($order_txt) && !empty($order_txt[0]['column'])) {
            $order = $columns[$order_txt[0]['column']];
        } else {
            $order = $columns[12];
        }

        $sort_txt = $request->input('order');
        $sort = $sort_txt[0]['dir'];

        $total = DB::table('lp_transaction')
            ->where('received_status', $received_status)
            ->select(DB::raw('COUNT(transaction_id) as total'))
            ->get();

        $data['recordsTotal'] = $total[0]->total;

        $filtereData = DB::table('lp_transaction')
            ->where('received_status', $received_status)
            ->select(DB::raw('COUNT(transaction_id) as total'))
            ->get();

        $data['recordsFiltered'] = $filtereData[0]->total;

        $query = DB::table('lp_transaction')
            ->where('received_status', $received_status)
            ->select('transaction_id', 'wallet_address', 'from_amount', 'from_currency', 'from_rate', 'to_amount', 'to_currency', 'to_rate', 'currency_pair', 'received_status');

        if (!empty($search)) {
            $query->where('wallet_address', 'LIKE', "%{$search}%")
                ->orWhere('from_amount', 'LIKE', "{$search}")
                ->orWhere('from_currency', 'LIKE', "{$search}")
                ->orWhere('from_rate', 'LIKE', "{$search}")
                ->orWhere('to_amount', 'LIKE', "{$search}")
                ->orWhere('to_currency', 'LIKE', "{$search}")
                ->orWhere('to_rate', 'LIKE', "{$search}")
                ->orWhere('currency_pair', 'LIKE', "{$search}")
                ->orWhere('received_status', 'LIKE', "{$search}");

        }

        $query->orderBy($order, $sort)->skip($start)->take($length);

        $data['transaction_data'] = $query->get();

        echo json_encode($data, JSON_UNESCAPED_UNICODE);exit;
    }

    public function checkMaintenance(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'maintenance_status' => 'required',
            'maintenance_message' => 'required',
            'smtp_host' => 'required',
            'smtp_user' => 'required',
            'smtp_pass' => 'required',
            'smtp_port' => 'required',
            'smtp_secure' => 'required',
        ], [
            'maintenance_status.required' => trans('message.err_main_status_req'),
            'maintenance_message.required' => trans('message.err_main_msg_req'),
            'smtp_host.required' => trans('message.err_smtp_host_req'),
            'smtp_user.required' => trans('message.err_smtp_user_req'),
            'smtp_pass.required' => trans('message.err_smtp_pass_req'),
            'smtp_port.required' => trans('message.err_smtp_port_req'),
            'smtp_secure.required' => trans('message.err_smtp_secure_req'),
        ]);

        if ($validator->fails()) {
            $array['status'] = false;
            $array['title'] = 'Errors!';
            $array['message'] = $validator->errors()->first();
            echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
        }

        $settingArr = ['maintenance_status', 'maintenance_message', 'smtp_host', 'smtp_user', 'smtp_pass', 'smtp_port', 'smtp_secure'];

        for ($i = 0; $i < count($settingArr); $i++) {
            $settings_data = array('lp_settings_value' => $request->input($settingArr[$i]));

            $other_setting_update = DB::table('lp_settings')->where('lp_settings_name', $settingArr[$i])->update($settings_data);

        }

        $array['status'] = true;
        $array['title'] = 'Success.!';
        $array['message'] = trans('message.text_setting_succ_update');
        echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;

    }

    public function getToCurrency($fromCurrencyId)
    {
        $data['to_currency_id'] = DB::table('lp_currency_pair')
            ->where('c.status', '1')
            ->join('lp_currency as c', 'c.id', 'lp_currency_pair.to_currency_id')
            ->where('from_currency_id', $fromCurrencyId)
            ->groupBy('to_currency_id')
            ->select('c.id as currency_id', 'c.currency_code', 'to_currency_id')
            ->get();

        echo json_encode($data, JSON_UNESCAPED_UNICODE);exit;
    }

    public function getAllFromCurrency(Request $request)
    {

        $fromCurr = DB::table('lp_currency as c')
            ->where('c.status', '1')
            ->join('lp_currency_pair as cp', 'cp.from_currency_id', '=', 'c.id')
            ->groupBy('cp.from_currency_id')
            ->select('cp.from_currency_id', 'c.id', 'c.currency_code')
            ->get();

        $data['all_from_currency'] = $fromCurr;
        echo json_encode($data, JSON_UNESCAPED_UNICODE);exit;

    }

    public function setTransactionDatatable(Request $request)
    {

        $columns = array(
            1 => 'transaction_id',
            2 => 'wallet_address',
            3 => 'from_amount',
            4 => 'from_currency',
            5 => 'from_rate',
            6 => 'to_amount',
            7 => 'to_currency',
            8 => 'to_rate',
            9 => 'currency_pair',
            10 => 'received_status',
            11 => 'send_status',
            12 => 'created_at',
        );

        $search_txt = $request->input('search');
        $search = $search_txt['value'];

        $start = $request->input('start');

        $length = $request->input('length');

        $draw = $request->input('draw');

        $order_txt = $request->input('order');

        if (isset($order_txt) && !empty($order_txt[0]['column'])) {
            $order = $columns[$order_txt[0]['column']];
        } else {
            $order = $columns[12];
        }

        $sort_txt = $request->input('order');
        $sort = $sort_txt[0]['dir'];

        $total = DB::table('lp_transaction')
            ->select(DB::raw('COUNT(transaction_id) as total'))
            ->get();

        $data['recordsTotal'] = $total[0]->total;

        $filtereData = DB::table('lp_transaction')
            ->select(DB::raw('COUNT(transaction_id) as total'))
            ->get();

        $data['recordsFiltered'] = $filtereData[0]->total;

        $query = DB::table('lp_transaction')
            ->select('transaction_id', 'wallet_address', 'from_amount', 'from_currency', 'from_rate', 'to_amount', 'to_currency', 'to_rate', 'currency_pair', 'received_status', 'send_status');

        if (!empty($search)) {
            $query->where('wallet_address', 'LIKE', "%{$search}%")
                ->orWhere('from_amount', 'LIKE', "{$search}")
                ->orWhere('from_currency', 'LIKE', "{$search}")
                ->orWhere('from_rate', 'LIKE', "{$search}")
                ->orWhere('to_amount', 'LIKE', "{$search}")
                ->orWhere('to_currency', 'LIKE', "{$search}")
                ->orWhere('to_rate', 'LIKE', "{$search}")
                ->orWhere('currency_pair', 'LIKE', "{$search}")
                ->orWhere('received_status', 'LIKE', "{$search}")
                ->orWhere('send_status', 'LIKE', "{$search}");

        }

        $query->orderBy($order, $sort)->skip($start)->take($length);

        $data['get_transaction_data'] = $query->get();

        echo json_encode($data, JSON_UNESCAPED_UNICODE);exit;
    }

    public function addTransactionData(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'wallet_address' => 'required',
            'from_amount' => 'required|numeric',
            'from_currency' => 'required',
            'from_rate' => 'required|numeric',
            'to_amount' => 'required|numeric',
            'to_currency' => 'required',
            'to_rate' => 'required|numeric',
        ], [
            'wallet_address.required' => trans('message.err_wallet_address_req'),
            'from_amount.required' => trans('message.err_from_amount_req'),
            'from_amount.numeric' => trans('message.err_num_req'),
            'from_currency.required' => trans('message.err_from_curr_req'),
            'from_rate.required' => trans('message.err_from_rate_req'),
            'from_rate.numeric' => trans('message.err_num_req'),
            'to_amount.required' => trans('message.err_to_amount_req'),
            'to_amount.numeric' => trans('message.err_num_req'),
            'to_currency.required' => trans('message.err_to_curr_req'),
            'to_rate.required' => trans('message.err_to_rate_req'),
            'to_rate.numeric' => trans('message.err_num_req'),

        ]);

        if ($validator->fails()) {
            $array['status'] = false;
            $array['title'] = 'Errors!';
            $array['message'] = $validator->errors()->first();
            echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
        }

        $addTransaction = [
            'wallet_address' => $request->input('wallet_address'),
            'from_amount' => $request->input('from_amount'),
            'from_rate' => $request->input('from_rate'),
            'from_currency' => $request->input('from_currency'),
            'from_rate' => $request->input('from_rate'),
            'to_amount' => $request->input('to_amount'),
            'to_currency' => $request->input('to_currency'),
            'to_rate' => $request->input('to_rate'),
            'currency_pair' => $request->input('from_currency') . '-' . $request->input('to_currency'),
            'created_at' => Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'), 'UTC')->setTimezone($this->timezone)->format('Y-m-d H:i:s'),
        ];

        $data['transaction_insert'] = DB::table('lp_transaction')->insert($addTransaction);
        $array['status'] = true;
        $array['title'] = 'Success.!';
        $array['message'] = trans('message.text_trans_succ_insert');
        echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;

    }

    public function changeCurrencyPairStatus(Request $request, $curr_pair_id)
    {
        if ($request->input('status') == '0') {

            $inactivePair = [
                'status' => $request->input('status'),
            ];

            $data['update_status'] = DB::table('lp_currency_pair')->where('id', $curr_pair_id)->update($inactivePair);
        }

        if ($request->input('status') == '1') {

            $activePair = [
                'status' => $request->input('status'),
            ];

            $data['update_status'] = DB::table('lp_currency_pair')->where('id', $curr_pair_id)->update($activePair);
        }

        $array['status'] = true;
        $array['title'] = 'success.!';
        $array['message'] = trans('message.text_curr_pair_change_succ');
        echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
    }

    public function deleteCurrencyPairData(Request $request, $curr_pair_id)
    {
        $curr_id = DB::table('lp_currency_pair')->where('id', $curr_pair_id)->get();

        $data['delete_curr_pair'] = DB::table('lp_currency_pair')->where('id', $curr_pair_id)->delete();

        $array['status'] = true;
        $array['title'] = 'Success.!';
        $array['message'] = trans('message.text_succ_curr_pair_delete');
        echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;

    }

    public function updateCurrencyPairData(Request $request, $curr_pair_id)
    {
        $curr_id = DB::table('lp_currency_pair')->where('id', $curr_pair_id)->get();

        $validator = Validator::make($request->all(), [
            'from_currency_id' => 'required|numeric',
            'to_currency_id' => 'required|numeric',
        ], [
            'from_currency_id.required' => trans('message.err_from_curr_id_req'),
            'from_currency_id.numeric' => trans('message.err_num_req'),
            'to_currency_id.required' => trans('message.err_to_curr_id_req'),
            'to_currency_id.numeric' => trans('message.err_num_req'),
        ]);

        if ($validator->fails()) {
            $array['status'] = false;
            $array['title'] = 'Errors!';
            $array['message'] = $validator->errors()->first();
            echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
        }

        $updateCurrPair = [
            'from_currency_id' => $request->input('from_currency_id'),
            'to_currency_id' => $request->input('to_currency_id'),
            'updated_at' => Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'), 'UTC')->setTimezone($this->timezone)->format('Y-m-d H:i:s'),

        ];

        $data['curr_pair_update'] = DB::table('lp_currency_pair')->where('id', $curr_pair_id)->update($updateCurrPair);

        $array['status'] = true;
        $array['title'] = 'Success.!';
        $array['message'] = trans('message.text_curr_pair_succ_update');
        echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;

    }

    public function addCurrencyPairData(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'from_currency_id' => 'required|numeric',
            'to_currency_id' => 'required|numeric',
        ], [
            'from_currency_id.required' => trans('message.err_from_curr_id_req'),
            'from_currency_id.numeric' => trans('message.err_num_req'),
            'to_currency_id.required' => trans('message.err_to_curr_id_req'),
            'to_currency_id.numeric' => trans('message.err_num_req'),
        ]);

        if ($validator->fails()) {
            $array['status'] = false;
            $array['title'] = 'Errors!';
            $array['message'] = $validator->errors()->first();
            echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
        }

        $addCurrPair = [
            'from_currency_id' => $request->input('from_currency_id'),
            'to_currency_id' => $request->input('to_currency_id'),
            'created_at' => Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'), 'UTC')->setTimezone($this->timezone)->format('Y-m-d H:i:s'),
        ];

        $data['insert_curr_pair'] = DB::table('lp_currency_pair')->insert($addCurrPair);

        $array['status'] = true;
        $array['title'] = 'success.!';
        $array['message'] = trans('message.text_succ_curr_pair_insert');
        echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
    }

    public function changeCurrencyStatus(Request $request, $curr_id)
    {
        if ($request->input('status') == '0') {

            $inactive = [
                'status' => $request->input('status'),
            ];

            $data['update_status'] = DB::table('lp_currency')->where('id', $curr_id)->update($inactive);
        }

        if ($request->input('status') == '1') {

            $active = [
                'status' => $request->input('status'),
            ];

            $data['update_status'] = DB::table('lp_currency')->where('id', $curr_id)->update($active);
        }

        $array['status'] = true;
        $array['title'] = 'success.!';
        $array['message'] = trans('message.text_curr_change_succ');
        echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
    }

    public function deleteCurrencyData(Request $request, $curr_id)
    {
        $curr_data = DB::table('lp_currency')->where('id', $curr_id)->first();

        if (file_exists(substr(base_path(), 0, strrpos(base_path(), '/')) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'currency_image' . DIRECTORY_SEPARATOR . $curr_data->image)) {
            @unlink(substr(base_path(), 0, strrpos(base_path(), '/')) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'currency_image' . DIRECTORY_SEPARATOR . $curr_data->image);
        }

        $data['delete_curr_pair'] = DB::table('lp_currency')->where('id', $curr_id)->delete();

        $array['status'] = true;
        $array['title'] = 'Success.!';
        $array['message'] = trans('message.text_currency_succ_delete');
        echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
    }

    public function updateCurrencyData(Request $request, $curr_id)
    {
        $curr_data = DB::table('lp_currency')->where('id', $curr_id)->first();

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'currency_code' => 'required',
            'image' => 'mimetypes:image/png,image/jpeg,image/svg|max:2000000',
            'contract_address' => 'required',
            'abi_key' => 'required',
            'decimal_point' => 'required|numeric',
            'private_key' => 'required',
            'receive_wallet_address' => 'required',
        ], [
            'name.required' => trans('message.err_curr_name_req'),
            'currency_code.required' => trans('message.err_curr_symbol_req'),
            'image.mimetypes' => trans('message.err_img_mime_req'),
            'image.max' => trans('message.err_img_size_req'),
            'contract_address.required' => trans('message.err_contrct_add_req'),
            'abi_key.required' => trans('message.err_abi_key_req'),
            'decimal_point.required' => trans('message.err_dec_point_req'),
            'decimal_point.numeric' => trans('message.err_num_req'),
            'private_key.required' => trans('message.err_private_key_req'),
            'receive_wallet_address.required' => trans('message.err_receive_add_req'),
        ]);

        if ($validator->fails()) {
            $array['status'] = false;
            $array['title'] = 'Errors!';
            $array['message'] = $validator->errors()->first();
            echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
        }

        $file = $request->file('image');

        if ($file == '') {

            $filename = $curr_data->image;
        } else {

            $allowed_type_arr = array('jpeg', 'png', 'jpg');

            if (!in_array($file->getClientOriginalExtension(), $allowed_type_arr)) {
                $array['status'] = false;
                $array['title'] = 'Errors!';
                $array['message'] = trans('File type not valid !');
                echo json_encode($array, JSON_UNESCAPED_UNICODE);
                exit;
            }

            if ($file->getClientSize() > 2000000) {
                $array['status'] = false;
                $array['title'] = 'Error!';
                $array['message'] = trans('Image size exceeds 2MB !');
                echo json_encode($array, JSON_UNESCAPED_UNICODE);
                exit;
            }

            if (file_exists(substr(base_path(), 0, strrpos(base_path(), '/')) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'currency_image' . DIRECTORY_SEPARATOR . $curr_data->image)) {
                @unlink(substr(base_path(), 0, strrpos(base_path(), '/')) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'currency_image' . DIRECTORY_SEPARATOR . $curr_data->image);
            }

            $destinationPath = substr(base_path(), 0, strrpos(base_path(), '/')) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'currency_image' . DIRECTORY_SEPARATOR;
            $destinationPathThumb = $destinationPath . 'thumb/';

            $file_name = $file->getClientOriginalName();

            $unique = $this->generateUniqueFilePrefix();
            $filename = $unique . '_' . preg_replace("/\s+/", "_", $file_name);

            // Upload the original
            $original = $file->move($destinationPath, $filename);
        }

        $updateCurrency = [
            'name' => $request->input('name'),
            'currency_code' => $request->input('currency_code'),
            'image' => $filename,
            'contract_address' => $request->input('contract_address'),
            'abi_key' => $request->input('abi_key'),
            'decimal_point' => $request->input('decimal_point'),
            'private_key' => $request->input('private_key'),
            'receive_wallet_address' => $request->input('receive_wallet_address'),
            'updated_at' => Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'), 'UTC')->setTimezone($this->timezone)->format('Y-m-d H:i:s'),
        ];

        $data['currency_update'] = DB::table('lp_currency')->where('id', $curr_id)->update($updateCurrency);

        $array['status'] = true;
        $array['title'] = 'Success.!';
        $array['message'] = trans('message.text_currency_succ_update');
        echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
    }

    public function addCurrencyData(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'currency_code' => 'required',
            'image' => 'required|mimetypes:image/png,image/jpeg,image/svg|max:2000000',
            'contract_address' => 'required',
            'abi_key' => 'required',
            'decimal_point' => 'required|numeric',
            'private_key' => 'required',
            'receive_wallet_address' => 'required',
        ], [
            'name.required' => trans('message.err_curr_name_req'),
            'currency_code.required' => trans('message.err_curr_symbol_req'),
            'image.required' => trans('message.err_curr_img_req'),
            'image.mimetypes' => trans('message.err_img_mime_req'),
            'image.max' => trans('message.err_img_size_req'),
            'contract_address.required' => trans('message.err_contrct_add_req'),
            'abi_key.required' => trans('message.err_abi_key_req'),
            'decimal_point.required' => trans('message.err_dec_point_req'),
            'decimal_point.numeric' => trans('message.err_num_req'),
            'private_key.required' => trans('message.err_private_key_req'),
            'receive_wallet_address.required' => trans('message.err_receive_add_req'),
        ]);

        if ($validator->fails()) {
            $array['status'] = false;
            $array['title'] = 'Errors!';
            $array['message'] = $validator->errors()->first();
            echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
        }

        $file = $request->file('image');

        if ($file == '') {
            $filename = "";
        } else {

            $destinationPath = substr(base_path(), 0, strrpos(base_path(), '/')) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'currency_image' . DIRECTORY_SEPARATOR;
            $destinationPathThumb = $destinationPath . 'thumb/';

            $file_name = $file->getClientOriginalName();

            $unique = $this->generateUniqueFilePrefix();
            $filename = $unique . '_' . preg_replace("/\s+/", "_", $file_name);

            $original = $file->move($destinationPath, $filename);

        }

        $addCurrency = [
            'name' => $request->input('name'),
            'currency_code' => $request->input('currency_code'),
            'image' => $filename,
            'contract_address' => $request->input('contract_address'),
            'abi_key' => $request->input('abi_key'),
            'decimal_point' => $request->input('decimal_point'),
            'private_key' => $request->input('private_key'),
            'receive_wallet_address' => $request->input('receive_wallet_address'),
            'created_at' => Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'), 'UTC')->setTimezone($this->timezone)->format('Y-m-d H:i:s'),
        ];

        $data['currency_insert'] = DB::table('lp_currency')->insert($addCurrency);

        $array['status'] = true;
        $array['title'] = 'Success.!';
        $array['message'] = trans('message.text_currency_succ_add');
        echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
    }

    public function getCurrencyDatatable(Request $request)
    {
        $columns = array(
            1 => 'id',
            2 => 'name',
            3 => 'currency_code',
            4 => 'image',
            5 => 'contract_address',
            6 => 'abi_key',
            7 => 'decimal_point',
            8 => 'private_key',
            9 => 'receive_wallet_address',
            10 => 'status',
            11 => 'created_at',
            12 => 'updated_at',
        );

        $search_txt = $request->input('search');
        $search = $search_txt['value'];

        $start = $request->input('start');

        $length = $request->input('length');

        $draw = $request->input('draw');

        $order_txt = $request->input('order');

        if (isset($order_txt) && !empty($order_txt[0]['column'])) {
            $order = $columns[$order_txt[0]['column']];
        } else {
            $order = $columns[1];
        }

        $sort_txt = $request->input('order');
        $sort = $sort_txt[0]['dir'];

        $total = DB::table('lp_currency')
            ->select(DB::raw('COUNT(id) as total'))
            ->get();

        $data['recordsTotal'] = $total[0]->total;

        $filtereData = DB::table('lp_currency')
            ->select(DB::raw('COUNT(id) as total'))
            ->get();

        $data['recordsFiltered'] = $filtereData[0]->total;

        $query = DB::table('lp_currency')
            ->select('id', 'name', 'currency_code', 'contract_address', 'abi_key', 'decimal_point', 'private_key', 'receive_wallet_address', 'status', 'created_at', 'updated_at', DB::raw('(CASE WHEN image = "" THEN "" ELSE CONCAT ("' . $this->base_url . '/uploads/currency_image/", image) END) AS image'));

        if (!empty($search)) {
            $query->where('id', 'LIKE', "%{$search}%")
                ->orWhere('name', 'LIKE', "{$search}")
                ->orWhere('currency_code', 'LIKE', "{$search}")
                ->orWhere('contract_address', 'LIKE', "{$search}")
                ->orWhere('abi_key', 'LIKE', "{$search}")
                ->orWhere('decimal_point', 'LIKE', "{$search}")
                ->orWhere('private_key', 'LIKE', "{$search}")
                ->orWhere('receive_wallet_address', 'LIKE', "{$search}")
                ->orWhere('status', 'LIKE', "{$search}")
                ->orWhere('created_at', 'LIKE', "{$search}")
                ->orWhere('updated_at', 'LIKE', "{$search}");

        }

        $query->orderBy($order, $sort)->skip($start)->take($length);

        $data['get_currency_data'] = $query->get();

        echo json_encode($data, JSON_UNESCAPED_UNICODE);exit;
    }

    public function getUserwallteData(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'wallet_address' => 'required|', #unique:lp_users,wallet_address',
        ], [
            'wallet_address.required' => trans('message.err_wallet_address_req'),
            // 'wallet_address.unique' => trans('message.err_wallet_address_exist_req'),
            // 'wallet_address.min' => trans('message.err_wallet_address_min_req'),
        ]);

        if ($validator->fails()) {
            $array['status'] = false;
            $array['title'] = 'Errors!';
            $array['message'] = $validator->errors()->first();
            echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
        }

        $user = DB::table('lp_users')->where('wallet_address', $request->input('wallet_address'))->first();

        if ($user) {

            if ($user->wallet_address == $request->input('wallet_address')) {

                $user_data = DB::table('lp_users')->where('user_id', $user->user_id)->first();

                $array['status'] = true;
                $array['title'] = 'wallet Connect Succesfully.';
                $array['message'] = $user_data;
                echo json_encode($array, JSON_UNESCAPED_UNICODE);
                exit;
            }
        } else {

            $wallet_address = [
                'wallet_address' => $request->input('wallet_address'),
                'created_at' => Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'), 'UTC')->setTimezone($this->timezone)->format('Y-m-d H:i:s'),

            ];

            $user_data = DB::table('lp_users')->insert($wallet_address);

            $userData = DB::table('lp_users')->where('wallet_address', $request->input('wallet_address'))->first();

            $array['status'] = true;
            $array['title'] = 'success!';
            $array['message'] = trans('message.text_user_succ_insert');
            $array['data'] = $userData;
            echo json_encode($array, JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    public function changeForgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'new_password' => 'required',
            'c_password' => 'required|same:new_password',
        ], [
            'new_password.required' => trans('message.err_new_password_req'),
            'c_password.required' => trans('message.err_c_pass_req'),
            'c_password.same' => trans('message.err_pass_cpass_not_same'),
        ]);

        if ($validator->fails()) {
            $array['status'] = false;
            $array['title'] = 'Errors!';
            $array['message'] = $validator->errors()->first();
            echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
        }

        $newPass = [
            'password' => md5($request->input('new_password')),
            'updated_at' => Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'), 'UTC')->setTimezone($this->timezone)->format('Y-m-d H:i:s'),
        ];

        $data['update_pass'] = DB::table('lp_admin')->where('id', $request->input('id'))->update($newPass);

        $array['status'] = true;
        $array['title'] = 'success.!';
        $array['message'] = trans('message.text_pass_succ_update');
        echo json_encode($array, JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function adminSendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ], [
            'email.required' => trans('message.err_email_req'),
            'email.email' => trans('message.err_valid_email_req'),
        ]);

        if ($validator->fails()) {
            $array['status'] = false;
            $array['title'] = 'Errors!';
            $array['message'] = $validator->errors()->first();
            echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
        }

        $admin = DB::table('lp_admin')->where('email', $request->input('email'))->first();

        if ($admin != '') {
            if ($request->input('email') == $admin->email) {
                $otp = $this->Generate_otp(6);
                $smtpUsername = $this->system_config['smtp_user'];
                $smtpPassword = $this->system_config['smtp_pass'];
                $emailFrom = $this->system_config['company_email'];
                $emailFromName = $this->system_config['company_name'];
                $emailTo = $request->input('email');
                $mail = new PHPmailer;

                $mail->isSMTP();
                $mail->Host = $this->system_config['smtp_host'];
                $mail->Port = $this->system_config['smtp_port'];
                $mail->SMTPSecure = $this->system_config['smtp_secure'];
                $mail->SMTPAuth = true;
                $mail->Username = $smtpUsername;
                $mail->Password = $smtpPassword;
                $mail->setFrom($smtpUsername, $smtpPassword);
                $mail->addAddress($emailTo);
                $mail->isHTML(true);
                $mail->Subject = "Password Recover";
                $mail->Body = "<html>
                                    <head>
                                    <title>Password Recover </title>
                                    </head>
                                    <body>
                                    <p>Your verification otp is : $otp</p>
                                    </body>
                                </html>";
                $mail->send();
                $array['status'] = true;
                $array['title'] = 'success!';
                $array['message'] = trans('message.text_admin_succ_send_mail');
                $array['admin_id'] = $admin->id;
                $array['otp'] = $otp;
                header('Access-Control-Allow-Origin: *');
                header('Content-type: application/json');
                echo json_encode($array, JSON_UNESCAPED_UNICODE);
                exit;
            }
        } else {
            $array['status'] = false;
            $array['title'] = 'Login Failed';
            $array['message'] = trans('message.err_admin_incorrect_username');
            echo json_encode($array, JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    public function authenticate(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ], [
            'username.required' => trans('message.err_username_req'),
            'password.required' => trans('message.err_password_req'),
        ]);

        if ($validator->fails()) {
            $array['status'] = false;
            $array['title'] = 'Errors!';
            $array['message'] = $validator->errors()->first();
            echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
        }

        $admin = DB::table('lp_admin')->where('username', $request->input('username'))->first();
        if ($admin) {
            if ($admin->password == md5($request->input('password'))) {

                $admin_data = DB::table('lp_admin')->where('id', $admin->id)->first();

                $array['status'] = true;
                $array['title'] = 'Login successfull';
                $array['message'] = $admin_data;
                echo json_encode($array, JSON_UNESCAPED_UNICODE);
                exit;
            } else {
                $array['status'] = false;
                $array['title'] = 'Login Failed';
                $array['message'] = trans('message.err_admin_incorrect_pass');
                echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
            }
        } else {
            $array['status'] = false;
            $array['title'] = 'Login Failed';
            $array['message'] = trans('message.err_admin_incorrect_username');
            echo json_encode($array, JSON_UNESCAPED_UNICODE);exit;
        }
    }
}
