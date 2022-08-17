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

Blockly.Blocks['move_servo'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("move servo");
        this.appendValueInput("angle")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("angle");
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

Blockly.Blocks['log'] = {
    init: function() {
        this.appendValueInput("text")
            .setCheck("String")
            .appendField("log");
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
    return `moveMotors(${value_left}, ${value_right});\n`;
};

Blockly.JavaScript['move_servo'] = block => {
    const value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return `moveServo(${value_angle});\n`;
};

Blockly.JavaScript['log'] = block => {
    const value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC) || '';
    return `log(${value_text});\n`;
};

Blockly.JavaScript['lidar_value'] = (block) => {
    return [`getLidar()`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['ir'] = (block) => {
    const dropdown_side = block.getFieldValue('side');
    return [`getIR('${dropdown_side}')`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['wait'] = (block) => {
    const value_seconds = Blockly.JavaScript.valueToCode(block, 'seconds', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return `await waitSeconds(${value_seconds});\n`;
};

// From https://github.com/google/blockly/issues/2228#issuecomment-706668517
Blockly.JavaScript['procedures_callreturn'] = function(block) {
    // Call a procedure with a return value.
    const funcName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME)
    const args = []
    const variables = block.getVars()
    for (let i = 0; i < variables.length; i++) {
        args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i, Blockly.JavaScript.ORDER_NONE) || 'null';
    }
    const code = `await ${funcName}(${args.join(', ')})`
    return [code, Blockly.JavaScript.ORDER_AWAIT];
};
