import { mapState } from 'vuex'

export default {
    name: 'unauthorized',
    data() {
        return {
        }
    },
    components: {

    },
    created() {

    },
    computed: {
        ...mapState([
            'MainStore'
        ])
    },
    methods: {
        switchAuthDialog(type) {
            this.$store.commit("SHOW_LOGIN_DIALOG", type);
        },
    }
}