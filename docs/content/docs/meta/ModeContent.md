#### Content

The content of the mode.

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
'name': 'value',
'description': '<p>The mode of the color picker.</p>\n',
'type': 'hsl | rgb | hex',
'required': true,
},
]" />

<SlotTable :data="[
{
'name': 'value',
'description': '<p>The value of mode content.</p>\n',
'type': 'hsl | rgb | hex',
'required': false,
}
]" />
