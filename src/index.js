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

const render = snapshots => {
  let node = document.getElementById('SAMTimeTravelUI')
  if (!node) {
    node = document.createElement('div')
    node.style = style.dock
    document.body.appendChild(node)
  }
  node.innerHTML = snapshots.map((snapshot, i) => {
    const store = snapshot.store
    let dataset = { ...snapshot.dataset }
    let html = `<div style="${style.snapshot}" onClick="loadSnapshot(${i})">`
    if (dataset['@@nap']) {
      delete dataset['@@nap']
      html = html + `<strong>From NAP</strong>`
    }
    html = html + `
        <pre>present(${JSON.stringify(dataset)})</pre>
        <pre>Store -> ${JSON.stringify(store)}</pre>
      </div>`
    return html
  }).join('')
  node.scrollTop = node.scrollHeight

}

export default render
