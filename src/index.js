import "./index.css"
import girl from "../assets/images/girl.jpg"
import girl2 from "../assets/images/girl2.jpg"

function app() {
  const app = document.createElement("div")
  app.id = "app"
  app.classList.add("girl-container")

  // 图1，在底下，右边对齐
  const divGirl1 = document.createElement("div")
  const girlImg = new Image()
  girlImg.src = girl
  divGirl1.id = "girl1"
  divGirl1.classList.add("girl-div")
  divGirl1.appendChild(girlImg)

  // 图2，在上层，左边对齐
  const divGirl2 = document.createElement("div")
  divGirl2.id = "girl2"
  const girlImg2 = new Image()
  girlImg2.src = girl2
  divGirl2.classList.add("girl-div")
  divGirl2.appendChild(girlImg2)

  app.appendChild(divGirl1)
  app.appendChild(divGirl2)

  // 分界线
  const divider = document.createElement("div")
  divider.id = 'divider'
  divider.classList.add("divider")
  app.appendChild(divider)

  const sliderContainer = document.createElement("div")
  sliderContainer.classList.add("slidecontainer")
  const rangeInput = document.createElement("input")
  rangeInput.type = "range"
  rangeInput.min = "2"
  rangeInput.max = "100"
  rangeInput.value = "100"
  rangeInput.className = "slider"
  rangeInput.id = "myRange"
  rangeInput.addEventListener("input", (e) => {
    console.log(e.target.value)
    let slideValue = e.target.value
    // 第一张图片宽度从0到1
    // divGirl1.style.width = `${100-e.target.value}%`
    // 第二张图片宽度从1到0
    // divGirl2.style.width = `${e.target.value}%`

    divGirl1.style.clipPath = `inset(0px 0px 0px ${slideValue}%)`
    divGirl2.style.clipPath = `inset(0px ${100 - slideValue}% 0px 0px)`
    // let dividerLeft = `calc(${slideValue}% - 20px)`
    let distance = divGirl1.offsetWidth
    let dividerLeft = slideValue / 100 * distance
    divider.style.left = (dividerLeft - 20) + 'px'
  })
  sliderContainer.appendChild(rangeInput)
  // sliderContainer.innerHTML = `<p>Custom range slider:</p>
  // <input type="range" min="1" max="100" value="50" class="slider" id="myRange" >`

  app.appendChild(sliderContainer)

  return app
}

function main() {
  document.body.appendChild(app())

  document.addEventListener("DOMContentLoaded", () => {
    let direct = -1
    let velocity = 0.2
    let girl1 = document.getElementById("girl1")
    let girl2 = document.getElementById("girl2")
    let distance = girl1.offsetWidth
    let divider = document.getElementById("divider")
    let pos = distance - divider.offsetWidth
    // console.log('最远',pos)
    let minPos = 0, maxPos = pos
    divider.style.left = pos + 'px'
    let dt = 16.7
    setInterval(() => {
      pos += velocity * dt * direct
      divider.style.left = pos + 'px'
      girl2.style.clipPath = `inset(0px ${maxPos - pos}px 0px 0px)`
      // 到边界取反
      if(pos >= maxPos || pos <= minPos) direct = -direct
    }, dt)
  })
}
main()
