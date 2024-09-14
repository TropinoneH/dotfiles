const { GLib } = imports.gi;

const LIGHTDARK_FILE_LOCATION = `${GLib.get_user_state_dir()}/ags/user/colormode.txt`;
export const darkMode = Variable(!(Utils.readFile(LIGHTDARK_FILE_LOCATION).split('\n')[0].trim() === 'light'));
