<template>
  <div>
    <VRow>
      <VCol sm="6" cols="12">
        <VCard title="Nueva vista 🙌">
          <div
            class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row"
          >
            <div class="ma-auto pa-5 border-e">
              <VImg
                width="137"
                height="176"
                src="https://images.unsplash.com/photo-1748598107903-ec6328f460e2?q=80&w=1962&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
            <div>
              <VCardItem>
                <VCardTitle>Apple iPhone 11 Pro</VCardTitle>
              </VCardItem>

              <VCardText>
                Apple iPhone 11 Pro smartphone. Announced Sep 2019. Features
                5.8″ display Apple A13 Bionic
              </VCardText>
            </div>
          </div>
        </VCard>
      </VCol>
      <VCol sm="6" cols="12">
        <VCard class="px-4 py-4">
          <VRow>
            <VCol cols="12">
              <VTextField label="Regular" placeholder="Placeholder Text" />
            </VCol>
            <VCol cols="12">
              <VTextarea label="Default" placeholder="Placeholder Text" />
            </VCol>
            <VCol cols="12">
              <VSelect
                :items="items"
                label="Standard"
                placeholder="Select Item"
                eager
              />
            </VCol>
            <VCol cols="12">
              <VBtn color="primary"> Primary </VBtn>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
<script setup>
const items = ["Foo", "Bar", "Fizz", "Buzz"];
// definePage({
//   meta: {
//     not_authenticated: false,
//   },
// });
</script>
