<template>
  <div class="wrapper" @keyup.esc="closeByEsc">
    <div class="wrapper-content wrapper-content--fixed">
      <section>
        <div class="container">
          <!-- логин  -->

          <button class="btn btnPrimary" @click="modalLogin = true">
            Логин
          </button>
          <modal-login
            :openModal="openModalRegister"
            v-show="modalLogin"
            @close="modalLogin = false"
          ></modal-login>

          <!-- регистрация -->

          <button class="btn btnPrimary" @click="modalRegister = true">
            Регистрация
          </button>
          <modal-register
            :openModal="openModalLogin"
            v-show="modalRegister"
            @close="modalRegister = false"
          ></modal-register>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import ModalLogin from "@/components/ModalLogin.vue";
import ModalRegister from "@/components/ModalRegister.vue";

export default {
  components: {
    ModalLogin,
    ModalRegister,
  },
  data() {
    return {
      modalLogin: false,
      modalRegister: false,
    };
  },
  methods: {
    openModalLogin() {
      this.modalLogin = true;
    },
    openModalRegister() {
      this.modalRegister = true;
    },
    closeByEsc() {
      this.modalLogin = false;
      this.modalRegister = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .btn {
    width: 60%;
  }
}
</style>