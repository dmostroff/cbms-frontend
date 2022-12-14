export default {

        cc_account() {
                return {
                        id: null
                        , client_id: null
                        , xero_id: null
                        , client_code: null
                        , first_name: null
                        , last_name: null
                        , card_name: null
                        , card_status: null
                        , device: null
                        , open_date: null
                        , cc_login: null
                        , cc_pwd: null
                        , card_number: null
                        , card_exp: null
                        , card_cvv: null
                        , card_pin: null
                        , reconciled_on: null
                        , charged_on: null
                        , credit_line: null
                        , due_on: null
                        , bonus_to_spend: null
                        , bonus_spend_by: null
                        , bonus_spent: null
                        , ccaccount_info: null
                        , task: null
                        , in_charge: null
                        , notes: null
                        , recorded_on: null
                }
        },

        new_cc_account(client_id, client_code) {
                let cc_account = this.cc_account();
                cc_account.client_id = client_id;
                cc_account.client_code = client_code;
                return cc_account;
        }
}