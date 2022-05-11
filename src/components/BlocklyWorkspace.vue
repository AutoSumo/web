<template>
    <div class="blocklyArea">
        <div class="blocklyDiv" ref="blocklyDiv"/>
    </div>
</template>


<script>
import Blockly from 'blockly';
import toolbox from '@/assets/toolbox.json';
import localforage from "localforage";

Blockly.Blocks['move_motors'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("move motors");
        this.appendValueInput("left")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("left");
        this.appendValueInput("right")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("right");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['lidar_value'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("LiDAR value");
        this.setOutput(true, "Number");
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['ir'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("IR sensor")
            .appendField(new Blockly.FieldDropdown([["left","left"], ["right","right"]]), "side");
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['move_motor'] = {
    init: function() {
        this.appendValueInput("speed")
            .setCheck("Number")
            .appendField("move motor")
            .appendField(new Blockly.FieldDropdown([["left","left"], ["right","right"]]), "side");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['wait'] = {
    init: function() {
        this.appendValueInput("seconds")
            .setCheck("Number")
            .appendField("wait");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export default {
    name: 'BlocklyWorkspace',
    async mounted() {
        const options = {
            toolbox,
            collapse: true,
            comments: true,
            disable: true,
            maxBlocks: Infinity,
            trashcan: true,
            horizontalLayout: false,
            toolboxPosition: 'start',
            css: true,
            rtl: false,
            scrollbars: true,
            sounds: true,
            oneBasedIndex: false
        };

        this.workspace = Blockly.inject(this.$refs.blocklyDiv, options);
        this.workspace.addChangeListener(() => {
            this.$emit('change');
        });

        const saved = await localforage.getItem('workspace');
        if(saved !== null) {
            console.log('Got saved data!');
            Blockly.serialization.workspaces.load(JSON.parse(saved), this.workspace);
        }
    },
    methods: {
        async save() {
            const saved = Blockly.serialization.workspaces.save(this.workspace);
            await localforage.setItem('workspace', JSON.stringify(saved));
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
