<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Registrations
            <v-spacer />
            <v-btn text @click="showLoginDialog = true">Change hub</v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="search"
              label="Search registrations by id or tags"
              prepend-inner-icon="search"
              solo
            />
            <v-list two-line>
              <template v-for="(registration, index) in searchedRegistrations">
                <v-list-item :key="registration.id">
                  <v-list-item-action>
                    <v-icon
                      :color="
                        registration.type === 'iOS' ? 'grey' : 'light-green'
                      "
                      >{{
                        registration.type === "iOS"
                          ? "mdi-apple"
                          : "mdi-android"
                      }}</v-icon
                    >
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ registration.id }}</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip-group column>
                        <v-chip
                          v-for="tag in registration.tags"
                          :key="`${registration.id}-${tag}`"
                          @click="copyTag(tag)"
                          >{{ tag }}</v-chip
                        >
                      </v-chip-group>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle
                      >Published date:
                      {{ registration.publishedDate }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="index + 1 < registrations.length"
                  :key="`${registration.id}-divider`"
                />
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <login-dialog v-model="showLoginDialog" @ready="init" />
    <v-snackbar v-model="showSnackbar" :timeout="1000" top right>
      {{ message }}
    </v-snackbar>
  </v-container>
</template>
<script src="./model.js"></script>
<style lang="sass" src="./style.sass" scoped></style>
