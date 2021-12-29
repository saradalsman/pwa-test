function log(...args) {
  console.log(new Date().toISOString(), "main", ...args);
}

async function main() {
  log("main");

  const output = document.querySelector("#output");
  let registration;

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("controllerchange", (event) => {
      log("controllerchange", event);

      navigator.serviceWorker.controller.addEventListener(
        "statechange",
        (event) => {
          log("controller.statechange", event);
        }
      );
    });

    if (navigator.serviceWorker.controller) {
      log("controller exists");
      registration = await navigator.serviceWorker.ready;
    } else {
      log("controller register");
      registration = await navigator.serviceWorker.register("/sw.js", {
        updateViaCache: "none",
        // updateViaCache: "all",
        type: "module",
      });
      log("registered", registration);

      registration.addEventListener("updatefound", (event) => {
        log("updatefound", event);
      });

      log({
        registrations: await navigator.serviceWorker.getRegistrations(),
        registration,
        controller: navigator.serviceWorker.controller,
        isController: registration === navigator.serviceWorker.controller,
        isReg:
          registration === (await navigator.serviceWorker.getRegistration()),
        isReady: registration === (await navigator.serviceWorker.ready),
      });
    }
  }

  addRobot();

  document.querySelector("#button").addEventListener("click", (e) => {
    e.preventDefault();
    addRobot();
  });

  document.querySelector("#upgrade").addEventListener("click", (e) => {
    e.preventDefault();
    registration?.waiting?.postMessage("go");
    // navigator.serviceWorker?.controller?.postMessage?.("hi");
    // (await navigator.serviceWorker.getRegistration()).waiting?.postMessage('go')
  });

  document.querySelector("#clear").addEventListener("click", async (e) => {
    e.preventDefault();
    const registration = await navigator.serviceWorker.getRegistration();
    const didUnRegister = await registration.unregister();
    log({ didUnRegister });
  });

  async function addRobot() {
    const res = await fetch("/robots.txt");
    log(res);
    const robot = await res.text();
    log({ robot });
    print(robot);
  }

  function print(text) {
    const pre = document.createElement("pre");
    pre.textContent = text;
    output.appendChild(pre);
  }
}
main().catch(console.error);
