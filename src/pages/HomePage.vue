<template>
  <div class="wrapper" @keyup.esc="closeByEsc">
    <div class="wrapper-content wrapper-content--fixed">
      <section>
        <div class="container">
          <!-- простое модальное окно -->

          <button class="btn btnPrimary" @click="firstModal = true">
            Show first modal
          </button>
          <modal-vue
            v-show="firstModal"
            title="first modal"
            @close="firstModal = false"
          >
            <div slot="body">
              <p>some text</p>
              <button class="btn btnPrimary" @click="firstModal = false">
                Well Done!
              </button>
            </div>
          </modal-vue>

          <!-- модальное окно с формой -->

          <button class="btn btnPrimary" @click="secondModal.show = true">
            Show second modal with form
          </button>
          <modal-vue
            v-show="secondModal.show"
            title="second modal"
            @close="secondModal.show = false"
          >
            <div slot="body">
              <form @submit.prevent="submitSecondForm">
                <div>
                  <label>Name:</label>
                  <input type="text" v-model="secondModal.name" />
                </div>
                <div>
                  <label>Email:</label>
                  <input type="email" v-model="secondModal.email" />
                </div>
                <button class="btn btnPrimary">Submit</button>
              </form>
            </div>
          </modal-vue>

          <!-- модальное окно с валидацией  -->

          <button class="btn btnPrimary" @click="modalValidate = true">
            Show third modal with validate
          </button>
          <modal-validate
            v-show="modalValidate"
            @close="modalValidate = false"
          ></modal-validate>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import ModalVue from "@/components/UI/ModalVue.vue";
import ModalValidate from "@/components/ModalValidate.vue";

export default {
  components: {
    ModalVue,
    ModalValidate,
  },
  data() {
    return {
      firstModal: false,
      secondModal: {
        show: false,
        name: "",
        email: "",
      },
      modalValidate: false,
    };
  },
  methods: {
    closeByEsc() {
      this.firstModal = false;
      this.secondModal.show = false;
      this.modalValidate = false;
    },
    submitSecondForm() {
      console.log({
        name: this.secondModal.name,
        email: this.secondModal.email,
      });
      this.secondModal.name = "";
      this.secondModal.email = "";
      this.secondModal.show = false;
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