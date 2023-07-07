interface EventDetails {
    type: string;
    callback: EventListenerOrEventListenerObject | null;
    options?: AddEventListenerOptions | boolean;
}

type RegisterCallback = (target: EventTarget, details: EventDetails) => void;

const EventTargetAddEventListener = EventTarget.prototype.addEventListener;
const EventTargetRemoveEventListener = EventTarget.prototype.removeEventListener;

export default class EventListenerMonitor {
    private static readonly Instance: EventListenerMonitor = new EventListenerMonitor();
    private readonly onAddListeners: Set<RegisterCallback> = new Set<RegisterCallback>();
    private readonly onRemoveListeners: Set<RegisterCallback> = new Set<RegisterCallback>();

    private constructor() {
        const self = this;
        EventTarget.prototype.addEventListener = function (...details): void {
            for (const callback of self.onAddListeners) {
                callback(this, {
                    type: details[0],
                    callback: details[1],
                    options: details[2],
                });
            }
            EventTargetAddEventListener.apply(this, details);
        };
        EventTarget.prototype.removeEventListener = function (...details): void {
            for (const callback of self.onRemoveListeners) {
                callback(this, {
                    type: details[0],
                    callback: details[1],
                    options: details[2],
                });
            }
            EventTargetRemoveEventListener.apply(this, details);
        };
    }

    public static GetInstance(): EventListenerMonitor {
        return EventListenerMonitor.Instance;
    }

    public onAdd(callback: RegisterCallback): void {
        this.onAddListeners.add(callback);
    }

    public onRemove(callback: RegisterCallback): void {
        this.onRemoveListeners.add(callback);
    }

    public deleteAddListener(callback: RegisterCallback): void {
        this.onAddListeners.delete(callback);
    }

    public deleteRemoveListener(callback: RegisterCallback): void {
        this.onRemoveListeners.delete(callback);
    }
}
