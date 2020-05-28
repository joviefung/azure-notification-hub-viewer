<template>
  <v-dialog :value="value" max-width="500px" @input="$emit('input', $event)">
    <v-card>
      <v-card-title>Login to your Azure Notification Hub</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="notificationHubName"
          label="Notification hub name"
        />
        <v-text-field v-model="connectionString" label="Connection string" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text :disabled="!valid" @click="ok">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script src="./model.js"></script>
<style lang="sass" src="./style.sass" scoped></style>
