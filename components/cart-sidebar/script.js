export default {
    name: "cart-sidebar",
    data() {
        return {
            
        }
    },
    components: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
        hideCartSidebar(event) {
            this.$emit('clicked', false)
        }
    },
}