const { Gtk } = imports.gi

/**
 * @param {String} iconName
 * @returns %TRUE if
 */
export function iconExists(iconName) {
    let iconTheme = Gtk.IconTheme.get_default()
    return iconTheme.has_icon(iconName)
}

/**
 * @param {String} str
 * @returns String
 */
export function substitute(str) {
    // Normal substitutions
    if (userConfigs.icons.substitutions[str]) return userConfigs.icons.substitutions[str]

    // Regex substitutions
    for (let i = 0; i < userConfigs.icons.regexSubstitutions.length; i++) {
        const substitution = userConfigs.icons.regexSubstitutions[i]
        const replacedName = str.replace(substitution.regex, substitution.replace)
        if (replacedName != str) return replacedName
    }

    // Guess: convert to kebab case
    if (!iconExists(str)) str = str.toLowerCase().replace(/\s+/g, "-")

    // Original string
    return str
}

/**
 * @param {String} icon
 * @param {String | number} size
 */
export const MaterialIcon = (icon, size, props = {}) =>
    Widget.Label({
        className: `icon-material txt-${size}`,
        label: icon,
        ...props,
    })
