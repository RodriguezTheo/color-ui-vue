#### Root

The base of the main slider.

<PropsTable :data="[
{
'name': 'as',
'description': '<p>The element or component this component should render as. Can be overwrite by <code>asChild</code></p>\n',
'type': 'AsTag | Component',
'required': false,
'default': '\'div\''
},
{
'name': 'asChild',
'description': '<p>Change the default rendered element for the one passed as a child, merging their props and behavior.</p>\n<p>Read the <a href=\'https://www.radix-vue.com/guides/composition.html\'>Radix-vue composition</a> guide for more details.</p>\n',
'type': 'boolean',
'required': false
},
{
'name': 'disabled',
'description': '<p>When <code>true</code>, prevents the user from interacting with the slider.</p>\n',
'type': 'boolean',
'required': false,
},
{
'name': 'orientation',
'description': '<p> The orientation of the slider.</p>\n',
'type': 'horizontal | vertical',
'required': false,
'default': 'horizontal'
}
]" />

#### Thumb

The thumb of the slider.
Need to be placed inside the `SliderMainRoot`.

<PropsTable :data="[
{
'name': 'as',
'description': '<p>The element or component this component should render as. Can be overwrite by <code>asChild</code></p>\n',
'type': 'AsTag | Component',
'required': false,
'default': '\'span\''
},
{
'name': 'asChild',
'description': '<p>Change the default rendered element for the one passed as a child, merging their props and behavior.</p>\n<p>Read the <a href=\'https://www.radix-vue.com/guides/composition.html\'>Radix-vue composition</a> guide for more details.</p>\n',
'type': 'boolean',
'required': false
},
]" />

#### Keyboard Interactions

<KeyboardTable :data="[
{
keys: ['ArrowRight'],
description: '<span> Increments <code>valueX</code>.</span>',
},
{
keys: ['ArrowLeft'],
description: '<span> Decrements <code>valueX</code>.</span>',
},
{
keys: ['ArrowUp'],
description: '<span> Increments <code>valueY</code>.</span>',
},
{
keys: ['ArrowDown'],
description: '<span> Decrements <code>valueY</code>.</span>',
},
{
keys: ['PageUp'],
description: '<span> Increases the <code>valueY</code>.</span>',
},
{
keys: ['PageDown'],
description: '<span> Decreases the <code>valueY</code>.</span>',
},
{
keys: ['Home'],
description: 'Sets the <code>valueX</code> to its minimum.',
},
{
keys: ['End'],
description: 'Sets the <code>valueX</code> to its maximum.',
},
{
keys: ['Shift + ArrowRight'],
description: '<span> Increases <code>valueX</code>. </span>',
},
{
keys: ['Shift + ArrowLeft'],
description: '<span> Decreases <code>valueX</code>.</span>',
},
{
keys: ['Shift + ArrowUp'],
description: '<span> Increases <code>valueY</code>. </span>',
},
{
keys: ['Shift + ArrowDown'],
description: '<span> Decreases <code>valueY</code>.</span>',
},
{
keys: ['Shift + PageUp'],
description: '<span> Increases the <code>valueX</code>.</span>',
},
{
keys: ['Shift + PageDown'],
description: '<span> Decreases the <code>valueX</code>.</span>',
},
{
keys: ['Shift + Home'],
description: 'Sets the <code>valueY</code> to its minimum.',
},
{
keys: ['Shift + End'],
description: 'Sets the <code>valueY</code> to its maximum.',
},
]"
/>
