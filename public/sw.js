importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

if (workbox) {
    console.log(workbox);
}
else {
    console.log("not loaded")
}

workbox.routing.registerRoute(
    new RegExp("./*"),

    new workbox.strategies.NetworkFirst()
)