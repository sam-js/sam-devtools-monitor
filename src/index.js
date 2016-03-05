const style = {
  dock: `
    background-color: #222;
    color: white;
    width: 300px;
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    font-family: monospace, sans-serif;
    height: 100%;
    overflow-y: scroll;`,
  snapshot: `
    background-color: #666;
    cursor: pointer;
    margin-bottom: 2px;
    padding: 5px 10px;
    overflow: auto;`,
  nap: `
    border: 2px solid white;
    `,
  }

const keys = ['@@nap']

const filterKeys = store => {
  const output = { ...store }
  keys.forEach(k => delete output[k])
  return output
}

const getNode = _ => {
  let node = document.getElementById('SAMTimeTravelUI')
  if (!node) {
    node = document.createElement('div')
    node.style = style.dock
    document.body.appendChild(node)
  }
  return node
}

const render = (snapshots, loadSnapshot) => {
  const node = getNode()
  snapshots.forEach((snapshot, i) => {
    const { store, dataset } = snapshot
    const fromNAP = dataset['@@nap'] !== undefined
    const el = document.createElement('div')
    el.addEventListener('click', loadSnapshot.bind(null, i))
    el.style = style.snapshot + (fromNAP ? style.nap : '')
    let html = (fromNAP ? `<strong>NAP</strong>` : '')
    const filteredStore = filterKeys(store)
    html = html + `<pre>present(${JSON.stringify(dataset)})</pre><pre>Store -> ${JSON.stringify(store)}</pre>`
    el.innerHTML = html
    node.appendChild(el)
  })
  // Scroll to bottom
  node.scrollTop = node.scrollHeight
}

export default render
