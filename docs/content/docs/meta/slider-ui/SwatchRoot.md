#### Root

The base of the swatch.

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
'name': 'orientation',
'description': '<p> The orientation of the swatch list.</p>\n',
'type': 'horizontal | vertical',
'required': false,
'default': 'horizontal'
},
{
'name': 'disabled',
'description': '<p>When <code>true</code>, prevents the user from interacting with the swatch list.</p>\n',
'type': 'boolean',
'required': false,
}
]" />

#### Item

Items inside swatch.
Need to be placed inside the `SwatchRoot`.

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
