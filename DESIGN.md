# Crossio editor design

The editor extends the existing Crossio theme: dark neutral surfaces with green primary color, light neutral surfaces with purple primary color, and the existing typography. All interface colors use the existing HSL theme variables; canvas backgrounds are deliberate preview conditions independent of the interface theme.

Mode: Operate. At desktop widths, use a compact application header, file toolbar, layers/tools at left, a persistent canvas in the middle, and properties at right. Below 900 px, keep the canvas visible and put elements, layers and properties behind three explicit panel buttons. No marketing footer in the editor.

Use flat panels, subtle single borders, 12–14 px control text, 44 px mobile targets, visible focus outlines and shared Material 3 sliders. Color alone must not indicate selection. Changes update the canvas directly, with no ornamental entrance animation. Show save failure and destructive-action confirmation in the application. Backgrounds and editing guides never appear in exported art.
