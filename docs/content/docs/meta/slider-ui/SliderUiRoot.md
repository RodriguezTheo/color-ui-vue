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
'name': 'modelValue',
'description': '<p>The model value of the color slider. </p><br><p>Check <a href=\'docs/utilities/use-format-color.html\'>useFormatColor</a> for type declarations.</p>',
'type': 'RGB | HSL | HEX',
'required': false,
'default': '{ r: 255, g: 0, b: 0 }'
},
{
'name': 'orientation',
'description': '<p> The orientation of the slider component.</p>\n',
'type': 'horizontal | vertical',
'required': false,
},
{
'name': 'dir',
'description': '<p>The reading direction of Color Ui when applicable.<br>If omitted assumes LTR (left-to-right) reading mode.</p>\n',
'type': 'ltr | rtl',
'required': false,
'default': 'ltr'
},
{
'name': 'acceptedMode',
'description': '<p>The accepted color mode.</p>\n',
'type': 'hsl | rgb | hex',
'required': false,
'default': 'rgb'
},
{
'name': 'colorFormat',
'description': '<p>Format modelValue.<br>If alpha is <code>true</code>, the default value is <code>rgba</code> otherwise <code>rgb</code></p>\n',
'type': 'rgb | hsl | hex',
'required': false,
'default': 'rgb'
},
{
'name': 'defaultValue',
'description': '<p>The default value of the color slider. </p><br><p>Check <a href=\'/docs/utilities/use-convert-color.html\'>useConvertColor</a> for type declarations.</p>\n',
'type': 'RGB | HSL | HEX',
'required': false,
'default': '{ r: 255, g: 0, b: 0 }'
},
{
'name': 'swatches',
'description': '<p>Array of lightness values for the swatches.</p><br><p>Note the number of swatches is determined by the length of this array.</p><br><p>Max value number is 100 and min value number is 0.</p>\n',
'type': 'number\[\]',
'required': false,
'default': '\[80, 65, 50, 35, 20\]'
},
{
'name': 'defaultSaturation',
'description': '<p>The default saturation.. </p>',
'type': 'number',
'required': false,
'default': '50'
}
]" />

<EmitsTable :data="[
{
'name': 'update:modelValue',
'description': '<p>Event handler called when the color selected change</p>\n',
'type': '\[value: RGB | HSL | HEX\]'
},
]" />
