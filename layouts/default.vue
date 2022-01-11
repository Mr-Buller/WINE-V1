<template>
  <div>
    <client-only>
      <Header></Header>
    </client-only>
    
    <div class="pt45">
      <nuxt />
    </div>

    <client-only>
      <Footer></Footer>
      <Login></Login>
      <Register></Register>
    </client-only>
  </div>
</template>

<script>
import Header from "./../components/the-header";
import Footer from "./../components/the-footer";
import Login from "./../components/auth/login";
import Register from "./../components/auth/register";
import { mapState } from "vuex";

export default {
  created() {
    // this.googleAnaltic();
    if(process.client)
    this.getToken();
  },
  components: {
    Header,
    Footer,
    Login,
    Register
  },
  computed: {
    ...mapState(["MainStore"])
  },
  methods: {
    getToken() {
      let token = this.$cookies.get('token')
      this.$store.commit("STORE_TOKEN", token);
    },

    googleAnaltic() {
      if (process.client) {
        this.$gtag.event("active-realtime", {
          event_category: "homepage",
          event_label: "Refresh",
          value: 1
        });
      }
    }
  }
};
</script>

<style>
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.ic-play-xs {
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.ic-play-xs img {
  width: 16px;
  min-height: 16px !important;
  max-height: 16px !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.post-content-area img {
  width: 100% !important;
}
.post-content-area iframe {
  width: 100% !important;
  height: 420px;
}
.ql-align-center {
  text-align: center;
}

.loading {
  width: 100%;
  display: inline-block;
  text-align: center;
}

.vue-flux,
.flux-transaction {
  max-height: 80vh !important;
}
.flux-image {
  max-height: 80vh !important;
  background-size: cover !important;
  background-position: center !important;
}

.auth-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
.auth-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.block-auth {
  width: 520px;
  background: #fff;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  border-top: 3px solid #bfa483;
  padding: 24px;
}
.w-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 16px;
}

@media screen and (max-width: 991px) {
  .logo img {
    max-width: 100%;
  }
  .ad-banner {
    margin-top: 24px;
  }
}

@media screen and (max-width: 767px) {
  .post-content-area iframe {
    height: 240px;
  }
}
</style>