import CustomerService from './../../../utils/services/CustomerService'
import Loading from './../../../components/loading'

export default {
    name: "confirm-account",
    data() {
        return {
            isFetching: false,
            isSuccess: false
        }
    },
    components: {
        Loading
    },
    created() {
        this.confirmAccount()
    },
    mounted() {
    },
    computed: {
       
    },
    methods: {
        confirmAccount(){
            let token = this.$route.query.ref
            if(token){
                let body = {
                    token: token.split(" ").join("+")
                }
                CustomerService.verifyAccount(body).then(response => {
                    if (response && response.status == 200) {
                        this.isSuccess = true
                    }
                    this.isFetching = false
                })
            }
        }
    },
}