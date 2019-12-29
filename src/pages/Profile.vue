<template>
  <main class="Profile Wrapper">
    <div class="Title Profile-Title">
      Мой профиль
    </div>
    <div class="Avatar Profile-Photo">
      <div class="Avatar-Text">
        Фотография
      </div>
      <div class="Avatar-PhotoSection">
        <div class="Avatar-Photo">
          <img
            ref="avatar"
            class="Avatar-Img"
            :src="require(`@/assets/img/${user.photo}`)"
            alt=""
          />
        </div>
        <div class="Avatar-Edit">
          <div class="Avatar-Action">
            <label>
              <input
                type="file"
                name="file"
                class="Avatar-Input"
                @change="onFileLoad"
              />
              <div class="Avatar-Change">
                Изменить
              </div>
            </label>
          </div>
          <div class="Avatar-Action" @click="onDelete">
            Удалить
          </div>
        </div>
      </div>
      <div v-if="authErrors.photo" class="Input-Error Avatar-Error">
        {{ authErrors.photo }}
      </div>
    </div>
    <form class="Profile-Form Form">
      <div class="Form-Row">
        <div class="Form-Label">
          Email
        </div>
        <div class="Form-Value">
          <input
            v-model="email"
            class="Input"
            :class="{
              'Input--state_invalid':
                ($v.email.$dirty && $v.email.$invalid) || authErrors.email
            }"
            type="email"
            :placeholder="user.email"
            @input="onInput('email')"
          />
          <div v-if="$v.email.$dirty && errorMessageEmail" class="Input-Error">
            {{ errorMessageEmail }}
          </div>
          <div v-if="authErrors.email" class="Input-Error">
            {{ authErrors.email }}
          </div>
        </div>
      </div>
      <div class="Form-Row">
        <div class="Form-Label">
          Имя
        </div>
        <div class="Form-Value">
          <input
            v-model="name"
            class="Input"
            :class="{
              'Input--state_invalid':
                ($v.name.$dirty && $v.name.$invalid) || authErrors.name
            }"
            type="text"
            :placeholder="user.name"
            @input="onInput('name')"
          />
          <div v-if="$v.name.$dirty && errorMessageName" class="Input-Error">
            {{ errorMessageName }}
          </div>
          <div v-if="authErrors.name" class="Input-Error">
            {{ authErrors.name }}
          </div>
        </div>
      </div>
      <div class="Form-Passwords">
        <div class="Form-Row">
          <div class="Form-Label">
            Пароль
          </div>
          <div class="Form-Value">
            <input
              v-model="password"
              class="Input"
              :class="{
                'Input--state_invalid':
                  $v.password.$dirty && $v.password.$invalid
              }"
              type="password"
              placeholder="Введите, если хотите изменить пароль"
              @input="onInput('password')"
            />
            <div
              v-if="$v.password.$dirty && errorMessagePassword"
              class="Input-Error"
            >
              {{ errorMessagePassword }}
            </div>
          </div>
        </div>
        <div class="Form-Row">
          <div class="Form-Label">
            Повторите пароль
          </div>
          <div class="Form-Value">
            <input
              v-model="repeatPassword"
              class="Input"
              :class="{
                'Input--state_invalid':
                  $v.password.$dirty && $v.repeatPassword.$invalid
              }"
              type="password"
              @input="onInput('repeatPassword')"
            />
            <div v-if="errorMessageRepeat" class="Input-Error">
              {{ errorMessageRepeat }}
            </div>
          </div>
        </div>
      </div>
      <div class="Form-Submit">
        <BaseButton :onClickButton="onSubmit" :disabled="$v.$invalid">
          Сохранить
        </BaseButton>
      </div>
    </form>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { email, minLength, maxLength, sameAs } from "vuelidate/lib/validators";
const BaseButton = () =>
  import(/* webpackChunkName: "baseButton" */ "@/components/BaseButton.vue");

export default {
  name: "Profile",

  components: {
    BaseButton
  },

  data() {
    return {
      avatar: null,
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      serverErrors: []
    };
  },

  validations: {
    email: {
      email
    },
    name: {
      maxLength: maxLength(250)
    },
    password: {
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },

  computed: {
    ...mapGetters(["user", "authErrors", "blogInfo"]),

    errorMessageEmail() {
      if (!this.$v.email.email) {
        return "Введите корректный email";
      }

      return "";
    },

    errorMessageName() {
      if (!this.$v.name.maxLength) {
        return `Имя слишком длинное`;
      }

      return "";
    },

    errorMessagePassword() {
      if (!this.$v.password.minLength) {
        return `Пароль слишком короткий`;
      }

      return "";
    },

    errorMessageRepeat() {
      if (this.$v.password.$model && !this.$v.repeatPassword.$model) {
        return "Заполните это поле";
      } else if (!this.$v.repeatPassword.sameAsPassword) {
        return "Пароли не совпадают!";
      }

      return "";
    }
  },

  methods: {
    onFileLoad(event) {
      this.$refs.avatar.src = URL.createObjectURL(event.target.files[0]);
      this.avatar = event.target.files[0];
    },

    onDelete() {
      this.$refs.avatar.src = require("@/assets/img/default-3.png");
      this.avatar = "";
    },

    onInput(value) {
      this.$v[value].$touch();
    },

    onSubmit() {
      let data;

      if (this.avatar) {
        data = new FormData();
        data.append("photo", this.avatar || this.user.photo);
        data.append("removePhoto", 0);
        data.append("name", this.name || this.user.name);
        data.append("email", this.email || this.user.email);
        data.append("password", this.password);
      } else {
        data = {
          photo: this.user.photo,
          removePhoto: 0,
          name: this.name || this.user.name,
          email: this.email || this.user.email,
          password: this.password
        };
      }

      if (this.avatar === "") {
        data.photo = "";
        data.removePhoto = 1;
      }

      this.$store.dispatch("saveUser", data).catch(e => this.errors.push(e));
    }
  },

  metaInfo() {
    return {
      title: this.blogInfo
        ? `Профиль пользователя | ${this.blogInfo.title} - ${this.blogInfo.subtitle}`
        : "Профиль пользователя"
    };
  }
};
</script>

<style lang="scss">
.Profile {
  padding-top: 15px;

  &-Title {
    margin-bottom: 30px;
  }

  &-Form {
    width: 50%;

    @media (max-width: $screen-tablet) {
      width: 100%;
    }
  }

  &-Photo {
    margin-bottom: 15px;
  }
}

.Avatar {
  display: flex;

  @media (max-width: $screen-tablet) {
    display: block;
  }

  &-Error {
    margin-top: 10px;
    margin-left: 25px;
  }

  &-Input {
    display: none;
  }

  &-Change {
    cursor: pointer;
  }

  &-Text {
    margin-right: 33px;
    font-size: 1.2rem;

    @media (max-width: $screen-tablet) {
      margin-bottom: 10px;
    }
  }

  &-PhotoSection {
    display: flex;
  }

  &-Photo {
    width: 90px;
    height: 90px;
    margin-right: 10px;
    border-radius: 10px;
    overflow: hidden;
  }

  &-Img {
    display: block;
    width: 90px;
  }

  &-Action {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: var(--color-primary);
    cursor: pointer;
  }
}
</style>
