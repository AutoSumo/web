import Blockly from 'blockly';

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


Blockly.JavaScript['move_motors'] = block => {
    const value_left = Blockly.JavaScript.valueToCode(block, 'left', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    const value_right = Blockly.JavaScript.valueToCode(block, 'right', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return `await moveMotors(${value_left}, ${value_right});\n`;
};

Blockly.JavaScript['lidar_value'] = (block) => {
    return [`getLatestLidar()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['ir'] = (block) => {
    const dropdown_side = block.getFieldValue('side');
    return [`getIR('${dropdown_side}')`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['move_motor'] = (block) => {
    const dropdown_side = block.getFieldValue('side') || 'left';
    const value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return `await moveMotor('${dropdown_side}', ${value_speed});\n`;
};

Blockly.JavaScript['wait'] = (block) => {
    const value_seconds = Blockly.JavaScript.valueToCode(block, 'seconds', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return `await waitSeconds(${value_seconds});\n`;
};
