import St from 'gi://St';
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class DeadlineOverlay {
    constructor() {
        this._container = null;
        this._valuesLabel = null;
        this._unitsLabel = null;
        this._timeoutId = null;
        this._settings = new Gio.Settings({
            schema_id: 'org.gnome.shell.extensions.deadline',
        });
    }

    _format() {
        const deadlineStr = this._settings.get_string('deadline');
        const deadline = new Date(deadlineStr);
        const now = new Date();

        let diff = Math.floor((deadline - now) / 1000);

        if (isNaN(diff) || diff <= 0) {
            return {
                values: "00  00  00  00",
                units: "days   hours   mins   secs"
            };
        }

        const days = Math.floor(diff / 86400);
        diff %= 86400;
        const hours = Math.floor(diff / 3600);
        diff %= 3600;
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;

        return {
            values: `${days.toString().padStart(2,'0')}  ${hours.toString().padStart(2,'0')}  ${minutes.toString().padStart(2,'0')}  ${seconds.toString().padStart(2,'0')}`,
            units: "days   hours   mins   secs"
        };
    }

    enable() {
        this._container = new St.BoxLayout({
            vertical: true,
            reactive: false,
            style: `
                background-color: rgba(0,0,0,0.65);
                padding: 12px 16px;
                border-radius: 12px;
            `
        });


	this._titleLabel = new St.Label({
    		text: this._settings.get_string('title') || '',
    		reactive: false,
    		style: `
        font-family: "JetBrains Mono", monospace;
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
        margin-bottom: 6px;
    `
});


        this._valuesLabel = new St.Label({
            text: "",
            reactive: false,
            style: `
                font-family: "JetBrains Mono", monospace;
                font-size: 26px;
                font-weight: 700;
                color: #00ffcc;
            `
        });

	

        this._unitsLabel = new St.Label({
            text: "",
            reactive: false,
            style: `
                font-family: "JetBrains Mono", monospace;
                font-size: 13px;
                color: #9aa0a6;
            `
        });
	this._container.add_child(this._titleLabel);
        this._container.add_child(this._valuesLabel);
        this._container.add_child(this._unitsLabel);

        Main.layoutManager.addChrome(this._container);

        const monitor = Main.layoutManager.primaryMonitor;
        this._container.set_position(
            monitor.x + 50,
            monitor.y + 50
        );

        this._timeoutId = GLib.timeout_add_seconds(
            GLib.PRIORITY_DEFAULT,
            1,
            () => {
                const { values, units } = this._format();
                this._valuesLabel.text = values;
                this._unitsLabel.text = units;
		this._titleLabel.text = this._settings.get_string('title') || '';

		const now = new Date();
		const deadline = new Date(this._settings.get_string('deadline'));
		const diff = (deadline - now) / 1000;


		if(diff <= 0) {
             this._container.set_style(`
                background-color: rgba(0,0,0,0.65);
                padding: 12px 16px;
                border-radius: 12px;
                border: 3px solid #ff0000;
            `);
            this._valuesLabel.text = '00  00  00  00';
            this._unitsLabel.text = '';
            this._titleLabel.text = 'Deadline reached!';
				}
				else if (diff < 60) {


					// few issues with this blinking of a damn thing.
            const blink = Math.floor(Date.now() / 500) % 2 === 0;
            this._container.set_style(`
                background-color: rgba(0,0,0,0.65);
                padding: 12px 16px;
                border-radius: 12px;
                border: 3px solid ${blink ? '#ff0000' : '#ffffff'};
            `);
        } else {
            this._container.set_style(`
                background-color: rgba(0,0,0,0.65);
                padding: 12px 16px;
                border-radius: 12px;
                border: none;
            `);
        }
                return GLib.SOURCE_CONTINUE;
            }
        );
    }

    disable() {
        if (this._timeoutId) {
            GLib.source_remove(this._timeoutId);
            this._timeoutId = null;
        }
        if (this._container) {
            this._container.destroy();
            this._container = null;
            this._valuesLabel = null;
            this._unitsLabel = null;
        }
    }
}

