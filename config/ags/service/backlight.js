class BrightnessService extends Service {
    // every subclass of GObject.Object has to register itself
    static {
        // takes three arguments
        // the class itself
        // an object defining the signals
        // an object defining its properties
        Service.register(
            this,
            {
                // 'name-of-signal': [type as a string from GObject.TYPE_<type>],
                "backlight-changed": ["float"],
            },
            {
                // 'kebab-cased-name': [type as a string from GObject.TYPE_<type>, 'r' | 'w' | 'rw']
                // 'r' means readable
                // 'w' means writable
                // guess what 'rw' means
                "backlight_value": ["float", "rw"],
            },
        )
    }

    // this Service assumes only one device with backlight
    #interface = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'")

    // # prefix means private in JS
    #backlightValue = 0
    #max = Number(Utils.exec("brightnessctl max"))

    // the getter has to be in snake_case
    get backlight_value() {
        return this.#backlightValue
    }

    // the setter has to be in snake_case too
    set backlight_value(percent) {
        if (percent < 0) percent = 0
        if (percent > 1) percent = 1
        Utils.execAsync(`brightnessctl set ${percent * 100}% -q`)
        // the file monitor will handle the rest
    }

    constructor() {
        super()

        // setup monitor
        const brightness = `/sys/class/backlight/${this.#interface}/brightness`
        Utils.monitorFile(brightness, () => this.#onChange())

        // initialize
        this.#onChange()
    }

    #onChange() {
        this.#backlightValue = Number(Utils.exec("brightnessctl get")) / this.#max

        // signals have to be explicitly emitted
        this.emit("changed") // emits "changed"
        this.notify("backlight_value")

        // or use Service.changed(propName: string) which does the above two
        // this.changed('screen-value');

        // emit screen-changed with the percent as a parameter
        this.emit("backlight-changed", this.#backlightValue)
    }

    // overwriting the connect method, let's you
    // change the default event that widgets connect to
    connect(event = "backlight-changed", callback) {
        return super.connect(event, callback)
    }
}

// the singleton instance
const service = new BrightnessService()

// export to use in other modules
export default service
