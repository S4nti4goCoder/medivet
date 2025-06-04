<script setup>
import { useGenerateImageVariant } from "@/@core/composable/useGenerateImageVariant";
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue";
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginIllustrationLight from "@images/pages/auth-v2-login-illustration-light.png";
import authV2LoginMaskDark from "@images/pages/auth-v2-login-mask-dark.png";
import authV2LoginMaskLight from "@images/pages/auth-v2-login-mask-light.png";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";

const form = ref({
  email: "santiago@gmail.com",
  password: "12345678",
  remember: false,
});

const route = useRoute();
const router = useRouter();

const error_exists = ref(null);
const success_exists = ref(null);

definePage({
  meta: {
    layout: "blank",
    unauthenticatedOnly: true,
  },
});

const login = async () => {
  try {
    error_exists.value = null;
    success_exists.value = null;
    const resp = await $api("/auth/login", {
      method: "POST",
      body: {
        email: form.value.email,
        password: form.value.password,
      },
      onResponseError({ response }) {
        console.log(response._data.error);
        error_exists.value = response._data.error;
      },
    });
    console.log(resp);

    localStorage.setItem("token", resp.access_token);
    localStorage.setItem("user", JSON.stringify(resp.user));
    success_exists.value = true;
    setTimeout(async () => {
      await nextTick(() => {
        router.replace(route.query.to ? String(route.query.to) : "/");
      });
    }, 1500);
  } catch (error) {
    console.log(error);
  }
};

const isPasswordVisible = ref(false);
const authV2LoginMask = useGenerateImageVariant(
  authV2LoginMaskLight,
  authV2LoginMaskDark
);
const authV2LoginIllustration = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true
);
</script>

<template>
  <VRow no-gutters class="auth-wrapper">
    <VCol
      md="8"
      class="justify-center d-none d-md-flex align-center position-relative"
    >
      <div class="justify-center d-flex align-center pa-10">
        <img
          :src="authV2LoginIllustration"
          class="auth-illustration w-100"
          alt="auth-illustration"
        />
      </div>
      <VImg
        :src="authV2LoginMask"
        class="d-none d-md-flex auth-footer-mask"
        alt="auth-mask"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
      class="justify-center auth-card-v2 d-flex align-center"
      style="background-color: rgb(var(--v-theme-surface))"
    >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-5 pa-lg-7">
        <VCardText>
          <h4 class="mb-1 text-h4">
            Welcome to
            <span class="text-capitalize">{{ themeConfig.app.title }}! 👋🏻</span>
          </h4>

          <p class="mb-0">Inicie sesión con su cuenta</p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="login()">
            <VRow>
              <VCol cols="12">
                <VAlert type="success" class="my-5" v-if="success_exists">
                  Credenciales correctas
                </VAlert>

                <VAlert type="error" class="my-5" v-if="error_exists">
                  Error al ingresar credenciales:
                  <strong>{{ error_exists }}</strong>
                </VAlert>

                <!-- email -->
                <VTextField
                  v-model="form.email"
                  autofocus
                  label="Email"
                  type="email"
                  placeholder="johndoe@email.com"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <!-- login button -->
                <VBtn block type="submit" class="my-5"> Login </VBtn>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-center text-body-1">
                <span class="d-inline-block"> New on our platform? </span>
                <a
                  class="text-primary ms-1 d-inline-block text-body-1"
                  href="#"
                >
                  Create an account
                </a>
              </VCol>

              <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4 text-high-emphasis">or</span>
                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol cols="12" class="text-center">
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
