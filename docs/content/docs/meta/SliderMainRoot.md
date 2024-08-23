#### Root

The base of the main slider.

<PropsTable :data="[
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

No props needed, need to be placed inside the `SliderMainRoot`.

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
