<script>
  import QuasarLayoutBuilt from "@/components/structure/QuasarLayoutBuilt.vue";

  export default {
    name: "LibraryItemsList",
    components: {QuasarLayoutBuilt},
    data() {
      return {
        editableKioskNameLocal: "Loading...",
      };
    },
    props: {
      editableKioskName: {
        type: String,
        required: false,
      },
      currentPageTitle: {
        type: String,
        required: true,
      },
    },
    created() {
      this.editableKioskNameLocal = this.editableKioskName;
    },
    emits: ['update-kiosk-name'],
    watch: {
      editableKioskNameLocal: {
        handler() {
          this.$emit('update-kiosk-name', this.editableKioskNameLocal);
        },
      },
    },
  }
</script>

<template>
  <quasar-layout-built
      main-content-classes="bg-secondary"
      :page-title="currentPageTitle"
  >

    <template #left>
      <div>
        <div>
          <p class="fs-4 d-flex justify-content-between">{{this.editableKioskName}}<i class="ms-2 bi bi-pencil-square"></i></p>
          <q-popup-edit v-model="editableKioskNameLocal" auto-save v-slot="scope">
            <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" autocomplete
                     :rules="[val => val.length > 1 || 'Title requires at least 1 character', [val => val.length < 20 || 'Title cannot at least 1 character']]"/>
          </q-popup-edit>
        </div>
        <hr>
        <slot name="left">
        </slot>
      </div>
      <div>
      </div>
    </template>

    <template #content>
      <!--                       TODO: Make take list-->
      <slot name="content">
      </slot>
    </template>

    <template #footer>
      <slot name="footer">
      </slot>
    </template>

  </quasar-layout-built>
</template>

<style scoped>
</style>
