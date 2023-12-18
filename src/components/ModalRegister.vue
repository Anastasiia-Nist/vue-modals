<template>
  <modal-vue title="Регистрация" @close="resetClose">
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

        <div
          class="form-item"
          :class="{ 'form-item-error': $v.repeatPassword.$error }"
        >
          <label>Повторите пароль</label>
          <input
            v-model.trim="repeatPassword"
            @change="$v.repeatPassword.$touch()"
          />
          <div class="error" v-if="!$v.repeatPassword.sameAsPassword">
            Пароль должен совпадать
          </div>
        </div>
        <button class="btn btnPrimary">Регистрация</button>
      </form>
    </div>
  </modal-vue>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import modalVue from "@/components/UI/ModalVue.vue";
export default {
  components: {
    modalVue,
  },
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
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
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
  methods: {
    resetClose() {
      this.email = "";
      this.password = "";
      this.repeatPassword = "";
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
</style>