<template>
  <div class="text-center">
    <p><strong id="label">Log in</strong></p>
    <p class="login-form">
      <b-form @submit.prevent="loginSubmit">
        <b-form-group
          label="Username"
          label-for="login-username"
          class="text-left"
          ><b-form-input
            id="login-username"
            v-model="username"
            required
            placeholder="Inserisci username..."
          ></b-form-input
        ></b-form-group>

        <b-form-group
          label="Password"
          label-for="login-password"
          class="text-left"
          ><b-form-input
            id="login-password"
            type="password"
            v-model="password"
            required
            placeholder="Inserisci password..."
          ></b-form-input
        ></b-form-group>

        <b-button class="form-btn" type="submit">
          Login
        </b-button>
      </b-form>
    </p>

    <b-overlay :show="this.$store.getters.isLoading" no-wrap> </b-overlay>
  </div>
</template>

<script>
export default {
  name: "LoginDialog",
  /**
   * Una funzione che RESTITUISCE UNA PROMESSA che rappresenta la
   * richiesta da fare per fare login E l'azione da intraprendere in caso di successo.
   * Gli errori invece vengono gestiti qui.
   */
  props: ["loginAction"],
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    loginSubmit() {
      //recupero username e password dal form
      const { username, password } = this;
      //avvio autenticazione (gestita da vuex)
      this.loginAction(username, password)
        //se qualcosa va male i campi sono resettati
        .catch(() => {
          this.username = "";
          this.password = "";
          alert(this.$store.state.status);
        });
    }
  }
};
</script>

<style scoped>
.log-err {
  color: var(--nord11);
}
</style>
