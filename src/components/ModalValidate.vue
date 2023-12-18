<template>
  <modal-vue title="third modal" @close="resetClose">
    <div slot="body">
      <form @submit.prevent="submit">
        <!-- name -->
        <div class="form-item" :class="{ 'form-item-error': $v.name.$error }">
          <label>Name:</label>
          <input v-model.trim="name" @change="$v.name.$touch()" />
          <div class="error" v-if="!$v.name.required">Field is required</div>
          <div class="error" v-if="!$v.name.minLength">
            Name must have at least {{ $v.name.$params.minLength.min }} letters.
          </div>
        </div>
        <!-- email -->
        <div class="form-item" :class="{ 'form-item-error': $v.email.$error }">
          <label>Email:</label>
          <input v-model.trim="email" @change="$v.email.$touch()" />
          <div class="error" v-if="!$v.email.required">Field is required</div>
          <div class="error" v-if="!$v.email.email">Email is not correct</div>
        </div>
        <!-- password -->
        <div
          class="form-item"
          :class="{ 'form-item-error': $v.password.$error }"
        >
          <label>Password</label>
          <input v-model.trim="password" @change="$v.password.$touch()"/>
          <div class="error" v-if="!$v.password.required">
            Password is required.
          </div>
          <div class="error" v-if="!$v.password.minLength">
            Password must have at least
            {{ $v.password.$params.minLength.min }} letters.
          </div>
        </div>

        <div
          class="form-item"
          :class="{ 'form-item-error': $v.repeatPassword.$error }"
        >
          <label>Repeat password</label>
          <input v-model.trim="repeatPassword" @change="$v.repeatPassword.$touch()" />
          <div class="error" v-if="!$v.repeatPassword.sameAsPassword">
            Passwords must be identical.
          </div>
        </div>
        <button class="btn btnPrimary">Submit</button>
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
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
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
      this.name = "";
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
          name: this.name,
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
