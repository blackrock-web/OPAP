import "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn } from "./models-CLPPkR1n.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as create } from "../_libs/zustand.mjs";
require_react();
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/ui/button.tsx";
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
			outline: "border border-border bg-transparent hover:bg-muted",
			ghost: "hover:bg-muted",
			destructive: "bg-destructive text-white hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 37,
		columnNumber: 10
	}, this);
}
var _jsxFileName = "/app/applet/src/components/ui/label.tsx";
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: cn("text-xs font-medium tracking-wide text-muted-foreground", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 6,
		columnNumber: 5
	}, this);
}
var useSession = create((set) => ({
	bench: [],
	benchSecret: "ARES research secret",
	benchPassword: "lab-passphrase",
	setEncode: (p) => set({
		lastCover: p.cover,
		lastStego: p.stego,
		lastCoverUrl: p.coverUrl,
		lastStegoUrl: p.stegoUrl,
		lastSecret: p.secret,
		lastPassword: p.password,
		lastMetrics: p.metrics,
		lastModel: p.model
	}),
	setBench: (rows) => set({ bench: rows }),
	setBenchCreds: (secret, password) => set({
		benchSecret: secret,
		benchPassword: password
	})
}));
//#endregion
export { Label as n, useSession as r, Button as t };
