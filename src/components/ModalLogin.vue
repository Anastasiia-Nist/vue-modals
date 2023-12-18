<template>
  <modal-vue title="Авторизация" @close="resetClose">
    <div slot="body">
      <form @submit.prevent="submit">
        <!-- email -->
        <div class="form-item" :class="{ 'form-item-error': $v.email.$error }">
          <label>Email:</label>
          <input v-model.trim="email" @change="$v.email.$touch()" />
          <div class="error" v-if="!$v.email.required">Обязательное поле</div>
          <div class="error" v-if="!$v.email.email">Некорректный email</div>
        </div>
        <!-- пароль -->
        <div
          class="form-item"
          :class="{ 'form-item-error': $v.password.$error }"
        >
          <label>Пароль:</label>
          <input v-model.trim="password" @change="$v.password.$touch()" />
          <div class="error" v-if="!$v.password.required">
            Обязательное поле
          </div>
          <div class="error" v-if="!$v.password.minLength">
            Пароль должен быть длиннее
            {{ $v.password.$params.minLength.min - 1 }}
          </div>
        </div>
        <button class="btn btnPrimary">Войти</button>
        <span class="auth-span"
          ><p>Ещё не зарегистрированы?</p>
          <button class="btn btnDefaul" @click.prevent="transition">
            Регистрация
          </button></span
        >
      </form>
    </div>
  </modal-vue>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import modalVue from "@/components/UI/ModalVue.vue";
export default {
  components: {
    modalVue,
  },
  props: {
    openModal: {
      type: Function,
      requires: true,
    },
  },

  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  methods: {
    transition() {
      this.resetClose();
      this.openModal();
    },
    resetClose() {
      this.email = "";
      this.password = "";
      this.$v.$reset();
      this.$emit("close");
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = {
          email: this.email,
          password: this.password,
        };
        console.log(user);
        this.resetClose();
      } else {
        console.log("error validate form");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-item .error {
  display: none;
  margin-bottom: 8px;
  font-size: 12px;
  color: #c72a2a;
}
.form-item.form-item-error .error {
  display: block;
}
.form-item-error input {
  border-color: #c72a2a;
}
.auth-span {
  font-size: 12px;
}
.btn.btnDefaul {
  font-size: 12px;
}
</style>