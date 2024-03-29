<template>
    <div class="blocklyArea">
        <div class="blocklyDiv" ref="blocklyDiv"/>
    </div>
</template>


<script>
import Blockly from 'blockly';
import toolbox from '@/assets/toolbox.json';
import localforage from 'localforage';
import '@/blocks/robot';
import defaultWorkspace from '@/assets/defaultWorkspace.json';

export default {
    name: 'BlocklyWorkspace',
    data: () => ({
        loadedIn: false
    }),
    async mounted() {
        const options = {
            toolbox,
            collapse: true,
            comments: true,
            disable: true,
            maxBlocks: Infinity,
            trashcan: true,
            horizontalLayout: (window.screen.width < window.screen.height),
            toolboxPosition: 'start',
            css: true,
            rtl: false,
            scrollbars: true,
            sounds: true,
            oneBasedIndex: false
        };

        //Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
        //Blockly.JavaScript.addReservedWords('highlightBlock');
        this.workspace = Blockly.inject(this.$refs.blocklyDiv, options);

        const changeEvents = [
            Blockly.Events.BLOCK_CREATE,
            Blockly.Events.BLOCK_DELETE,
            Blockly.Events.BLOCK_CHANGE,
            Blockly.Events.BLOCK_MOVE,
            Blockly.Events.COMMENT_CREATE,
            Blockly.Events.COMMENT_DELETE,
            Blockly.Events.COMMENT_CHANGE,
            Blockly.Events.COMMENT_MOVE,
            Blockly.Events.VAR_CREATE,
            Blockly.Events.VAR_DELETE,
            Blockly.Events.VAR_RENAME
        ];

        this.workspace.addChangeListener((e) => {
            if(this.loadedIn && changeEvents.includes(e.type)) {
                this.$emit('change');
            }
        });

        const saved = await localforage.getItem('workspace');
        if(saved !== null) {
            Blockly.serialization.workspaces.load(JSON.parse(saved), this.workspace);
        } else {
            Blockly.serialization.workspaces.load(defaultWorkspace, this.workspace);
        }

        const initialLoadListener = (e) => {
            if (e.type === Blockly.Events.FINISHED_LOADING) {
                this.loadedIn = true;
                this.workspace.removeChangeListener(initialLoadListener);
            }
        };

        this.workspace.addChangeListener(initialLoadListener);
    },
    methods: {
        async save() {
            const saved = Blockly.serialization.workspaces.save(this.workspace);
            //console.log(JSON.stringify(saved));
            await localforage.setItem('workspace', JSON.stringify(saved));
        },
        getCode(codeID) {
            // From https://github.com/google/blockly/issues/2228#issuecomment-706668517
            return '(async () => {\n' +
                Blockly.JavaScript.workspaceToCode(this.workspace)
                    .replace(/(?<=^|\n)function \w+\(.*\)/g, 'async $&')
                    .replace(/{{code-id}}/g, codeID)
                + '})();';
        },
        highlightBlock(statement) {
            this.workspace.highlightBlock(statement);
        }
    }
}
</script>


<style scoped>
.blocklyArea {
    height: 100%;
    width: 100%;
}

.blocklyDiv {
    height: 100%;
    width: 100%;
    text-align: left;
    position: absolute;
}
</style>
