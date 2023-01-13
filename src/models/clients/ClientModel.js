import ClientPersonModel from "@/models/clients/ClientPersonModel";
import CreditSummaryModel from "@/models/clients/CreditSummaryModel";
export default {
    client: () => {
        return {
            person: ClientPersonModel.person()
            , credit_summary: CreditSummaryModel.creditSummary()
            , addresses: []
            , client_israels: []
            , cc_accounts: []
            , loans: []
            , credit_reports: []
            , checkings: []
            , credit_line_histories: []
        }
    },
}
