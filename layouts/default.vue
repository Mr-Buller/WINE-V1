<template>
  <div>
    <Header></Header>
    <nuxt />
    <div
      style="width:100%;height:100vh;background:rgba(0,0,0,.5);position:fixed;top:0;left:0;z-index:9999"
    >
      <div style="width:350px;height:100vh;position:fixed;top:0;right:0;background:#fff;overflow-y:auto">
        <div class="row p12" style="border-bottom:1px solid #ddd;">
          <b>SHOPPING CART</b>
          <i class="fa fa-times go-right mt3 pointer"></i>
        </div>
        <div class="row">
          <div
            v-for="k in 10"
            :key="k"
            style="width:100%;display:inline-block;padding-left:72px;border-bottom:1px solid #ddd;position:relative;"
          >
            <img
              src="https://www.s-liquor.com.kh/wp-content/uploads/2021/02/Poliakov-Lemon-700ml-01-300x300.png"
              style="width:60px;height:60px;object-fit:cover;position:absolute;top:12px;left:12px;"
            />
            <div class="row p12">
              <p class="mb3">Poliakov Lemon 700ml</p>
              <p class="font14 txt-primary mb6">Qty : 12</p>
              <p class="txt-danger mb0">
                <b>$109.75</b>
                <span class="font12 txt-danger pointer go-right">Remove</span>
              </p>
            </div>
          </div>
          <div class="row p12 mt24">
            <p>Subtotal : <span class="txt-danger">$329.25</span></p>
            <div class="bg-primary" style="width:100%;padding:10px;color:#fff;text-align:center;cursor:pointer;">CHECKOUT</div>
            <div class="bg-secondary mt12" style="width:100%;padding:10px;text-align:center;cursor:pointer;">VIEW CART</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeService from "./../utils/services/home";
import Header from "./../components/the-header";

export default {
  components: {
    Header
  },
  created() {
    this.googleAnaltic();
    this.getBanner();
  },
  methods: {
    getBanner() {
      HomeService.getBanner().then(response => {
        if (response.status === 1) {
          console.log("banner", response);
          // this.$store.dispatch("storeBanners", response.data.records);
          this.$store.commit("BANNERS", response.data.records);
        }
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