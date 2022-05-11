<template>
    <v-app>
        <v-app-bar
            app
            color="primary"
            dark
        >
            <div class="d-flex align-center">
                <h2>AutoSumo</h2>
            </div>

            <v-spacer></v-spacer>

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon text v-bind="attrs" v-on="on">
                        <v-icon @click="save" :loading="saveLoading" :color="saveColor">
                            {{saveIcon}}
                        </v-icon>
                    </v-btn>
                </template>
                <span>{{saveHover}}</span>
            </v-tooltip>

        </v-app-bar>

        <v-main>
            <BlocklyWorkspace ref="workspace" @change="onWorkspaceChange"/>

            <v-snackbar v-model="saveSnackbar" color="success" bottom timeout="2500">
                <v-icon left>mdi-check-circle</v-icon>
                Saved!
                <template v-slot:action="{ attrs }">
                    <v-btn text v-bind="attrs" @click="saveSnackbar = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </v-main>
    </v-app>
</template>

<script>
import BlocklyWorkspace from "@/components/BlocklyWorkspace";

export default {
    name: 'App',

    components: {
        BlocklyWorkspace
    },

    data: () => ({
        saveLoading: false,
        changesExist: false,
        hasSaved: false,
        saveSnackbar: false
    }),
    computed: {
        saveIcon() {
            return 'mdi-' + (this.changesExist ? 'content-save-edit' : (this.hasSaved ? 'content-save-check' : 'content-save'));
        },
        saveColor() {
            return (this.changesExist || !this.hasSaved) ? '' : 'light-green accent-3';
        },
        saveHover() {
            return this.changesExist ? 'Unsaved changes' : (this.hasSaved ? 'All changes saved' : 'Save your changes');
        }
    },
    methods: {
        async save() {
            this.saveLoading = true;

            await this.$refs.workspace.save();

            this.changesExist = false;
            this.hasSaved = true;
            this.saveLoading = false;
            this.saveSnackbar = true;
        },
        onWorkspaceChange() {
            this.changesExist = true;
        }
    }
};
</script>
