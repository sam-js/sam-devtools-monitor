const style = {
  dock: `
    background-color: #55ddff;
    border-left: 1px solid black;
    width: 300px;
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    font-family: Courier, monospace, sans-serif;
    height: 100%;
    overflow-y: scroll`,
  snapshot: `
    border-top: 2px solid black;
    cursor: pointer`,
}

const render = (snapshots, loadSnapshot) => {
  let node = document.getElementById('SAMTimeTravelUI')
  if (!node) {
    node = document.createElement('div')
    node.style = style.dock
    document.body.appendChild(node)
  }
  
  snapshots.forEach((snapshot, i) => {
    const store = snapshot.store
    let dataset = { ...snapshot.dataset }
    const el = document.createElement('div')
    el.addEventListener('click', e => {
      console.log('click', i, e)
      loadSnapshot(i)
    })
    let html = `<div id="sam-devtools-snapshot${i}" style="${style.snapshot}">`
    if (dataset['@@nap']) {
      delete dataset['@@nap']
      html = html + `<strong>From NAP</strong>`
    }
    html = html + `
        <pre>present(${JSON.stringify(dataset)})</pre>
        <pre>Store -> ${JSON.stringify(store)}</pre>`
    el.innerHTML = html
    node.appendChild(el)
  })

  // Scroll to bottom
  node.scrollTop = node.scrollHeight

}

export default render
