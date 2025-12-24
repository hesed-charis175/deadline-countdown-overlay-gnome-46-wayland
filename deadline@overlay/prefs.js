import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gio from 'gi://Gio';

export default class DeadlinePrefs {
    fillPreferencesWindow(window) {
        const settings = new Gio.Settings({
            schema_id: 'org.gnome.shell.extensions.deadline',
        });

        const page = new Adw.PreferencesPage();
        page.set_title('Deadline Overlay');

        const group = new Adw.PreferencesGroup();
        page.add(group);

        const deadlineRow = new Adw.ActionRow({ title: 'Target date & time' });
        const deadlineEntry = new Gtk.Entry({ text: settings.get_string('deadline') });
        deadlineEntry.connect('changed', () => {
            settings.set_string('deadline', deadlineEntry.text);
        });
        deadlineRow.add_suffix(deadlineEntry);
        group.add(deadlineRow);

        const titleRow = new Adw.ActionRow({ title: 'Overlay title' });
        const titleEntry = new Gtk.Entry({ text: settings.get_string('title') || '' });
        titleEntry.connect('changed', () => {
            settings.set_string('title', titleEntry.text);
        });
        titleRow.add_suffix(titleEntry);
        group.add(titleRow);

        window.add(page);
    }
}

