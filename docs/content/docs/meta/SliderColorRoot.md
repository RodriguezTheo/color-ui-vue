#### Root

The base of the color slider.

<PropsTable :data="[
{
'name': 'orientation',
'description': '<p> The orientation of the slider.</p>\n',
'type': 'horizontal | vertical',
'required': false,
'default': 'horizontal'
},
{
'name': 'disabled',
'description': '<p>When <code>true</code>, prevents the user from interacting with the slider.</p>\n',
'type': 'boolean',
'required': false,
}
]" />

#### Thumb

Need to be placed inside the `SliderColorRoot`.

#### Keyboard Interactions

<KeyboardTable
:data="[
{
keys: ['ArrowRight'],
description: '<span> Increments/decrements by the <Code>step</Code> value depending on <Code>orientation</Code>. </span>',
},
{
keys: ['ArrowLeft'],
description: '<span> Increments/decrements by the <Code>step</Code> value depending on <Code>orientation</Code>. </span>',
},
{
keys: ['ArrowUp'],
description: '<span> Increases the value by the <Code>step</Code> amount. </span>',
},
{
keys: ['ArrowDown'],
description: '<span> Decreases the value by the <Code>step</Code> amount. </span>',
},
{
keys: ['PageUp'],
description: '<span> Increases the value by a larger <Code>step</Code>. </span>',
},
{
keys: ['PageDown'],
description: '<span> Decreases the value by a larger <Code>step</Code>. </span>',
},
{
keys: ['Shift + ArrowUp'],
description: '<span> Increases the value by a larger <Code>step</Code>. </span>',
},
{
keys: ['Shift + ArrowDown'],
description: '<span> Decreases the value by a larger <Code>step</Code>. </span>',
},
{
keys: ['Home'],
description: 'Sets the value to its minimum.',
},
{
keys: ['End'],
description: 'Sets the value to its maximum.',
},
]"
/>
