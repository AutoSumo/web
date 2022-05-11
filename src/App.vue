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

            <v-btn icon>
                <v-icon @click="save">mdi-content-save</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <BlocklyWorkspace ref="workspace"/>
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
        //
    }),
    methods: {
        async save() {
            await this.$refs.workspace.save();
        }
    }
};
</script>
