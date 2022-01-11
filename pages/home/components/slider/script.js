import { VueFlux,FluxCaption,FluxIndex } from 'vue-flux/dist-ssr/vue-flux.umd.min.js';
import 'vue-flux/dist-ssr/vue-flux.css';

export default {
    name: "home-slider",
    props:{
        vfOptions: Object,
        vfImages: Array,
        vfTransitions: Array,
        vfCaptions: Array
    },
    data() {
        return {
            
        }
    },
    components: {
        VueFlux,
        FluxCaption,
        FluxIndex
    },
    created() {

    },
    mounted() {

    },
    methods: {
        slider(e){
            console.log(e)
        },

        prevSlide(){
            console.log(this.$refs)
            this.$refs.slider.show('prev')
        }
    },
}