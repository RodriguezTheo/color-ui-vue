<PropsTable :data="[
{
'name': 'modelValue',
'description': '<p>The model value of the color picker. </p><br><p>Check <a href=\'/docs/utilities/use-convert-color.html\'>useConvertColor</a> for type declarations.</p>\n',
'type': 'RGB | RGBA | HSL | HSLA | HEX | HEXA',
'required': false,
'default': '{ r: 255, g: 0, b: 0 }'
},
{
'name': 'histories',
'description': '<p>The model value histories of the color picker.</p>',
'type': '{color: number; alpha: number}[]',
'required': false,
'default': '{ r: 255, g: 0, b: 0 }'
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
'name': 'allowedAlpha',
'description': '<p>When <code>true</code>, allows the user to set the alpha channel.</p>\n',
'type': 'boolean',
'required': false,
'default': 'false'
},
{
'name': 'defaultValue',
'description': '<p>The default value of the color picker. </p><br><p>Check <a href=\'/docs/utilities/use-convert-color.html\'>useConvertColor</a> for type declarations.</p>\n',
'type': 'RGB | RGBA | HSL | HSLA | HEX | HEXA',
'required': false,
'default': '{ r: 255, g: 0, b: 0 }'
}
]" />
