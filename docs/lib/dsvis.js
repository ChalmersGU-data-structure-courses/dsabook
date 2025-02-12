
DSVis.AllEngines = {};

DSVis.initialiseAnimation = function(containerID, DSClass, initialValues, actions) {
    const containerHTML = `
      <fieldset class="generalControls algorithmControls">
        <span class="formgroup executionButtons">
        </span>
        <span class="formgroup">
          <button class="stepBackward">&lt;</button>
          <button class="toggleRunner">Run</button>
          <button class="stepForward">&gt;</button>
        </span>
        <span class="formgroup">
            <select class="animationSpeed">
              <option value="1200">Slowest</option>
              <option value="700" selected>Slow</option>
              <option value="300">Fast</option>
              <option value="100">Fastest</option>
            </select>
        </span>
        <span class="formgroup">
            <select class="objectSize">
              <option value="12">Tiny nodes</option>
              <option value="20">Small nodes</option>
              <option value="28">Medium nodes</option>
              <option value="40" selected>Large nodes</option>
              <option value="50">Huge nodes</option>
            </select>
          </label>
        </span>
      </fieldset>
      <div>
        <svg></svg>
      </div>
    `;
    document.querySelector(containerID).innerHTML = containerHTML;
    const engine = new DSVis[DSClass](containerID);
    engine.initialise(initialValues);
    engine.Toolbar.showNullNodes = engine.Container.querySelector(".showNullNodes");

    const buttonsGroup = document.querySelector(`${containerID} .executionButtons`);
    const buttons = {};
    actions = "Reset " + actions;
    const resetButton = "execute_reset";
    for (const act of actions.trim().split(/\s+/)) {
        const cmd = act.split(/[:_-]/);
        const text = cmd.join(" ");
        cmd[0] = cmd[0].toLowerCase();
        let btn = "execute_" + cmd.join("_");
        const elem = buttons[btn] = engine.Toolbar[btn] = document.createElement("button");
        elem.setAttribute("type", "submit");
        elem.classList.add(btn)
        elem.append(text);
        buttonsGroup.append(elem, " ");
        const isReset = (btn === resetButton);
        elem.disabled = isReset;
        elem.addEventListener("click", async () => {
            for (const b2 in buttons) buttons[b2].disabled = (isReset === (b2 === resetButton));
            await engine.resetAll();
            await engine.submit(...cmd);
        });
    }
    DSVis.AllEngines[containerID] = engine;
}
