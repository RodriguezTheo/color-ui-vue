#### Item

The item of the mode.

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
'description': '<p>When <code>true</code>, prevents the user from interacting with the mode.</p>\n',
'type': 'boolean',
'required': false,
},
{
'name': 'value',
'description': '<p>The mode of the color item.</p>\n',
'type': 'h | s | l | r | g | b | a | hex',
'required': true,
},
]" />

<SlotTable :data="[
{
'name': 'itemId',
'description': '<p>The id of current input/label.</p>\n',
'type': 'string | number',
'required': false,
},
{
'name': 'componentField',
'description': '<p>The modelValue of current input (value and onInput) and the id of field component.</p>\n',
'type': '{ value: string | number; onInput: (event: Event) => void; id: string; }',
'required': false,
},
]" />
