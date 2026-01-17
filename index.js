// ==UserScript==
// @name         Generate Forever Simple
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  create a generate forever button
// @author       judgeou
// @copyright    2024+, judgeou (https://github.com/judgeou)
// @homepageURL  https://github.com/judgeou/generate-forever-simple
// @match        *://novelai.net/image*
// @grant        none
// ==/UserScript==
"use strict";

(function () {
    let status = 'OFF'
    
    // 创建按钮容器
    const btnContainer = document.createElement('div')
    btnContainer.style = `
    position: fixed;
    display: flex;
    gap: 10px;
    z-index: 9999;
`
    
    // Generation Forever 按钮
    const btn = document.createElement('button')
    btn.style = `
    color: black;
    cursor: pointer;
`
    btn.textContent = 'Generation Forever: OFF'
    btn.addEventListener('click', () => {
        if (status == 'OFF') {
            status = 'ON'
            loop()
        } else if (status == 'ON') {
            status = 'OFF'
        }

        btn.textContent = 'Generation Forever: ' + status
    })

    // 粘贴按钮（模拟 Ctrl+V）
    const pasteBtn = document.createElement('button')
    pasteBtn.style = `
    color: black;
    cursor: pointer;
`
    pasteBtn.textContent = 'Paste'
    pasteBtn.addEventListener('click', () => {
        document.execCommand('paste')
    })

    btnContainer.appendChild(btn)
    btnContainer.appendChild(pasteBtn)
    document.body.appendChild(btnContainer)

    function loop () {
        if (status == 'ON') {
            let span = [...document.querySelectorAll('button span')].filter(item => item.textContent === 'Generate 1 Image' && item.clientWidth)[0]
            if (!span.parentElement.disabled) {
                span.click()
            }
            setTimeout(loop, 1000)
        }
    }

    loop()
    
})()
