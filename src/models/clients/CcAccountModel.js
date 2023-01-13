export default {
        ccAccount() {
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

        newCcAccount(clientPerson) {
                let cc_account = this.ccAccount();
                cc_account.id = 0;
                cc_account.client_id = clientPerson.client_id;
                cc_account.client_code = clientPerson.client_code;
                cc_account.last_name = clientPerson.last_name;
                cc_account.first_name = clientPerson.first_name;
                return cc_account;
        }
}