<template>
  <div>
    <client-only>
      <Header></Header>
    </client-only>

    <div class="pt72">
      <nuxt />
    </div>

    <client-only>
      <Footer></Footer>
      <Login></Login>
      <Register></Register>
      <ForgotPassword></ForgotPassword>
    </client-only>
  </div>
</template>

<script>
import Header from "./../components/the-header";
import Footer from "./../components/the-footer";
import Login from "./../components/auth/login";
import Register from "./../components/auth/register";
import ForgotPassword from "./../components/auth/forgot-password";
import ContactService from "./../utils/services/ContactService";
import ProductService from "./../utils/services/ProductService";
import CustomerService from "./../utils/services/CustomerService";
import { mapState } from "vuex";

export default {
  components: {
    Header,
    Footer,
    Login,
    ForgotPassword,
    Register
  },
  created() {
    if (process.client) this.getToken();
    this.getContact();
    this.getProductEachBrand();
    this.getProductFromCartAndWishlist()
  },
  computed: {
    ...mapState(["MainStore"])
  },
  methods: {
    getToken() {
      let token = this.$cookies.get("token");
      if (token) {
        this.$store.commit("STORE_TOKEN", token);
        this.getCustomerDetail();
      }
    },

    getProductFromCartAndWishlist() {
      let productInCart = this.$auth.$storage.getLocalStorage("productInCart");
      let productInWishlist = this.$auth.$storage.getLocalStorage("productInWishlist");
      this.$store.commit("STORE_PRODUCT_IN_CART", productInCart);
      this.$store.commit("STORE_PRODUCT_IN_WISHLIST", productInWishlist);
    },

    getCustomerDetail() {
      CustomerService.getCustomerDetail()
        .then(response => {
          if (response.response && response.response.status == 200) {
            let customer = response.results;
            this.$store.commit("STORE_USER_INFO", customer);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    getContact() {
      ContactService.getContact()
        .then(response => {
          if (response.response && response.response.status == 200) {
            this.$store.commit("STORE_CONTACT", response.results);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    getProductEachBrand() {
      ProductService.getProductEachBrand()
        .then(response => {
          if (response.response && response.response.status == 200) {
            this.$store.commit("STORE_PRODUCT_EACH_BRAND", response.results);
          }
        })
        .catch(err => {
          console.log(err);
        });
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
a {
  text-decoration: none;
}
.m-container {
  max-width: 1410px;
  margin: 0 auto;
  position: relative;
  display: block;
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
  bottom: 0;
  z-index: 9999;
  overflow-y: auto;
}
.auth-bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
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

.hooper {
  height: auto !important;
}

.hover-btn-cart {
  width: fit-content;
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  display: none;
}
.btn-cart-item {
  width: 42px;
  height: 42px;
  border: 1px solid #ddd;
  float: left;
  position: relative;
  background: var(--white);
}
.btn-cart-item:hover {
  background: var(--primary);
}
.btn-cart-item:hover img {
  filter: brightness(0) invert(1);
}
.hover-btn-cart img {
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.p-item-hover:hover .hover-btn-cart {
  display: block;
}

.tag-discount {
  background: #b12a2a;
  color: #fff;
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 2px 6px;
  font-size: 14px;
}

.tag-type {
  max-width: 100px;
  background: #c0a483;
  color: #fff;
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 2px 6px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-filter {
  width: 100%;
  display: inline-flex;
  margin-bottom: 10px;
  cursor: pointer;
}
.item-radio {
  width: 16px;
  height: 16px;
  border: 1px solid #000;
  border-radius: 50%;
  margin-top: 4px;
  margin-right: 12px;
  cursor: pointer;
  position: relative;
}
.item-radio .item-ic {
  font-size: 12px;
  position: absolute;
  top: 1px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
}
.item-radio-active {
  width: 16px;
  height: 16px;
  border: 1px solid var(--primary);
  border-radius: 50%;
  margin-top: 4px;
  margin-right: 12px;
  cursor: pointer;
  position: relative;
  background: var(--primary);
}
.item-radio-active .item-ic {
  font-size: 12px;
  position: absolute;
  top: 1px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--white);
}

.p-name{
  color: var(--dark-light);
  margin-bottom:6px
}
.p-discount{
  color: var(--primary);
  font-size:16px;
}
.p-price{
  color: var(--dark-light);
  margin-right:6px;
}
.message-error{
  width: 100%;margin-bottom: 12px;border-top:3px solid #ee3535;padding:16px 12px;background:#fff1f1;display: inline-block;position: relative;
}
.message-success{
  width: 100%;margin-bottom: 12px;border-top:3px solid #01cb45;padding:16px 12px;background:#eeffee;display: inline-block;position: relative;
}
.message-info{
  width: 100%;margin-bottom: 12px;border-top:3px solid #3498db;padding:16px 12px;background:#e9f6ff;display: inline-block;position: relative;
}
.agile__nav-button--prev{
  background: none;
  border-radius: 50%;
  padding: 6px 8px;
  border: 1px solid #fff;
  color: #fff;
  font-size: 20px;
  position: absolute;
  top:50%;
  left:12px;
  transform: translateY(-50%);
  cursor: pointer;
}
.agile__nav-button--next{
  background: none;
  border-radius: 50%;
  padding: 6px 8px;
  border: 1px solid #fff;
  color: #fff;
  font-size: 20px;
  position: absolute;
  top:50%;
  right:12px;
  transform: translateY(-50%);
  cursor: pointer;
}
.agile__dots{
  position: absolute;
  bottom:0px;
  left: 50%;
  transform: translateX(-50%);
}
.agile__dot button{
  background: #fff;
  width: 16px;
  height: 4px;
  border: none;
  margin: 0 2px;
  cursor: pointer;
}
.slide-img{
  width: 100%;height: 550px;object-fit: cover;
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
  .pt72{
    padding-top: 49px;
  }
  .post-content-area iframe {
    height: 240px;
  }
  .tag-type{
    font-size: 10px;
  }
  .tag-discount{
    font-size: 10px;
  }
  .p-name{
    font-size: 13px;
  }
  .p-discount{
    font-size: 14px;
  }
  .p-price{
    font-size: 14px;
  }
  .slide-img{
    height: 400px;
  }
}

@media screen and (max-width: 600px) {
  .block-auth{
    width: 90%;
  }
  .slide-img{
    height: 320px;
  }
}

@media screen and (max-width: 425px) {
  .slide-img{
    height: 240px;
  }
}
</style>